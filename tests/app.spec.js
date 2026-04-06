const { test, expect } = require('@playwright/test');

// === Page Load ===

test('page loads with title and search form', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Yelp Restaurant Finder');
  await expect(page.locator('h1')).toHaveText('Restaurant Finder');
  await expect(page.locator('#city-input')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test('search input has placeholder text', async ({ page }) => {
  await page.goto('/');
  const placeholder = await page.locator('#city-input').getAttribute('placeholder');
  expect(placeholder).toContain('Search a city');
});

// === Empty / Invalid Input ===

test('empty input shows empty state message', async ({ page }) => {
  await page.goto('/');
  await page.click('button[type="submit"]');
  await expect(page.locator('#results .empty-state h2')).toHaveText('Where are you headed?');
  await expect(page.locator('#results .empty-state p')).toContainText('Enter a city name above');
});

test('whitespace-only input shows empty state', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('   ');
  await page.click('button[type="submit"]');
  await expect(page.locator('#results .empty-state h2')).toHaveText('Where are you headed?');
});

// === Successful Search ===

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

  const firstCard = cards.first();
  await expect(firstCard.locator('h3')).toBeVisible();
  const text = await firstCard.textContent();
  expect(text).toMatch(/[\d.]+/);
  expect(text).toMatch(/reviews/);
  expect(text).toMatch(/Get Directions/);
});

test('displays result count message after search', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('New York');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });
  await expect(page.locator('#message')).toContainText('Found');
  await expect(page.locator('#message')).toContainText('restaurants in');
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

test('each card has an image or placeholder', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('New York');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });

  const firstCard = page.locator('#results .card').first();
  const hasImg = await firstCard.locator('.card-img img').count();
  const hasPlaceholder = await firstCard.locator('.card-img .no-img').count();
  expect(hasImg + hasPlaceholder).toBe(1);
});

test('each card has a rating badge on the image', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('New York');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });
  await expect(page.locator('#results .card').first().locator('.badge')).toBeVisible();
});

test('get directions link points to google maps', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('New York');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });

  const href = await page.locator('#results .card').first().locator('.directions-btn').getAttribute('href');
  expect(href).toContain('google.com/maps/dir');
  expect(href).toContain('destination=');
});

test('restaurant name links to yelp', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('New York');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });

  const href = await page.locator('#results .card').first().locator('h3 a').getAttribute('href');
  expect(href).toContain('yelp.com');
});

// === City with special characters ===

test('city with spaces works correctly', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('San Francisco');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });
  await expect(page.locator('#message')).toContainText('San Francisco');
});

// === Error States ===

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

  await expect(page.locator('#results .empty-state p')).toHaveText(
    'We had trouble connecting. Please check your connection and try again.',
    { timeout: 15000 }
  );
});

test('server 500 error shows error state', async ({ page }) => {
  await page.goto('/');
  await page.route('**/api/restaurants*', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal server error' }),
    });
  });

  await page.locator('#city-input').fill('New York');
  await page.click('button[type="submit"]');

  await expect(page.locator('#results .empty-state h2')).toHaveText('Something went wrong', { timeout: 15000 });
  await expect(page.locator('#results .empty-state p')).toContainText('Internal server error');
});

// === UI Behavior ===

test('button shows loading spinner during search', async ({ page }) => {
  await page.goto('/');
  await page.route('**/api/restaurants*', async (route) => {
    await new Promise((r) => setTimeout(r, 1000));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ restaurants: [] }),
    });
  });

  await page.locator('#city-input').fill('Tokyo');
  await page.click('button[type="submit"]');

  await expect(page.locator('button.loading')).toBeVisible();
  await expect(page.locator('.btn-spinner')).toBeVisible();
  await expect(page.locator('.btn-text')).not.toBeVisible();
});

test('previous results are cleared on new search', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('New York');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise;

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });
  const firstCount = await page.locator('#results .card').count();
  expect(firstCount).toBeGreaterThan(0);

  // Search again
  await page.locator('#city-input').fill('zzznotarealcity12345');
  const responsePromise2 = page.waitForResponse((resp) =>
    resp.url().includes('/api/restaurants')
  );
  await page.click('button[type="submit"]');
  await responsePromise2;

  await expect(page.locator('#results .empty-state')).toBeVisible({ timeout: 15000 });
  const cardCount = await page.locator('#results .card').count();
  expect(cardCount).toBe(0);
});

test('search can be submitted with Enter key', async ({ page }) => {
  await page.goto('/');
  await page.locator('#city-input').fill('New York');
  await page.locator('#city-input').press('Enter');

  await expect(page.locator('#results .card').first()).toBeVisible({ timeout: 15000 });
});
