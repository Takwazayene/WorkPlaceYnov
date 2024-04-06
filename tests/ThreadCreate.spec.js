import React from 'react';
import { render } from '@testing-library/react';
import ThreadCreate from '../src/pages/ThreadCreate';
import { test, expect } from '@playwright/test';

test('renders ThreadCreate component', () => {
  render(<ThreadCreate />);

  const titleInput = screen.getByLabelText('Titre');
  expect(titleInput).toBeInTheDocument();

  const contentInput = screen.getByLabelText('Contenu');
  expect(contentInput).toBeInTheDocument();

  const createButton = screen.getByRole('button', { name: /Créer/i });
  expect(createButton).toBeInTheDocument();
});

import { test, expect } from "@playwright/test";

test("Thread Creation Test", async ({ page }) => {
  let groupId = "123";

  await page.goto(`http://localhost:3000/groups/${groupId}/threadCreate`);

  // Remplir les champs de création de thread
  await page.fill('input[id="outlined-basic"]', "Nouveau thread");
  await page.fill('[data-testid="thread-title-input"]', "Nouveau thread");
  await page.fill('[data-testid="thread-content-input"]', "Contenu du thread");

  // Cliquer sur le bouton de création
  await page.click('button[type="submit"]');

  // Vérifier la redirection vers la page du groupe
  const url = await page.url();
  expect(url).toMatch(/.*\/groups\/123/);
});