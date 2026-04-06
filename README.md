# Yelp Restaurant Finder

A simple web app to find restaurants in any city using the Yelp API.

## Getting Started

1. Clone the repo
   ```bash
   git clone <repo-url>
   cd yelp-restaurant-finder
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Add your Yelp API key
   ```bash
   cp .env.example .env
   ```
   Open `.env` and replace `your_yelp_api_key_here` with your actual key from [Yelp Developers](https://www.yelp.com/developers/v3/manage_app).

4. Start the server
   ```bash
   npm start
   ```
5. Open http://localhost:3000

## Running Tests

1. Install Playwright (first time only)
   ```bash
   npx playwright install chromium
   ```
2. Run the tests
   ```bash
   npm test
   ```
   This runs 18 end-to-end tests. The server starts automatically — no need to run `npm start` separately.

## Approach

Node.js/Express serves a vanilla HTML frontend and proxies Yelp API requests server-side to keep the API key secure. The frontend sends a city name, the server queries Yelp's `/v3/businesses/search` with a 5-mile radius filter, and returns restaurant data. Architecture is minimal — one server file, one HTML page, one CSS file, one JS file.

## Accuracy & Edge Cases

- 5-mile radius (`8047m`) scoped to city center via Yelp's `radius` param
- `categories=restaurants` filter ensures only restaurants are returned
- Empty input, invalid cities, API errors, and network failures all show friendly messages
- City names are URL-encoded for spaces and special characters
