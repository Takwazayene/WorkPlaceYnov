import { test, expect } from "@playwright/test";

test("Logout Test", async ({ page }) => {
 await page.goto("http://localhost:3000/login");

  await page.fill('input[name="email"]', "user@example.com");
  await page.fill('input[name="password"]', "User123456789");

  await Promise.all([
    page.click('[data-testid="submit-login"]'),
    page.waitForLoadState("networkidle"),
  ]);

  const url = await page.url();
  expect(url).toMatch(/.*profile/);

  await page.waitForSelector('[data-testid="settings-menu"]');

  await page.click('[data-testid="settings-menu"]');

  await page.click('[data-testid="logout-option"]');

  const url2 = await page.url();
  expect(url2).toMatch(/.*logIn/);
});