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
import * as dotenv from "dotenv";
dotenv.config();

let browser: Browser;
let context: BrowserContext;

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

Before(async function (scenario: ITestCaseHookParameter) {
  const featureName = scenario.gherkinDocument.feature?.name || "Feature";
  const scenarioName = scenario.pickle.name;

  if (this.label) {
    this.label("framework", "cucumberjs");
    this.label("language", "typescript");
    this.label("parentSuite", "E2E Web");
    this.label("suite", featureName);
    this.label("subSuite", scenarioName);
  }

  context = await browser.newContext({
    ignoreHTTPSErrors: true,
    locale: "en-US",
  });

  const page = context.newPage();
  this.page = page;
  this.pageManager = new PageManager(this.page);
});
