import { test, expect } from "@playwright/test";
import { setCurrentThread } from "../store/reducers/thread";
import { addMessage, setMessages } from "../store/reducers/message";
import ThreadDetails from "../src/pages/ThreadCreate";
import { render, screen } from "@testing-library/react";

test('renders "Retour au groupe" button', () => {
  render(<ThreadDetails />);

  const buttonElement = screen.getByText(/Retour au groupe/i);

  expect(buttonElement).toBeInTheDocument();
});


test("ThreadDetails - Envoi de message", async ({ page }) => {
  // Naviguer vers la page ThreadDetails
  await page.goto("http://localhost:3000/groups/:groupId/threads/:threadId");

  const messageInput = await page.waitForSelector('input[type="text"]');

  await messageInput.fill("Test message");

  const sendButton = await page.waitForSelector('button[type="submit"]');
  await sendButton.click();

  const submittedMessage = await page.waitForSelector('div[data-testid="message"]');
  const messageText = await submittedMessage.innerText();
  expect(messageText).toBe("Test message");
});
