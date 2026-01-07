import { test, expect } from "@playwright/test";

test.describe("JobTrackr Core Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should allow me to add a new job and see it in the Wishlist", async ({
    page,
  }) => {
    await page
      .locator('div:has-text("Wishlist")')
      .locator("button")
      .first()
      .click();

    await page.getByPlaceholder("e.g. Google").fill("Test Company");
    await page
      .getByPlaceholder("e.g. Senior Frontend Engineer")
      .fill("Test Engineer");
    await page.getByPlaceholder("e.g. $140k - $180k").fill("$100k");

    await page.getByRole("button", { name: /Add to Wishlist/i }).click();

    const card = page.locator("text=Test Company");
    await expect(card).toBeVisible();
    await expect(page.locator("text=Test Engineer")).toBeVisible();
  });

  test("should persist data after a page reload", async ({ page }) => {
    await page
      .locator('div:has-text("Wishlist")')
      .locator("button")
      .first()
      .click();

    await page.getByPlaceholder("e.g. Google").fill("Persistence Tech");
    await page
      .getByPlaceholder("e.g. Senior Frontend Engineer")
      .fill("Persistence Engineer");
    await page.getByPlaceholder("e.g. $140k - $180k").fill("$120k");

    await page.getByRole("button", { name: /Add to Wishlist/i }).click();

    const newCard = page.locator("text=Persistence Tech");
    await expect(newCard).toBeVisible();

    await page.reload();
    await expect(page.locator("text=Persistence Tech")).toBeVisible({
      timeout: 10000,
    });
  });
});
