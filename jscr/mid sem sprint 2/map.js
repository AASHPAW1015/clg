/* ============================================================
   ParkPoint – Map Page Logic (map.js)
   ============================================================
   Handles:
     1. Leaflet map initialisation with OpenStreetMap tiles
     2. Custom CSS markers rendered from parkingSpots (data.js)
     3. Marker click → populate left panel + right price card
     4. Filter system (EV, Large Vehicle, Low Price)
     5. Locality search
     6. Peak-pricing toggle (1.5× multiplier)
   ============================================================ */

// ── State ────────────────────────────────────────────────────
let isPeak = false;           // peak pricing flag
let selectedSpot = null;      // currently selected spot object
let markerLayer = null;       // Leaflet layer group for markers
let activeMarkerEl = null;    // the currently highlighted marker DOM element

// ── 1. Map Initialisation ────────────────────────────────────
const map = L.map('map', {
    center: [19.076, 72.8777],  // Mumbai centre
    zoom: 13,
    zoomControl: false          // we'll reposition it
});

// Add zoom control to bottom-left so it doesn't overlap our panels
L.control.zoom({ position: 'bottomleft' }).addTo(map);

// OpenStreetMap tile layer with dark-style carto tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://osm.org/copyright">OSM</a>',
    maxZoom: 19
}).addTo(map);

// ── 2. Helper: Create a custom DivIcon marker ───────────────
function createMarkerIcon(isActive = false) {
    return L.divIcon({
        className: '',   // prevent Leaflet's default blue-icon class
        html: `
      <div class="custom-marker ${isActive ? 'active' : ''}">
        <div class="pin"><div class="pin-inner"></div></div>
      </div>`,
        iconSize: [30, 38],
        iconAnchor: [15, 38]
    });
}

// ── 3. Render markers on the map ─────────────────────────────
function renderMarkers(spots) {
    // Remove old layer if it exists
    if (markerLayer) {
        map.removeLayer(markerLayer);
    }
    markerLayer = L.layerGroup();

    spots.forEach(spot => {
        const marker = L.marker([spot.lat, spot.lng], {
            icon: createMarkerIcon(selectedSpot && selectedSpot.id === spot.id)
        });

        marker.on('click', () => selectSpot(spot, marker));
        markerLayer.addLayer(marker);
    });

    markerLayer.addTo(map);
}

// ── 4. Spot Selection ────────────────────────────────────────
function selectSpot(spot, marker) {
    selectedSpot = spot;

    // Reset previous active marker
    if (activeMarkerEl) {
        activeMarkerEl.classList.remove('active');
    }

    // Highlight clicked marker
    const el = marker.getElement();
    if (el) {
        const markerDiv = el.querySelector('.custom-marker');
        if (markerDiv) {
            markerDiv.classList.add('active');
            activeMarkerEl = markerDiv;
        }
    }

    // Populate left panel
    document.getElementById('spotName').textContent = spot.name;
    document.getElementById('spotLocality').textContent = spot.locality;
    document.getElementById('spotRating').textContent = spot.rating + ' / 5';
    document.getElementById('spotSize').textContent = 'Up to ' + spot.sizeLimit;

    // Amenities
    const tagsContainer = document.getElementById('spotAmenities');
    tagsContainer.innerHTML = '';
    spot.amenities.forEach(a => {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.innerHTML = amenityIcon(a) + ' ' + a;
        tagsContainer.appendChild(badge);
    });

    // Google Maps link
    document.getElementById('spotGmaps').href =
        `https://www.google.com/maps?q=${spot.lat},${spot.lng}`;

    // Book button
    document.getElementById('bookBtn').href =
        `booking.html?spotId=${spot.id}&isPeak=${isPeak ? 1 : 0}`;

    // Show panel
    document.getElementById('panelLeft').classList.remove('hidden');

    // Update price card
    updatePriceCard(spot);
}

