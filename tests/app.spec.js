const { test, expect } = require('@playwright/test');

test('page loads with title and search form', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Yelp Restaurant Finder');
  await expect(page.locator('h1')).toHaveText('Restaurant Finder');
  await expect(page.locator('#city-input')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test('empty input shows error message', async ({ page }) => {
  await page.goto('/');
  await page.click('button[type="submit"]');
  await expect(page.locator('#message')).toHaveText('Please enter a city.');
});

test('search returns restaurants with required fields', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('New York');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results ul')).toBeVisible({ timeout: 15000 });

  const items = page.locator('#results ul li');
  const count = await items.count();
  expect(count).toBeGreaterThan(0);

  // Verify first result has name, rating, address, coordinates
  const firstItem = items.first();
  const text = await firstItem.textContent();
  expect(text).toMatch(/Rating: [\d.]+\/5/);
  expect(text).toMatch(/Address: .+/);
  expect(text).toMatch(/Coordinates: -?[\d.]+, -?[\d.]+/);
});

test('displays result count message', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('Manila');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results ul')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('#message')).toContainText('Found');
  await expect(page.locator('#message')).toContainText('restaurants in "Manila"');
});

test('invalid city shows error', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('zzznotarealcity12345');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#message')).not.toHaveText('', { timeout: 15000 });
  await expect(page.locator('#message')).not.toHaveText('Searching...');
});
