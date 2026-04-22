import { PageManager } from "page/PageManager";
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { customWorld } from "../support/word";
import * as dotenv from "dotenv";
dotenv.config();

Given("that I am on the login page", async function (this: customWorld) {
  if (!this.pageManager) {
    this.pageManager = new PageManager(this.page!);
  }

  await this.pageManager.login.naviage();
});
When("I fill in valid credentials", async function () {
  const user = process.env.STANDARD_USER || "standard_user";
  const pass = process.env.SECRET_SAUCE || "secret_sauce";
  await this.pageManager.login.performLogin(user, pass, true);
});

When("I login with {string} and {string}", async function (user, pass) {
  await this.pageManager.login.performLogin(user, pass, true);
});

Then("I should be redirected to the product showcase", async function () {
  console.log("[Step] Validating redirection to Product Showcase...");
  await expect(this.page).toHaveURL(/.*inventory\.html/, { timeout: 10000 });
});
