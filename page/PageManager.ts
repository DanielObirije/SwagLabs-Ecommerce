import { Page, expect } from "@playwright/test";
import { AiService } from "services/AiService";
import { LoginPage } from "./LoginPage";

export class PageManager {
  private readonly page: Page;
  private readonly ai: AiService;

  private loginPage?: LoginPage;

  private attachFn?: (content: string, type: string) => void;

  constructor(page: Page) {
    this.page = page;
    this.ai = new AiService();
  }

  public setAllureAttach(fun: (content: string, type: string) => void) {
    this.attachFn = fun;
    if (this.loginPage) {
      this.loginPage.setAttachFunction(fun);
    }
  }

  public get login() {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page, this.ai);
      if (this.attachFn) this.loginPage.setAttachFunction(this.attachFn);
    }
    return this.loginPage;
  }

}
