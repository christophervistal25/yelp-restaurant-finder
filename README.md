# Yelp Restaurant Finder

A simple web app to find restaurants in any city using the Yelp API.

## Setup

```bash
npm install
cp .env.example .env   # then add your Yelp API key
npm start               # opens at http://localhost:3000
```

## Tests

```bash
npx playwright install chromium   # first time only
npm test                          # runs 18 e2e tests (server starts automatically)
```

## Approach

Node.js/Express serves a vanilla HTML frontend and proxies Yelp API requests server-side to keep the API key secure. The frontend sends a city name, the server queries Yelp's `/v3/businesses/search` with a 5-mile radius filter, and returns restaurant data. Architecture is minimal — one server file, one HTML page, one CSS file, one JS file.

## Accuracy & Edge Cases

- 5-mile radius (`8047m`) scoped to city center via Yelp's `radius` param
- `categories=restaurants` filter ensures only restaurants are returned
- Empty input, invalid cities, API errors, and network failures all show friendly messages
- City names are URL-encoded for spaces and special characters
