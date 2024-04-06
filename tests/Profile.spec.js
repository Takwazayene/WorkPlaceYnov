import { test, expect } from "@playwright/test";

test("Profile page renders correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/profile");

  expect(await page.isVisible('h4:has-text("MON PROFIL")')).toBe(true);
  expect(await page.isVisible('div[class^="CardUser"]')).toBe(true);
  expect(await page.isVisible('div[class^="PopUpDelete"]')).toBe(true);
  expect(await page.isVisible('div[class^="friendItem"]')).toBe(true);
  expect(await page.isVisible('h6:has-text("Statistiques")')).toBe(true);
  expect(await page.isVisible('h6:has-text("Boite de réception")')).toBe(true);
  expect(await page.isVisible('h6:has-text("Paramètres")')).toBe(true);
  expect(await page.isVisible('h6:has-text("Aide")')).toBe(true);
});

test("Profile page displays user information", async ({ page }) => {
  await page.goto("http://localhost:3000/profile");

  expect(await page.isVisible('div[class^="CardUser"]')).toBe(true);
//   expect(await page.innerText('div[class^="CardUser"]')).toContain("Takwa");
});

test("Profile page displays friend list", async ({ page }) => {
  await page.goto("http://localhost:3000/profile");

  expect(await page.isVisible('div[class^="friendItem"]')).toBe(true);
//   expect(await page.innerText('div[class^="friendItem"]')).toContain("Takwa");
//   expect(await page.innerText('div[class^="friendItem"]')).toContain("user");
});
