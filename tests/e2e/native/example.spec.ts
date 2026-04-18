import { test, expect } from "@playwright/test";
import { LoginPage } from "page/LoginPage";
import { AiService } from "services/AiService";
import * as dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config();

test.describe("E2E Native - SAUCE LABS Purchase Flow", () => {
  let loginPage: LoginPage;
  const aiService = new AiService();

  const VALID_USERNAME = process.env.SAUCE_USERNAME || "standard_user";
  const VALID_PASSWORD = process.env.SAUCE_PASSWORD || "secret_sauce";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page, aiService);
    await loginPage.naviage();
  });

  test("Negative Scenario: Should fail login with invalid credentials", async ({
    page,
  }) => {
    const invalidUsername = faker.internet.username();
    const invalidPassword = faker.internet.password();

    await test.step("Attempt login with invalid credentials", async () => {
      await loginPage.performLogin(invalidUsername, invalidPassword, false);
      await loginPage.validateErrorMessage(
        "Epic sadface: Username and password do not match any user in this service",
      );
    });

    await test.step("Attempt login with valid name but invalid password", async () => {
      await loginPage.performLogin(VALID_USERNAME, invalidPassword, false);
      await loginPage.validateErrorMessage(
        "Epic sadface: Username and password do not match any user in this service",
      );
    });

    await test.step("Attempt login with invalid name but valid password", async () => {
      await loginPage.performLogin(invalidPassword, VALID_PASSWORD, false);
      await loginPage.validateErrorMessage(
        "Epic sadface: Username and password do not match any user in this service",
      );
    });

    await test.step("Attempt login with empty fileds", async () => {
      await loginPage.performLogin("", "", false);
      await loginPage.validateErrorMessage(
        "Epic sadface: Username is required",
      );
    });
  });
});
