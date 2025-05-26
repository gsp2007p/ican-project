import { test as base, Page, expect } from '@playwright/test';


type MyFixtures = {
  inventoryFixturePage: Page;
};

export const test = base.extend<MyFixtures>({
  inventoryFixturePage: async ({ page }, use) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('/inventory.html');

    // Use the fixture value in the test.
    await use(page);
    await page.close();
  },
});

