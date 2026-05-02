import { test, expect, APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { allure } from "allure-playwright";

// Definindo o "Contrato" (Schema) da postagem
const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

test.describe
  .serial("Testes de API - Fluxo CRUD Completo & Cenários Negativos", () => {
  let apiContext: APIRequestContext;
  let createdPostId: number;

  // Dados dinâmicos gerados pelo Faker
  const fakeTitle = faker.lorem.sentence();
  const fakeBody = faker.lorem.paragraph();
  const fakeUserId = faker.number.int({ min: 1, max: 100 });

  // Dados para atualização (PUT)
  const updatedTitle = faker.lorem.sentence();
  const updatedBody = faker.lorem.paragraph();

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL,
      // Ignora verificação de SSL para rodar atrás de Proxy/VPN Corporativa
      ignoreHTTPSErrors: true,
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
