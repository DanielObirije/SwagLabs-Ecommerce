import { When, Then, Given } from "@cucumber/cucumber";
import { customWorld } from "../support/word";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
dotenv.config();

// Given("that I am logged in", async function (this: customWorld) {
//   const user = process.env.STANDARD_USER || "standard_user";
//   const pass = process.env.SECRET_SAUCE || "secret_sauce";
//   await this.pageManager?.login.naviage();
//   await this.pageManager?.login.performLogin(user, pass);
// });

Given("that I am logged in", async function (this: customWorld) {
  await this.pageManager?.login.naviage();
  await this.pageManager?.login.performLogin("standard_user", "secret_sauce");
});

Given(
  "I have added the product {string} to the cart",
  async function (this: customWorld, productName) {
    await this.pageManager?.inventory.addItemToCart(productName);
    await this.pageManager?.cart.validateItemInCart(productName);
  },
);

When("I access the cart", async function (this: customWorld) {
  await this.pageManager?.inventory.goToCart();
});

When("I proceed to checkout", async function (this: customWorld) {
  await this.pageManager?.cart.proccedToCheckout();
});

When(
  "I try to continue without filling out the form",
  async function (this: customWorld) {
    await this.pageManager?.checkout.clickContinue();
  },
);

Then(
  "I should see the checkout error message {string}",
  async function (this: customWorld, errorMessage) {
    await this.pageManager?.checkout.validateErrorMessage(errorMessage);
  },
);

When(
  "I fill in the delivery details correctly",
  async function (this: customWorld) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();
    await this.pageManager?.checkout.fillCheckoutForm(
      firstName,
      lastName,
      postalCode,
    );
  },
);

When("I complete the purchase", async function (this: customWorld) {
  await this.pageManager?.checkout.completePurchase();
});

Then(
  "I should see the confirmation message {string}",
  async function (this: customWorld, message) {
    await this.pageManager?.inventory.validateTitle("Checkout: Complete!");
    await this.pageManager?.checkout.validateOrderSuccess(message);
  },
);
