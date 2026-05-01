import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
  ITestCaseHookParameter,
} from "@cucumber/cucumber";
import { chromium, BrowserContext, Browser } from "@playwright/test";
import { PageManager } from "page/PageManager";
import { customWorld } from "./word";
import * as dotenv from "dotenv";
dotenv.config();

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "CRITICAL: Unhandled Rejection at:",
    promise,
    "reason:",
    reason,
  );
  throw reason;
});

let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(120 * 1000);

BeforeAll(async () => {
  const headlessMode = process.env.HEADLESS === "true";
  browser = await chromium.launch({
    headless: headlessMode,
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--no-zygote",
    ],
  });
});

Before(async function (this: customWorld, scenario: ITestCaseHookParameter) {
  const featureName = scenario.gherkinDocument.feature?.name || "Feature";
  const scenarioName = scenario.pickle.name;

  // Allure labels
  if (this.label) {
    this.label("framework", "cucumberjs");
    this.label("language", "typescript");
    this.label("parentSuite", "E2E Web");
    this.label("suite", featureName);
    this.label("subSuite", scenarioName);
  }

  context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  });

  const page = await context.newPage();
  this.page = page;
  this.pageManager = new PageManager(this.page);
  if (this.attach) {
    this.pageManager.setAllureAttach(this.attach.bind(this));
  }
});

After(async function (this: customWorld, scenario: ITestCaseHookParameter) {
  const isFailed = scenario.result?.status === Status.FAILED;
  // Screenshot on failure
  if (isFailed && this.page) {
    try {
      const png = await this.page.screenshot({
        fullPage: true,
        timeout: 5000,
      });
      this.attach(png, "image/png");
    } catch (error) {
      console.warn("[Hooks] Failed to capture screenshot:", error);
    }
  }
  //cleanup
  try {
    if (this.page && !this.page.isClosed()) await this.page.close();
    if (context) await context.close();
  } catch (error) {
    console.warn("[Hooks] Cleanup error:", error);
  }
});

AfterAll(async function () {
  try {
    if (browser) await browser.close();
  } catch (error) {
    console.warn("[Hooks] Error closing browser:", error);
  }
  if (process.env.CI === "true") {
    console.log("[Hooks] Forcing process exit (CI)");
    setTimeout(() => process.exit(0), 500);
  }
});
