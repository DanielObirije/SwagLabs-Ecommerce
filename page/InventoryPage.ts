import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AiService } from "services/AiService";

export class InventroyPage extends BasePage {
  private readonly inventeryContainer = "#inventory_container";
  private readonly productItem = ".inventory_item";
  private readonly addToCartBtn = "button[id^='add-to-cart']";
  private readonly cartBadge = "[data-test='shopping-cart-badge']";
  private readonly cartIcon = ".shopping_cart_link";
  private readonly cartList = "[data-test='cart-list']";
  private readonly title = ".title";
  private readonly hamBurgerMenu = "#react-burger-menu-btn";
  private readonly sortDropdown = ".product_sort_container";
  private readonly inventoryImage = ".inventory_item_img img";

  constructor(page: Page, ai: AiService) {
    super(page, ai);
  }

  async waitInventryLoad() {
    await this.page.waitForSelector(this.inventeryContainer, {
      state: "visible",
      timeout: 10000,
    });
  }

  async addItemToCart(productName: string) {
    const item = this.page.locator(this.productItem, { hasText: productName });
    await expect(item).toBeVisible();
    await item.locator(this.addToCartBtn).click();
    await this.page.waitForSelector(this.cartBadge, {
      state: "visible",
    });
  }

  async goToCart() {
    await this.page.locator(this.cartIcon).click();
    await this.page.waitForURL(/.*cart\.html/);
    await this.page.waitForSelector(this.cartList, { state: "visible" });
  }

  async validateTitle(expectedTitle: string) {
    await expect(this.page.locator(this.title)).toHaveText(expectedTitle);
  }

  async validateHambugerMenu() {
    await expect(this.page.locator(this.hamBurgerMenu)).toBeVisible();
  }

  async validateCartIcon() {
    await expect(this.page.locator(this.cartIcon)).toBeVisible();
  }

  async validateSortDropdown() {
    await expect(this.page.locator(this.sortDropdown)).toBeVisible();
  }

  async validateProductCount(count: number) {
    const items = this.page.locator(this.productItem).count();
    expect(items).toBe(count);
  }

  async validateImageLoad() {
    const image = await this.page.locator(this.inventoryImage).all();
    
  }
}
