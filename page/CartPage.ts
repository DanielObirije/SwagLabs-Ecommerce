import { PageManager } from "./PageManager";
import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AiService } from "services/AiService";

export class cartPage extends BasePage {
  private readonly cartItem = "cart_item";
  private readonly checkoutButton = "data-test='checkout'";
  private readonly checkoutContainer = "#checkout_info_container";
  private readonly title = ".title";
  private readonly cartBadge = ".shopping_cart_badge";

  constructor(page: Page, ai: AiService) {
    super(page, ai);
  }

  async validateItemInCart(productName: string) {
    const productItem = this.page.locator(this.cartItem, {
      hasText: productName,
    });
    await expect(productItem).toBeVisible();
  }

  async validateEmptyItemInCart() {
     const productItem = this.page.locator(this.cartBadge)
     await expect(productItem).not.toBeVisible();
  }

  async proccedTocheckout() {
    await this.smartClick(this.checkoutButton, "Checkout Button");
    await this.page.waitForURL(/.*checkout-step-one.html\.html/);
    await this.page.waitForSelector(this.checkoutContainer, {
      state: "visible",
    });
  }

  async validateTitle(expectedTitle: string) {
    await expect(this.page.locator(this.title)).toHaveText(expectedTitle);
  }
}
