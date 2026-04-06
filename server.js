// Load environment variables from .env file
require('dotenv').config();
// Import necessary modules: express for creating the server and path for handling file paths
const express = require('express');
// The 'path' module provides utilities for working with file and directory paths. We will use it to serve static files from the 'public' directory. 
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
// This allows us to serve the frontend files (HTML, CSS, JS) from the 'public' folder
// The frontend will be built and placed in the 'public' directory, so we need to serve it as static files
// By using express.static middleware, we can serve the frontend files directly without needing to set up additional routes for each file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/restaurants', async (req, res) => {
  const { city } = req.query;

  if (!city || !city.trim()) {
    return res.status(400).json({ error: 'Please enter a city' });
  }

  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(city)}&radius=8047&limit=20&categories=restaurants`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Yelp error:', response.status, JSON.stringify(errorData));
      if (errorData.error && errorData.error.code === 'LOCATION_NOT_FOUND') {
        return res.status(404).json({ error: 'City not recognized. Please try another city.' });
      }
      return res.status(response.status).json({ error: 'Failed to fetch restaurants from Yelp' });
    }

    const data = await response.json();

    const restaurants = data.businesses.map((biz) => ({
      name: biz.name,
      rating: biz.rating,
      address: biz.location.display_address.join(', '),
      latitude: biz.coordinates.latitude,
      longitude: biz.coordinates.longitude,
    }));

    res.json({ restaurants });
  } catch (err) {
    console.error('Yelp API error:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// Start the server
// The server will listen on the specified PORT and log a message to the console when it's running
// This allows us to access the server at http://localhost:PORT and make API requests to it
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
