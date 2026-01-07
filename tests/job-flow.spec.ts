import { test, expect } from '@playwright/test';

test.describe('JobTrackr Core Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  });

  test('should allow me to add a new job and see it in the Wishlist', async ({ page }) => {
    await page.locator('div:has-text("Wishlist")').locator('button').first().click();

    await page.getByPlaceholder('e.g. Google').fill('Test Company');
    await page.getByPlaceholder('e.g. Senior Frontend Engineer').fill('Test Engineer');
    await page.getByPlaceholder('e.g. $140k - $180k').fill('$100k');
    
    await page.getByRole('button', { name: /Add to Wishlist/i }).click();

    const card = page.locator('text=Test Company');
    await expect(card).toBeVisible();
    await expect(page.locator('text=Test Engineer')).toBeVisible();
  });

  test('should persist data after a page reload', async ({ page }) => {
    // 1. Open Modal
    await page.locator('div:has-text("Wishlist")').locator('button').first().click();

    // 2. Fill ALL required fields (Fix: Added the Title field)
    await page.getByPlaceholder('e.g. Google').fill('Persistence Tech');
    await page.getByPlaceholder('e.g. Senior Frontend Engineer').fill('Persistence Engineer');
    await page.getByPlaceholder('e.g. $140k - $180k').fill('$120k');
    
    // 3. Submit
    await page.getByRole('button', { name: /Add to Wishlist/i }).click();

    // 4. Wait for UI update
    const newCard = page.locator('text=Persistence Tech');
    await expect(newCard).toBeVisible(); 

    // 5. Reload and check persistence
    await page.reload();
    await expect(page.locator('text=Persistence Tech')).toBeVisible({ timeout: 10000 });
  });
});