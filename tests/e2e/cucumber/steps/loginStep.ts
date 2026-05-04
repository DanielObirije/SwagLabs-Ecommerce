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

Given("the login credentials are visable", async function (this: customWorld) {
  await this.pageManager?.login.validateLoginDetails();
});

When("I fill in valid credentials", async function (this: customWorld) {
  const user = process.env.STANDARD_USER || "standard_user";
  const pass = process.env.SECRET_SAUCE || "secret_sauce";
  await this.pageManager?.login.performLogin(user, pass, true);
});

When(
  "I login with {string} and {string}",
  async function (this: customWorld, user, pass) {
    await this.pageManager?.login.performLogin(user, pass, true);
  },
);

Then(
  "I should be redirected to the product showcase",
  async function (this: customWorld) {
    await expect(this.page!).toHaveURL(/.*inventory\.html/);
  },
);

When(
  "I try to login with user {string} and password {string}",
  async function (this: customWorld, name, password) {
    await this.pageManager?.login.performLogin(name, password, false);
  },
);

Then(
  "I should see the error message {string}",
  async function (this: customWorld, errorMessage) {
    await this.pageManager?.login.validateErrorMessage(errorMessage);
  },
);
