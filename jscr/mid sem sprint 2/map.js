// ============================================================
// ParkPoint – Map Page Logic
// Plain, simple JavaScript. No fancy stuff.
// ============================================================


// --- VARIABLES ---

var isPeak = false;          // is peak pricing on?
var selectedSpot = null;     // which spot did the user click?
var markerLayer = null;      // leaflet layer that holds all the pins
var activeMarkerEl = null;   // the DOM element of the currently green pin


// --- 1. SET UP THE MAP ---

var map = L.map("map", {
    center: [19.076, 72.8777],   // Mumbai center
    zoom: 13,
    zoomControl: false
});

// Put zoom buttons on bottom-left (so they dont overlap our panels)
L.control.zoom({ position: "bottomleft" }).addTo(map);

// Add the dark map tiles
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://osm.org/copyright">OSM</a>',
    maxZoom: 19
}).addTo(map);


// --- 2. MAKE A PIN ICON ---
// Returns a Leaflet divIcon. If isActive is true, pin is green.

function createMarkerIcon(isActive) {
    var className = "custom-marker";
    if (isActive) {
        className = "custom-marker active";
    }

    var html = '<div class="' + className + '">' +
        '<div class="pin"><div class="pin-inner"></div></div>' +
        '</div>';

    return L.divIcon({
        className: "",
        html: html,
        iconSize: [30, 38],
        iconAnchor: [15, 38]
    });
}


// --- 3. PUT PINS ON THE MAP ---
// Takes an array of spots and draws them on the map.

function renderMarkers(spots) {
    // Remove old pins first
    if (markerLayer) {
        map.removeLayer(markerLayer);
    }

    markerLayer = L.layerGroup();

    for (var i = 0; i < spots.length; i++) {
        var spot = spots[i];

        // Check if this spot is the one the user clicked
        var isActive = false;
        if (selectedSpot && selectedSpot.id === spot.id) {
            isActive = true;
        }

        var marker = L.marker([spot.lat, spot.lng], {
            icon: createMarkerIcon(isActive)
        });

        // We need a closure here so each click remembers its own spot
        marker.on("click", makeClickHandler(spot, marker));

        markerLayer.addLayer(marker);
    }

    markerLayer.addTo(map);
}

// This function returns a click handler for a specific spot
function makeClickHandler(spot, marker) {
    return function () {
        selectSpot(spot, marker);
    };
}


// --- 4. WHEN USER CLICKS A PIN ---

function selectSpot(spot, marker) {
    selectedSpot = spot;

    // Un-highlight the old pin
    if (activeMarkerEl) {
        activeMarkerEl.classList.remove("active");
    }

    // Highlight the clicked pin (make it green)
    var el = marker.getElement();
    if (el) {
        var markerDiv = el.querySelector(".custom-marker");
        if (markerDiv) {
            markerDiv.classList.add("active");
            activeMarkerEl = markerDiv;
        }
    }

    // Fill in the left panel with spot info
    document.getElementById("spotName").textContent = spot.name;
    document.getElementById("spotLocality").textContent = spot.locality;
    document.getElementById("spotRating").textContent = spot.rating + " / 5";
    document.getElementById("spotSize").textContent = "Up to " + spot.sizeLimit;

    // Show the amenities as badges
    var tagsContainer = document.getElementById("spotAmenities");
    tagsContainer.innerHTML = "";

    for (var i = 0; i < spot.amenities.length; i++) {
        var amenity = spot.amenities[i];
        var badge = document.createElement("span");
        badge.className = "badge";
        badge.innerHTML = getAmenityIcon(amenity) + " " + amenity;
        tagsContainer.appendChild(badge);
    }

    // Set the Google Maps link
    document.getElementById("spotGmaps").href =
        "https://www.google.com/maps?q=" + spot.lat + "," + spot.lng;

    // Set the Book button link
    var peakValue = 0;
    if (isPeak) {
        peakValue = 1;
    }
    document.getElementById("bookBtn").href =
        "booking.html?spotId=" + spot.id + "&isPeak=" + peakValue;

    // Show the left panel (remove the "hidden" class)
    document.getElementById("panelLeft").classList.remove("hidden");

    // Update the price card on the right
    showPriceCard(spot);
}


// --- 5. GET ICON HTML FOR AN AMENITY ---

function getAmenityIcon(name) {
    if (name === "EV Charging") {
        return '<i class="fa-solid fa-bolt text-green"></i>';
    } else if (name === "CCTV") {
        return '<i class="fa-solid fa-video"></i>';
    } else if (name === "Restroom") {
        return '<i class="fa-solid fa-restroom"></i>';
    } else if (name === "Covered Parking") {
        return '<i class="fa-solid fa-warehouse"></i>';
    } else if (name === "24/7 Access") {
        return '<i class="fa-solid fa-clock"></i>';
    } else if (name === "Valet") {
        return '<i class="fa-solid fa-user-tie"></i>';
    } else {
        return '<i class="fa-solid fa-check"></i>';
    }
}


