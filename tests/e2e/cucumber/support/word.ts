import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { AllureCucumberWorld } from "allure-cucumberjs";
import { PageManager } from "page/PageManager";
import { Page } from "@playwright/test";

export class customWorld extends AllureCucumberWorld {
  page?: Page;
  pageManager?: PageManager;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(customWorld);
