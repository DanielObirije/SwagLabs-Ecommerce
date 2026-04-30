import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AiService } from "services/AiService";

export class cartPage extends BasePage {
  private readonly cartItem = ".cart_item";
  private readonly checkoutButton = "#checkout";
  private readonly checkoutContainer = "#checkout_info_container";
  private readonly continueShoppingButton = "#continue-shopping";
  private readonly cartList = ".cart_list";

  constructor(page: Page, ai: AiService) {
    super(page, ai);
  }

  // async validateItemInCart(productName: string) {
  //   const productItem = this.page.locator(this.cartItem, {
  //     hasText: productName,
  //   });
  //   await expect(productItem).toBeVisible();
  //    productItem.locator(this.addToCartButton).click()
  // }
  async waitInventryLoad() {
    await this.page.waitForSelector(this.cartList, {
      state: "visible",
    });
  }

  async validateItemInCart(productName: string) {
    this.waitInventryLoad();
    // console.log(productName);
    const item = this.page.locator(this.cartItem, { hasText: productName });
    await expect(item).toBeVisible();
  }

  async proccedToCheckout() {
    await this.smartClick(this.checkoutButton, "Checkout Button");
    await this.page.waitForURL(/.*checkout-step-one\.html/);
    await this.page.waitForSelector(this.checkoutContainer, {
      state: "visible",
    });
    
  }

  async continueShoopping() {
    await this.smartClick(
      this.continueShoppingButton,
      "Continue shopping button",
    );
  }
}
