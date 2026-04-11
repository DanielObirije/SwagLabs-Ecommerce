import { Page } from "@playwright/test";
import { AiService } from "services/AiService";

export class BasePage {
  readonly page: Page;
  private readonly AiService: AiService;
  private attachFu?: (content: string, type: string) => void;

  constructor(page: Page, ai: AiService) {
    this.page = page;
    this.AiService = ai;
  }

  public setAttachFunction(fn: (content: string, type: string) => void) {
    this.attachFu = fn;
  }

  async naviage(path?: string) {
    const url = path ? path : process.env.BASE_URL || "";
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
  }

  async smartClick(selector: string, context: string): Promise<void> {
    try {
      await this.clickWithWait(selector);
      return;
    } catch (error) {
      if (!process.env.AZURE_AI_TOKEN) throw error;
      const healed = await this.trySelfHeal(selector, context, error);
      if (!healed) {
        console.error(`[Self-Healing]  Recovery failed.`);
        throw error;
      }
    }
  }

  private async clickWithWait(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout: 5000,
    });

    await this.page.click(selector);
  }

  private async trySelfHeal(
    originalSelector: string,
    context: string,
    error: any,
  ): Promise<boolean> {
    try {
      const dom = await this.cleanDom();
      const failureMessage = error?.message || String(error);
      const analysis = await this.AiService.analyzeFaluire(failureMessage, dom);
      const suggestedSelector = this.extractSelector(analysis);

      if (!suggestedSelector) {
        console.error(`[Self-Healing] ❌ No valid selector returned.`);
        return false;
      }

      this.reportHealing(originalSelector, suggestedSelector, context);

      await this.clickWithWait(suggestedSelector);

      return true;
    } catch (error) {
      console.error(`[Self-Healing] Healing error: ${error}`);
      return false;
    }
  }

  private reportHealing(original: string, healed: string, context: string) {
    if (!this.attachFu) return;

    this.attachFu(
      `⚠️ SELF-HEALING ENABLED!\n\nOriginal: ${original}\nHealed: ${healed}\nContext: ${context}`,
      "text/plain",
    );
  }

  private async cleanDom(): Promise<string> {
    return this.page.evaluate(() => {
      if (!document.body) return "Empty DOM";

      return document.body.innerHTML
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "")
        .slice(0, 15000);
    });
  }

  private extractSelector(response: string): string | null {
    if (!response) {
      return null;
    }
    const codeMatch = response.match(/`([^`]+)`/);
    if (codeMatch) return codeMatch[1].trim();

    const trimmed = response.trim();
    if (trimmed.startsWith("#") || trimmed.startsWith(".")) {
      return trimmed;
    }
    return null;
  }
}
