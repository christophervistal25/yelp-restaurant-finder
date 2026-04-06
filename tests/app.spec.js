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
  await expect(page.locator('#results .empty-state h2')).toHaveText('Where are you headed?');
});

test('search returns restaurants with required fields', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('New York');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });

  const cards = page.locator('#results .card');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  // Verify first result has name, rating, address, coordinates
  const firstCard = cards.first();
  await expect(firstCard.locator('h3')).toBeVisible();
  const text = await firstCard.textContent();
  expect(text).toMatch(/[\d.]+/);
  expect(text).toMatch(/reviews/);
  expect(text).toMatch(/Get Directions/);
});

test('displays multiple restaurant cards', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('Manila');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });
  const count = await page.locator('#results .card').count();
  expect(count).toBeGreaterThan(1);
});

test('invalid city shows error', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('zzznotarealcity12345');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .empty-state h2')).toHaveText('Something went wrong', { timeout: 15000 });
});

test('network error shows connection error message', async ({ page }) => {
  await page.goto('/');
  await page.route('**/api/restaurants*', async (route) => {
    await route.abort('failed');
  });

  await page.locator('#city-input').fill('New York');
  await page.click('button[type="submit"]');

  await expect(page.locator('#results .empty-state p')).toHaveText('We had trouble connecting. Please check your connection and try again.', { timeout: 15000 });
});
