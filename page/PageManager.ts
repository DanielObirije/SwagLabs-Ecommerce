import { Page, expect } from "@playwright/test";
import { AiService } from "services/AiService";
import { LoginPage } from "./LoginPage";
import { InventroyPage } from "./InventoryPage";
import { cartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";

export class PageManager {
  private readonly page: Page;
  private readonly ai: AiService;

  private loginPage?: LoginPage;
  private invetoryPage?: InventroyPage;
  private cartPage?: cartPage;
  private checkoutPage?: CheckoutPage;

  private attachFn?: (content: string, type: string) => void;

  constructor(page: Page) {
    this.page = page;
    this.ai = new AiService();
  }

  public setAllureAttach(fun: (content: string, type: string) => void) {
    this.attachFn = fun;
    if (this.loginPage) this.loginPage.setAttachFunction(fun);
    if (this.invetoryPage) this.invetoryPage.setAttachFunction(fun);
    if (this.cartPage) this.cartPage.setAttachFunction(fun);
    if (this.checkoutPage) this.checkoutPage.setAttachFunction(fun);
  }

  public get login() {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page, this.ai);
      if (this.attachFn) this.loginPage.setAttachFunction(this.attachFn);
    }
    return this.loginPage;
  }

  public get inventory() {
    if (!this.invetoryPage) {
      this.invetoryPage = new InventroyPage(this.page, this.ai);
      if (this.attachFn) this.invetoryPage.setAttachFunction(this.attachFn);
    }
    return this.invetoryPage;
  }

  public get cart() {
    if (!this.cartPage) {
      this.cartPage = new cartPage(this.page, this.ai);
      if (this.attachFn) this.cartPage.setAttachFunction(this.attachFn);
    }
    return this.cartPage;
  }

  public get checkout() {
    if (!this.checkoutPage) {
      this.checkoutPage = new CheckoutPage(this.page, this.ai);
      if (this.attachFn) this.checkoutPage.setAttachFunction(this.attachFn);
    }
    return this.checkoutPage;
  }
}
