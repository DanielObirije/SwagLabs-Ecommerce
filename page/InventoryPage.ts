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
  private readonly productItemName = ".inventory_item_name ";
  private readonly productDescription = ".inventory_item_desc";
  private readonly productItemPrice = ".inventory_item_price";
  private readonly sortProduct = ".product_sort_container";

  constructor(page: Page, ai: AiService) {
    super(page, ai);
  }

  async waitInventryLoad() {
    await this.page.waitForSelector(this.inventeryContainer, {
      state: "visible",
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
    const items = await this.page.locator(this.productItem).count();
    expect(items).toBe(count);
  }

  async validateImageLoad() {
    const image = await this.page.locator(this.inventoryImage).all();
    await Promise.all(
      image.map(async (img) => {
        const src = img.getAttribute("src");
        expect(src).toBeTruthy();
        await expect(img).toBeVisible();
      }),
    );
  }

  async validateProductNames() {
    const productname = await this.page
      .locator(this.productItemName)
      .allInnerTexts();
    productname.forEach((name) => {
      expect(name.length).toBeGreaterThan(0);
      expect(name.trim()).not.toBe("");
    });
  }

  async validateProductDescription() {
    const description = await this.page
      .locator(this.productDescription)
      .allInnerTexts();
    description.forEach((des) => {
      expect(des.length).toBeGreaterThan(0);
    });
  }

  async validateProductItemPrice() {
    const prices = await this.page
      .locator(this.productItemPrice)
      .allInnerTexts();
    prices.forEach((price) => {
      const numberPrice = parseFloat(price.replace("$", "").trim());
      expect(numberPrice).toBeGreaterThan(0);
      expect(price).toMatch(/\$\d+\.\d{2}/);
    });
  }

  async validateProductButtons(buttonText: string) {
    const buttons = await this.page.locator(this.addToCartBtn).allInnerTexts();
    buttons.forEach((text) =>
      expect(text.toLowerCase()).toBe(buttonText.toLowerCase()),
    );
  }

  async validateSpecificProduct(productDetails: string[][]) {
    for (const [name, price] of productDetails) {
      const productName = this.page.locator(this.productItemName, {
        hasText: name,
      });
      await expect(productName).toBeVisible();
      await expect(productName.locator(this.productItemPrice)).toHaveText(
        price,
      );
    }
  }

  async validateSortOption(expectedOptions: string[]) {
    const options = await this.page
      .locator(`${this.sortDropdown} option`)
      .allInnerTexts();
    expectedOptions.forEach((text) => {
      expect(
        options.some((option) => option.trim() === text.trim()),
      ).toBeTruthy();
    });
  }
}
