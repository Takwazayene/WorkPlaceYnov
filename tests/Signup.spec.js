import { test, expect } from "@playwright/test";

test("Signup form renders correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/signup");

  // Vérifier que les éléments du formulaire sont rendus correctement
  expect(await page.isVisible('input[id="outlined-basic"][label="Pseudo"]')).toBe(true);
  expect(await page.isVisible('input[id="outlined-basic"][label="Email"]')).toBe(true);
  expect(await page.isVisible('input[id="outlined-basic"][label="Mot de passe"]')).toBe(true);
  expect(await page.isVisible('input[id="password-confirmation"][label="Confirmer le mot de passe"]')).toBe(true);
  expect(await page.isVisible('button:has-text("S\'inscrire")')).toBe(true);
});

test("Signup form validation", async ({ page }) => {
  await page.goto("http://localhost:3000/signup");

  await page.fill('input[id="outlined-basic"][label="Pseudo"]', "takwa");
  await page.fill('input[id="outlined-basic"][label="Email"]', "takwa@example.com");
  await page.fill('input[id="outlined-basic"][label="Mot de passe"]', "Takwa123456789");
  await page.fill('input[id="password-confirmation"][label="Confirmer le mot de passe"]', "Takwa123456789");

  await Promise.all([
    page.click('button:has-text("S\'inscrire")'),
    page.waitForNavigation(),
  ]);

  expect(page.url()).toMatch(/.*\/login/);
});