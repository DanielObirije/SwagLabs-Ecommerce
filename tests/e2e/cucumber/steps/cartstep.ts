import { Given, Then, When } from "@cucumber/cucumber";
import { PageManager } from "page/PageManager";
import { customWorld } from "../support/word";
import { expect } from "@playwright/test";

import * as dotenv from "dotenv";
dotenv.config();

Given("that I am logged into the system", async function (this: customWorld) {
  const user = process.env.STANDARD_USER || "standard_user";
  const pass = process.env.SECRET_SAUCE || "secret_sauce";
  if (!this.pageManager) this.pageManager = new PageManager(this.page!);
  await this.pageManager.login.naviage();
  await this.pageManager.login.performLogin(user, pass);
});

Given("the cart is empty", async function (this: customWorld) {
  await this.pageManager?.cart.validateEmptyItemInCart();
});

When(
  "I add the product {string} to the cart",
  async function (this: customWorld, productItem) {
    await this.pageManager?.cart.addProductItemInCart(productItem);
  },
);

Then(
  "the cart should contain {string}",
  async function (this: customWorld, productName) {
    await this.pageManager?.cart.expectItemInCart(productName);
  },
);
