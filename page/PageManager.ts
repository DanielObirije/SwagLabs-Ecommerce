import { Page, expect } from "@playwright/test";
import { AiService } from "services/AiService";
import { BasePage } from "./BasePage";
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
}
