import { expect } from "@playwright/test";
import { PageManager } from "page/PageManager";
import { DataTable, Given, Then, When } from "@cucumber/cucumber";
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

  await this.pageManager!.inventory.waitInventryLoad();
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

Given(
  "I validate product details consistency for {string}",
  async function (this: customWorld, productName) {
    this.productDetails =
      await this.pageManager!.inventory.openProductAndGetDetails(productName);
  },
);

Then(
  "all product details should match between listing and details page",
  async function (this: customWorld) {
    await this.pageManager!.inventory.validateProductDetails(
      this.productDetails!,
    );
  },
);

Then(
  "I should see {int} products in the list",
  async function (this: customWorld, count) {
    await this.pageManager!.inventory.validateProductCount(count);
  },
);

Then("each product should have an image", async function (this: customWorld) {
  await this.pageManager!.inventory.validateImageLoad();
});

Then("each product should have a name", async function (this: customWorld) {
  await this.pageManager!.inventory.validateProductNames();
});

Then(
  "each product should have a description",
  async function (this: customWorld) {
    await this.pageManager!.inventory.validateProductDescription();
  },
);
Then("each product should have a price", async function (this: customWorld) {
  await this.pageManager!.inventory.validateProductItemPrice();
});

Then(
  "each product should have an {string} button",
  async function (this: customWorld, buttonText) {
    await this.pageManager!.inventory.validateProductButtons(buttonText);
  },
);
Then(
  "I should see the following sorting options:",
  async function (this: customWorld, dataTable: DataTable) {
    const options = dataTable.raw().flat();
    await this.pageManager!.inventory.validateSortOption(options);
  },
);
