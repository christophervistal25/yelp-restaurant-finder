# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> search returns restaurants with required fields
- Location: tests/app.spec.js:17:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#results ul')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('#results ul')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - heading "Restaurant Finder" [level=1] [ref=e2]
  - generic [ref=e3]:
    - textbox "Enter a city (e.g. New York)" [ref=e4]: New York
    - button "Search" [active] [ref=e5] [cursor=pointer]
  - paragraph
  - generic [ref=e6]:
    - generic [ref=e7]:
      - heading "Golden Diner" [level=3] [ref=e8]
      - paragraph [ref=e9]: "Rating: 4.3 / 5"
      - paragraph [ref=e10]:
        - strong [ref=e11]: "Address:"
        - text: 123 Madison St, New York, NY 10002
      - paragraph [ref=e12]: "Location: 40.71244, -73.994"
    - generic [ref=e13]:
      - heading "Anytime Kitchen" [level=3] [ref=e14]
      - paragraph [ref=e15]: "Rating: 4.6 / 5"
      - paragraph [ref=e16]:
        - strong [ref=e17]: "Address:"
        - text: 23 W 32nd St, Fl 3, New York, NY 10001
      - paragraph [ref=e18]: "Location: 40.74776270790539, -73.9867793576711"
    - generic [ref=e19]:
      - heading "Thai Diner" [level=3] [ref=e20]
      - paragraph [ref=e21]: "Rating: 4.2 / 5"
      - paragraph [ref=e22]:
        - strong [ref=e23]: "Address:"
        - text: 186 Mott St, New York, NY 10012
      - paragraph [ref=e24]: "Location: 40.72071042964739, -73.9956057"
    - generic [ref=e25]:
      - heading "Soothr" [level=3] [ref=e26]
      - paragraph [ref=e27]: "Rating: 4.5 / 5"
      - paragraph [ref=e28]:
        - strong [ref=e29]: "Address:"
        - text: 204 E 13th St, New York, NY 10003
      - paragraph [ref=e30]: "Location: 40.732259, -73.987363"
    - generic [ref=e31]:
      - heading "Nubiani" [level=3] [ref=e32]
      - paragraph [ref=e33]: "Rating: 4.5 / 5"
      - paragraph [ref=e34]:
        - strong [ref=e35]: "Address:"
        - text: 315 5th Ave, Fl 3, New York, NY 10016
      - paragraph [ref=e36]: "Location: 40.74700575561414, -73.9854169149663"
    - generic [ref=e37]:
      - heading "Valerie" [level=3] [ref=e38]
      - paragraph [ref=e39]: "Rating: 4.2 / 5"
      - paragraph [ref=e40]:
        - strong [ref=e41]: "Address:"
        - text: 45 W 45th St between 5th & 6th Ave, New York, NY 10036
      - paragraph [ref=e42]: "Location: 40.756326, -73.981117"
    - generic [ref=e43]:
      - heading "Gramercy Tavern" [level=3] [ref=e44]
      - paragraph [ref=e45]: "Rating: 4.4 / 5"
      - paragraph [ref=e46]:
        - strong [ref=e47]: "Address:"
        - text: 42 E 20th St, New York, NY 10003
      - paragraph [ref=e48]: "Location: 40.738436, -73.988497"
    - generic [ref=e49]:
      - heading "Don Angie" [level=3] [ref=e50]
      - paragraph [ref=e51]: "Rating: 4.5 / 5"
      - paragraph [ref=e52]:
        - strong [ref=e53]: "Address:"
        - text: 103 Greenwich Ave, New York, NY 10014
      - paragraph [ref=e54]: "Location: 40.73778, -74.00197"
    - generic [ref=e55]:
      - heading "Double Chicken Please" [level=3] [ref=e56]
      - paragraph [ref=e57]: "Rating: 4.4 / 5"
      - paragraph [ref=e58]:
        - strong [ref=e59]: "Address:"
        - text: 115 Allen St, New York, NY 10002
      - paragraph [ref=e60]: "Location: 40.719584, -73.990486"
    - generic [ref=e61]:
      - heading "Oscar Wilde" [level=3] [ref=e62]
      - paragraph [ref=e63]: "Rating: 3.8 / 5"
      - paragraph [ref=e64]:
        - strong [ref=e65]: "Address:"
        - text: 45 W 27th St, New York, NY 10001
      - paragraph [ref=e66]: "Location: 40.74514, -73.9900399"
    - generic [ref=e67]:
      - heading "Cecconi's Dumbo" [level=3] [ref=e68]
      - paragraph [ref=e69]: "Rating: 3.5 / 5"
      - paragraph [ref=e70]:
        - strong [ref=e71]: "Address:"
        - text: 55 Water St, Brooklyn, NY 11201
      - paragraph [ref=e72]: "Location: 40.703851696718694, -73.99146477492025"
    - generic [ref=e73]:
      - heading "Balthazar" [level=3] [ref=e74]
      - paragraph [ref=e75]: "Rating: 4 / 5"
      - paragraph [ref=e76]:
        - strong [ref=e77]: "Address:"
        - text: 80 Spring St, New York, NY 10012
      - paragraph [ref=e78]: "Location: 40.722675, -73.998285"
    - generic [ref=e79]:
      - heading "Kong Sihk Tong 港食堂" [level=3] [ref=e80]
      - paragraph [ref=e81]: "Rating: 4.2 / 5"
      - paragraph [ref=e82]:
        - strong [ref=e83]: "Address:"
        - text: 65 Bayard St, New York, NY 10013
      - paragraph [ref=e84]: "Location: 40.715433714742154, -73.9981186386701"
    - generic [ref=e85]:
      - heading "Manhatta" [level=3] [ref=e86]
      - paragraph [ref=e87]: "Rating: 4.4 / 5"
      - paragraph [ref=e88]:
        - strong [ref=e89]: "Address:"
        - text: 28 Liberty St, Fl 60, New York, NY 10005
      - paragraph [ref=e90]: "Location: 40.70800627689857, -74.00888226517013"
    - generic [ref=e91]:
      - heading "Boucherie West Village" [level=3] [ref=e92]
      - paragraph [ref=e93]: "Rating: 4.5 / 5"
      - paragraph [ref=e94]:
        - strong [ref=e95]: "Address:"
        - text: 99 7th Ave S, New York, NY 10014
      - paragraph [ref=e96]: "Location: 40.733094394854035, -74.0028772"
    - generic [ref=e97]:
      - heading "Carbone" [level=3] [ref=e98]
      - paragraph [ref=e99]: "Rating: 4 / 5"
      - paragraph [ref=e100]:
        - strong [ref=e101]: "Address:"
        - text: 181 Thompson St, New York, NY 10012
      - paragraph [ref=e102]: "Location: 40.72800126711089, -74.00024274442806"
    - generic [ref=e103]:
      - heading "Au Cheval" [level=3] [ref=e104]
      - paragraph [ref=e105]: "Rating: 4.3 / 5"
      - paragraph [ref=e106]:
        - strong [ref=e107]: "Address:"
        - text: 33 Cortlandt Aly, New York, NY 10013
      - paragraph [ref=e108]: "Location: 40.71812171604106, -74.00196237391103"
    - generic [ref=e109]:
      - heading "Carmine's - Time Square" [level=3] [ref=e110]
      - paragraph [ref=e111]: "Rating: 4 / 5"
      - paragraph [ref=e112]:
        - strong [ref=e113]: "Address:"
        - text: 200 W 44th St, New York, NY 10036
      - paragraph [ref=e114]: "Location: 40.75747, -73.9866"
    - generic [ref=e115]:
      - heading "Lillie's Victorian Establishment" [level=3] [ref=e116]
      - paragraph [ref=e117]: "Rating: 3.9 / 5"
      - paragraph [ref=e118]:
        - strong [ref=e119]: "Address:"
        - text: 249 W 49th St, New York, NY 10019
      - paragraph [ref=e120]: "Location: 40.7614625, -73.9860519"
    - generic [ref=e121]:
      - heading "Wayla" [level=3] [ref=e122]
      - paragraph [ref=e123]: "Rating: 4.4 / 5"
      - paragraph [ref=e124]:
        - strong [ref=e125]: "Address:"
        - text: 100 Forsyth St, Basement, New York, NY 10002
      - paragraph [ref=e126]: "Location: 40.7183, -73.9926038"
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test('page loads with title and search form', async ({ page }) => {
  4  |   await page.goto('/');
  5  |   await expect(page).toHaveTitle('Yelp Restaurant Finder');
  6  |   await expect(page.locator('h1')).toHaveText('Restaurant Finder');
  7  |   await expect(page.locator('#city-input')).toBeVisible();
  8  |   await expect(page.locator('button[type="submit"]')).toBeVisible();
  9  | });
  10 | 
  11 | test('empty input shows error message', async ({ page }) => {
  12 |   await page.goto('/');
  13 |   await page.click('button[type="submit"]');
  14 |   await expect(page.locator('#message')).toHaveText('Please enter a city.');
  15 | });
  16 | 
  17 | test('search returns restaurants with required fields', async ({ page }) => {
  18 |   await page.goto('/');
  19 |   await page.locator('#city-input').fill('New York');
  20 | 
  21 |   const responsePromise = page.waitForResponse((resp) =>
  22 |     resp.url().includes('/api/restaurants')
  23 |   );
  24 |   await page.click('button[type="submit"]');
  25 |   await responsePromise;
  26 | 
> 27 |   await expect(page.locator('#results ul')).toBeVisible({ timeout: 15000 });
     |                                             ^ Error: expect(locator).toBeVisible() failed
  28 | 
  29 |   const items = page.locator('#results ul li');
  30 |   const count = await items.count();
  31 |   expect(count).toBeGreaterThan(0);
  32 | 
  33 |   // Verify first result has name, rating, address, coordinates
  34 |   const firstItem = items.first();
  35 |   const text = await firstItem.textContent();
  36 |   expect(text).toMatch(/Rating: [\d.]+\/5/);
  37 |   expect(text).toMatch(/Address: .+/);
  38 |   expect(text).toMatch(/Coordinates: -?[\d.]+, -?[\d.]+/);
  39 | });
  40 | 
  41 | test('displays result count message', async ({ page }) => {
  42 |   await page.goto('/');
  43 |   await page.locator('#city-input').fill('Manila');
  44 | 
  45 |   const responsePromise = page.waitForResponse((resp) =>
  46 |     resp.url().includes('/api/restaurants')
  47 |   );
  48 |   await page.click('button[type="submit"]');
  49 |   await responsePromise;
  50 | 
  51 |   await expect(page.locator('#results ul')).toBeVisible({ timeout: 15000 });
  52 |   await expect(page.locator('#message')).toContainText('Found');
  53 |   await expect(page.locator('#message')).toContainText('restaurants in "Manila"');
  54 | });
  55 | 
  56 | test('invalid city shows error', async ({ page }) => {
  57 |   await page.goto('/');
  58 |   await page.locator('#city-input').fill('zzznotarealcity12345');
  59 | 
  60 |   const responsePromise = page.waitForResponse((resp) =>
  61 |     resp.url().includes('/api/restaurants')
  62 |   );
  63 |   await page.click('button[type="submit"]');
  64 |   await responsePromise;
  65 | 
  66 |   await expect(page.locator('#message')).not.toHaveText('', { timeout: 15000 });
  67 |   await expect(page.locator('#message')).not.toHaveText('Searching...');
  68 | });
  69 | 
```