const form = document.getElementById('search-form');
const input = document.getElementById('city-input');
const message = document.getElementById('message');
const results = document.getElementById('results');
const searchBtn = form.querySelector('button');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const city = input.value.trim();
  if (!city) {
    message.innerHTML = '';
    results.innerHTML = '<div class="empty-state"><h2>Where are you headed?</h2><p>Enter a city name above to discover restaurants nearby.</p></div>';
    return;
  }

  message.textContent = '';
  results.innerHTML = '';
  searchBtn.classList.add('loading');

  try {
    const response = await fetch(`/api/restaurants?city=${encodeURIComponent(city)}`);
    const data = await response.json();
    searchBtn.classList.remove('loading');

    if (data.error) {
      results.innerHTML = `<div class="empty-state"><h2>Something went wrong</h2><p>${data.error}</p></div>`;
      return;
    }

    if (data.restaurants.length === 0) {
      results.innerHTML = `<div class="empty-state"><h2>No restaurants found</h2><p>We couldn't find any restaurants in "${city}". Try a different city or check the spelling.</p></div>`;
      return;
    }

    message.innerHTML = `Found <strong>${data.restaurants.length}</strong> restaurants in <strong>"${city}"</strong>`;

    data.restaurants.forEach((r) => {
      const card = document.createElement('div');
      card.className = 'card';

      const starsHtml = Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, r.rating - i));
        return `<span class="star"><span class="star-bg">★</span><span class="star-fill" style="width:${fill * 100}%">★</span></span>`;
      }).join('');

      const reviews = r.review_count ? r.review_count.toLocaleString() : '0';

      card.innerHTML = `
        <div class="card-img">
          ${r.image_url
            ? `<img src="${r.image_url}" alt="${r.name}" />`
            : `<div class="no-img"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><path d="M3 2l1.5 14h15L21 2"/><path d="M6 2v4a6 6 0 0012 0V2"/><path d="M12 16v6"/><path d="M8 22h8"/></svg></div>`}
          <span class="badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${r.rating}</span>
        </div>
        <div class="card-body">
          <h3>${r.url ? `<a href="${r.url}" target="_blank" rel="noopener">${r.name}</a>` : r.name}</h3>
          <div class="rating">
            <span class="rating-stars">${starsHtml}</span>
            <span class="rating-score">${r.rating}</span>
            <span class="rating-divider"></span>
            <span class="rating-count">${reviews} reviews</span>
          </div>
          <div class="info-row">
            <span class="icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
            <span>${r.address}</span>
          </div>
          <div class="coordinates-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span>${r.latitude}, ${r.longitude}</span>
          </div>
        </div>
        <div class="card-footer">
          <a class="directions-btn" href="https://www.google.com/maps/dir/?api=1&destination=${r.latitude},${r.longitude}" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Get Directions
          </a>
        </div>
      `;

      results.appendChild(card);
    });
  } catch (err) {
    searchBtn.classList.remove('loading');
    results.innerHTML = '<div class="empty-state"><h2>Something went wrong</h2><p>We had trouble connecting. Please check your connection and try again.</p></div>';
  }
});
