import { setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { PageManager } from "page/PageManager";
import { Page } from "@playwright/test";
import { AllureCucumberWorld } from "allure-cucumberjs";

export class customWorld extends AllureCucumberWorld {
  page?: Page;
  pageManager?: PageManager;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(customWorld);
