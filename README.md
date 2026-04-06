# Yelp Restaurant Finder

A simple web app that uses the Yelp Fusion API to find restaurants in any city.

## Run Locally

1. Clone this repo
2. Run `npm install`
3. Create a `.env` file with your Yelp API key (see `.env.example`)
4. Run `npm start`
5. Open `http://localhost:3000`

## Approach

I built this as a simple Node.js/Express app with a vanilla HTML frontend. The server acts as a proxy to the Yelp Fusion API, keeping the API key secure on the server side. The frontend sends the city name to the server, which queries Yelp's `/v3/businesses/search` endpoint with a 5-mile radius filter and returns the relevant restaurant data. I kept the architecture minimal — one server file, one HTML page — to prioritize clarity and simplicity.

## Accuracy & Edge Cases

- Results are scoped to a 5-mile (8047m) radius from the city center using Yelp's `radius` parameter
- The `categories=restaurants` filter ensures only restaurant businesses are returned
- Empty input, unrecognized cities, and API errors all show user-friendly messages
- City names are URL-encoded to handle spaces and special characters
