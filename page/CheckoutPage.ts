import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { AiService } from "services/AiService";

export class CheckoutPage extends BasePage {
  private readonly firstName = ".first-name";
  private readonly lastName = ".last-name";
  private readonly postalCode = ".postal-code";
  private readonly continueButton = "#continue";
  private readonly finishButton = "#finish";

  constructor(page: Page, ai: AiService) {
    super(page, ai);
  }

  async clickContinue() {
    await this.smartClick(this.continueButton, "Continue Button");
  }

  async fillForm(firstname: string, lastname: string, postalcode: string) {
    await this.page.fill(this.firstName, firstname);
    await this.page.fill(this.lastName, lastname);
    await this.page.fill(this.postalCode, postalcode);
    await this.clickContinue();
    await this.page.waitForURL(/.*checkout-step-one\.html/);
  }
}
