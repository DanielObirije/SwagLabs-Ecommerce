import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { AllureCucumberWorld } from "allure-cucumberjs";
import { PageManager } from "page/PageManager";
import { Page } from "@playwright/test";

type ProductDetails = {
  name: string;
  description: string;
  price: string;
  imageSrc: string | null;
};

export class customWorld extends AllureCucumberWorld {
  page?: Page;
  pageManager?: PageManager;
  productDetails?: ProductDetails;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(customWorld);
