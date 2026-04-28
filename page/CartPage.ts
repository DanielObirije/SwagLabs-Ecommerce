import { PageManager } from "./PageManager";
import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AiService } from "services/AiService";

export class cartPage extends BasePage {
  private readonly cartItem = ".cart_item";
  private readonly shopingCart = ".shopping_cart_link";
  private readonly addToCartButton =
    "data-test='add-to-cart-sauce-labs-backpack'";
  private readonly cartBadge = ".shopping_cart_badge";
  private inventoryItem = ".inventory_item";

  constructor(page: Page, ai: AiService) {
    super(page, ai);
  }

  // async addProductItemInCart(productName: string) {
  //   const productItem = this.page.locator(this.inventoryItem, {
  //     hasText: productName,
  //   });
  //   console.log(productItem);
  //   await expect(productItem).toBeVisible();
  //   // await this.smartClick(this.addToCartButton, "Add to cart Button");
  // }

  async validateEmptyItemInCart() {
    const productItem = this.page.locator(this.cartBadge);
    await expect(productItem).not.toBeVisible();
  }

  async expectItemInCart(productName: string) {
    await this.smartClick(this.shopingCart, "Shoping cart Button");
    await this.page.waitForURL(/.*cart\.html/);
    const cartItem = this.page.locator(this.cartItem, { hasText: productName });
    expect(cartItem).toBeVisible();
  }
}
