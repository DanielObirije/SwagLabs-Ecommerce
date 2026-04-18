import * as dotenv from "dotenv";

dotenv.config();

export class AiService {
  private readonly endpoint: string;
  private readonly token: string;
  private readonly model = "gpt-4o-mini";

  constructor() {
    this.endpoint = process.env.AZURE_AI_URL ?? "";
    this.token = process.env.AZURE_AI_TOKEN ?? "";
  }

  async analyzeFaluire(errorMessage: string, domSnapshort: string) {
    if (!this.token)
      return `AI disabled: Token missing. ${process.env.AZURE_AI_TOKEN}`;
    try {
      const payload = this.buildRequestPaylaod(errorMessage, domSnapshort);
      const response = await this.callAI(payload);
      return this.extractContent(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private buildRequestPaylaod(errorMessage: string, domSnapshort: string) {
    return {
      model: this.model,
      max_tokens: 100,
      temperature: 0.1,
      messages: [
        { role: "system", content: this.getSystemPrompt() },
        {
          role: "user",
          content: this.formatUserInput(errorMessage, domSnapshort),
        },
      ],
    };
  }
  private formatUserInput(error: string, dom: string): string {
    const truncatedDom = dom.slice(0, 10000);

    return `Error: ${error}\n\nDOM:\n${truncatedDom}`;
  }

  private async callAI(payload: object): any {
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `API Error ${res.status}: ${res.statusText} → ${errorText}`,
      );
    }

    return res.json();
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  private extractContent(response: any): string {
    const content = response.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return "No response.";
    }

    return content;
  }

  private handleError(error: unknown): string {
    if (error instanceof Error) {
      return `Internal error: ${error.message}`;
    }
    return "Internal error";
  }

  private getSystemPrompt(): string {
    return `
          You are a Self-Healing AI for Playwright tests.

          Objective:
          Fix broken CSS selectors.

          Rules:
          1. Analyze the error and DOM
          2. Return ONLY the corrected selector inside backticks
            Example: \`#new-id\`
          3. If not found, return: null`;
  }
}
