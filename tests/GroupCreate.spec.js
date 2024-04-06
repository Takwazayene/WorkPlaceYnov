import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupCreate from '../src/pages/GroupCreate';
import { test, expect } from '@playwright/test';

test('renders GroupCreate component', () => {
  render(<GroupCreate />);
 
  const titleElement = screen.getByText(/Créer un groupe/i);
  expect(titleElement).toBeInTheDocument();

  const nameInput = screen.getByLabelText('Nom');
  expect(nameInput).toBeInTheDocument();

  const descriptionInput = screen.getByLabelText('Description');
  expect(descriptionInput).toBeInTheDocument();

  const createButton = screen.getByRole('button', { name: /Créer/i });
  expect(createButton).toBeInTheDocument();
});

test('create group end-to-end test', async ({ page }) => {
  await page.goto('http://localhost:3000/groups/add');
  await page.waitForSelector('.formContainer');
 
  await page.fill('input[id="name"]', 'Nom du groupe');
  await page.fill('input[id="description"]', 'Description du groupe');
 
  await Promise.all([
    page.click('button'),
    page.waitForNavigation(),
  ]);
 
  const url = await page.url();
  expect(url).toContain('/profil');
});