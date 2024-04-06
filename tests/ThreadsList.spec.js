import React from 'react';
import { render } from '@testing-library/react';
import ThreadsList from '../src/components/ThreadsList';
import { test, expect } from '@playwright/test';

test('renders ThreadsList component', () => {
  render(<ThreadsList groupId="mockGroupId" />);
 
  const addButton = screen.getByRole('link', { name: /Ajouter un Thread/i });
  expect(addButton).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText('Rechercher un thread');
  expect(searchInput).toBeInTheDocument();

  const threadList = screen.getByRole('list');
  expect(threadList).toBeInTheDocument();
});

