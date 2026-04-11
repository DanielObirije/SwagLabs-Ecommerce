import { Page, expect } from "@playwright/test";
import { AiService } from "services/AiService";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly userinput = "#user-name";
  private readonly passwordinput = "#password";
  private readonly loginbutton = "#login-button";
  private readonly titiletext = ".title";

  constructor(page: Page, ai: AiService) {
    super(page, ai);
  }

  async performLogin(
    user: string,
    password: string,
    expectSucess: boolean = true,
  ) {
    if (this.page.url() === "about:blank") {
      await this.naviage();
    }

    try {
      expect(this.page.locator(".login_logo")).toHaveText("Swag Labs");
      await this.page.locator(this.userinput).fill(user);
      await expect(this.page.locator(this.userinput)).toHaveValue(user);
      await this.page.locator(this.passwordinput).fill(password);
      await expect(this.page.locator(this.passwordinput)).toHaveValue(password);
      await this.smartClick(this.loginbutton, "Login Button");
      if (expectSucess) {
        await this.page.waitForURL(/.*inventory\.html/, { timeout: 20000 });
        await this.page.waitForSelector(this.titiletext, {
          state: "visible",
        });
        console.log(`[Login] ✅ Success: Inventory loaded!`);
      } else {
        console.log(`[Login] ⏳ Waiting for error message...`);
      }
    } catch (error) {
      throw error;
    }
  }
}
