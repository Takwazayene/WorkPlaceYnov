import React from 'react';
import { render } from '@testing-library/react';
import GroupsList from '../src/pages/GroupsList';
import { test, expect } from '@playwright/test';

test('renders GroupsList component', () => {
  const mockGroups = [
    { id: 1, name: 'Group 1', description: 'Description 1' },
    { id: 2, name: 'Group 2', description: 'Description 2' },
  ];

  render(<GroupsList groups={mockGroups} />);

  // Vérifiez si les éléments attendus sont présents dans le rendu
  const group1Name = screen.getByText('Group 1');
  expect(group1Name).toBeInTheDocument();

  const group2Description = screen.getByText('Description 2');
  expect(group2Description).toBeInTheDocument();
});
