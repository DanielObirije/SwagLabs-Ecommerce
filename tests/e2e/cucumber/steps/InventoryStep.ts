import { expect } from "@playwright/test";
import { PageManager } from "page/PageManager";
import { Given, Then, When } from "@cucumber/cucumber";
import { customWorld } from "../support/word";

import * as dotenv from "dotenv";
dotenv.config();

Given("that I am logged into the system", async function (this: customWorld) {
  const user = process.env.STANDARD_USER || "standard_user";
  const pass = process.env.SECRET_SAUCE || "secret_sauce";
  if (!this.pageManager) this.pageManager = new PageManager(this.page!);
  await this.pageManager.login.naviage();
  await this.pageManager.login.performLogin(user, pass);
});

Given("I am on the inventory page", async function (this: customWorld) {
  await expect(this.page!).toHaveURL(/.*inventory\.html/);

  this.pageManager!.inventory.waitInventryLoad();
});

Then(
  "I should see the title {string}",
  async function (this: customWorld, title) {
    await this.pageManager!.inventory.validateTitle(title);
  },
);

Then("I should see the hamburger menu", async function (this: customWorld) {
  await this.pageManager!.inventory.validateHambugerMenu();
});

Then("I should see the shopping cart", async function (this: customWorld) {
  await this.pageManager!.inventory.validateCartIcon();
});

Then("I should see the sorting filter", async function (this: customWorld) {
  await this.pageManager!.inventory.validateSortDropdown();
});