// Small helper: icon per amenity type
function amenityIcon(name) {
    const icons = {
        'EV Charging': '<i class="fa-solid fa-bolt text-green"></i>',
        'CCTV': '<i class="fa-solid fa-video"></i>',
        'Restroom': '<i class="fa-solid fa-restroom"></i>',
        'Covered Parking': '<i class="fa-solid fa-warehouse"></i>',
        '24/7 Access': '<i class="fa-solid fa-clock"></i>',
        'Valet': '<i class="fa-solid fa-user-tie"></i>'
    };
    return icons[name] || '<i class="fa-solid fa-check"></i>';
}

// ── 5. Price Card ────────────────────────────────────────────
function updatePriceCard(spot) {
    const price = calculatePrice(spot.basePrice);
    document.getElementById('priceValue').textContent = '₹' + price;

    // Peak label
    const peakLabel = document.getElementById('peakLabel');
    if (isPeak) {
        peakLabel.classList.add('visible');
    } else {
        peakLabel.classList.remove('visible');
    }

    document.getElementById('priceCard').classList.remove('hidden');
}

// ── 6. Peak Pricing Algorithm ────────────────────────────────
// FinalPrice = BaseRate × (isPeak ? 1.5 : 1.0)
function calculatePrice(baseRate) {
    return Math.round(baseRate * (isPeak ? 1.5 : 1.0));
}

// ── 7. Peak Toggle Handler ──────────────────────────────────
document.getElementById('peakToggle').addEventListener('change', function () {
    isPeak = this.checked;

    // If a spot is selected, update its price card immediately
    if (selectedSpot) {
        updatePriceCard(selectedSpot);
        // Also update the booking link with the new isPeak value
        document.getElementById('bookBtn').href =
            `booking.html?spotId=${selectedSpot.id}&isPeak=${isPeak ? 1 : 0}`;
    }
});

// ── 8. Filter System ─────────────────────────────────────────
const chkEV = document.getElementById('chkEV');
const chkLarge = document.getElementById('chkLarge');
const chkLowPrice = document.getElementById('chkLowPrice');
const searchInput = document.getElementById('searchInput');

function getFilteredSpots() {
    let filtered = parkingSpots;

    if (chkEV.checked) {
        filtered = filtered.filter(s => s.hasEV === true);
    }
    if (chkLarge.checked) {
        filtered = filtered.filter(s => s.hasLargeAccess === true);
    }
    if (chkLowPrice.checked) {
        filtered = filtered.filter(s => s.basePrice <= 100);
    }

    // Search by locality
    const query = searchInput.value.trim().toLowerCase();
    if (query.length > 0) {
        filtered = filtered.filter(s =>
            s.locality.toLowerCase().includes(query) ||
            s.name.toLowerCase().includes(query)
        );
    }

    return filtered;
}

function applyFilters() {
    const spots = getFilteredSpots();
    renderMarkers(spots);
}

// Attach event listeners
[chkEV, chkLarge, chkLowPrice].forEach(cb => {
    cb.addEventListener('change', applyFilters);
});

searchInput.addEventListener('input', applyFilters);

// ── 9. Filter Dropdown Toggle ────────────────────────────────
const filterToggleBtn = document.getElementById('filterToggleBtn');
const filterMenu = document.getElementById('filterMenu');

filterToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = filterMenu.classList.toggle('open');
    filterToggleBtn.setAttribute('aria-expanded', isOpen);
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!filterMenu.contains(e.target) && !filterToggleBtn.contains(e.target)) {
        filterMenu.classList.remove('open');
        filterToggleBtn.setAttribute('aria-expanded', 'false');
    }
});

// ── 10. Panel Close Button ──────────────────────────────────
document.getElementById('panelClose').addEventListener('click', () => {
    document.getElementById('panelLeft').classList.add('hidden');
    document.getElementById('priceCard').classList.add('hidden');

    // Reset active marker
    if (activeMarkerEl) {
        activeMarkerEl.classList.remove('active');
        activeMarkerEl = null;
    }
    selectedSpot = null;
});

// ── 11. Initial Render ──────────────────────────────────────
renderMarkers(parkingSpots);