// --- 6. SHOW THE PRICE CARD ---

function showPriceCard(spot) {
    // Calculate price using peak pricing formula
    var price = calculatePrice(spot.basePrice);

    document.getElementById("priceValue").textContent = "₹" + price;

    // Show or hide the "Dynamic Pricing Active" label
    var peakLabel = document.getElementById("peakLabel");
    if (isPeak) {
        peakLabel.classList.add("visible");
    } else {
        peakLabel.classList.remove("visible");
    }

    // Make the card visible
    document.getElementById("priceCard").classList.remove("hidden");
}


// --- 7. PEAK PRICING FORMULA ---
// FinalPrice = BaseRate × 1.5  (if peak is on)
// FinalPrice = BaseRate × 1.0  (if peak is off)

function calculatePrice(baseRate) {
    if (isPeak) {
        return Math.round(baseRate * 1.5);
    } else {
        return baseRate;
    }
}


// --- 8. PEAK TOGGLE ---
// When the user flips the switch, turn peak pricing on/off

var peakToggle = document.getElementById("peakToggle");

peakToggle.addEventListener("change", function () {
    isPeak = peakToggle.checked;

    // If a spot is already selected, update its price right away
    if (selectedSpot) {
        showPriceCard(selectedSpot);

        // Also update the booking link
        var peakValue = 0;
        if (isPeak) {
            peakValue = 1;
        }
        document.getElementById("bookBtn").href =
            "booking.html?spotId=" + selectedSpot.id + "&isPeak=" + peakValue;
    }
});


// --- 9. FILTER SYSTEM ---

var chkEV = document.getElementById("chkEV");
var chkLarge = document.getElementById("chkLarge");
var chkLowPrice = document.getElementById("chkLowPrice");
var searchInput = document.getElementById("searchInput");

// This function looks at which boxes are checked and what search text is entered,
// then returns only the spots that match.
function getFilteredSpots() {
    var results = [];

    for (var i = 0; i < parkingSpots.length; i++) {
        var spot = parkingSpots[i];
        var show = true;  // assume we show it, then check each filter

        // Filter: EV Friendly
        if (chkEV.checked && spot.hasEV === false) {
            show = false;
        }

        // Filter: Large Vehicle Access
        if (chkLarge.checked && spot.hasLargeAccess === false) {
            show = false;
        }

        // Filter: Low Price (100 or less)
        if (chkLowPrice.checked && spot.basePrice > 100) {
            show = false;
        }

        // Filter: Search text
        var query = searchInput.value.trim().toLowerCase();
        if (query.length > 0) {
            var matchesLocality = spot.locality.toLowerCase().indexOf(query) !== -1;
            var matchesName = spot.name.toLowerCase().indexOf(query) !== -1;
            if (!matchesLocality && !matchesName) {
                show = false;
            }
        }

        if (show) {
            results.push(spot);
        }
    }

    return results;
}

// Re-draw the markers whenever a filter changes
function applyFilters() {
    var spots = getFilteredSpots();
    renderMarkers(spots);
}

// Listen for checkbox changes
chkEV.addEventListener("change", applyFilters);
chkLarge.addEventListener("change", applyFilters);
chkLowPrice.addEventListener("change", applyFilters);

// Listen for typing in the search box
searchInput.addEventListener("input", applyFilters);


// --- 10. OPEN/CLOSE THE FILTER DROPDOWN ---

var filterToggleBtn = document.getElementById("filterToggleBtn");
var filterMenu = document.getElementById("filterMenu");

filterToggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();  // dont let the click bubble up

    // Toggle the dropdown open/closed
    if (filterMenu.classList.contains("open")) {
        filterMenu.classList.remove("open");
    } else {
        filterMenu.classList.add("open");
    }
});

// Click anywhere else on the page = close the dropdown
document.addEventListener("click", function (e) {
    if (!filterMenu.contains(e.target) && !filterToggleBtn.contains(e.target)) {
        filterMenu.classList.remove("open");
    }
});


// --- 11. CLOSE BUTTON ON THE LEFT PANEL ---

document.getElementById("panelClose").addEventListener("click", function () {
    document.getElementById("panelLeft").classList.add("hidden");
    document.getElementById("priceCard").classList.add("hidden");

    // Un-highlight the pin
    if (activeMarkerEl) {
        activeMarkerEl.classList.remove("active");
        activeMarkerEl = null;
    }
    selectedSpot = null;
});


// --- 12. START THE APP ---
// Draw all markers when the page first loads

renderMarkers(parkingSpots);
