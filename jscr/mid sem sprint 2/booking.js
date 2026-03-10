// ============================================================
// ParkPoint – Booking Page Logic
// Plain, simple JavaScript.
// ============================================================


// --- 1. READ THE URL PARAMETERS ---
// The map page sends us: ?spotId=spot_001&isPeak=1

var params = new URLSearchParams(window.location.search);
var spotId = params.get("spotId");
var isPeakParam = params.get("isPeak");

// Convert isPeak from string to true/false
var isPeak = false;
if (isPeakParam === "1") {
    isPeak = true;
}


// --- 2. FIND THE SPOT IN OUR DATA ---

var spot = null;
for (var i = 0; i < parkingSpots.length; i++) {
    if (parkingSpots[i].id === spotId) {
        spot = parkingSpots[i];
        break;
    }
}

// If spot not found, show error and go back to map
if (spot === null) {
    document.getElementById("bookingSpotName").textContent = "Spot not found";
    setTimeout(function () {
        window.location.href = "map.html";
    }, 2000);
}


// --- 3. FILL IN THE SPOT NAME AND PRICING TABLE ---

if (spot !== null) {
    // Show spot name
    document.getElementById("bookingSpotName").textContent = spot.name;

    // Calculate the price
    var baseRate = spot.basePrice;
    var multiplier = 1.0;
    if (isPeak) {
        multiplier = 1.5;
    }
    var total = Math.round(baseRate * multiplier);

    // Fill in the table
    document.getElementById("cellBase").textContent = "₹" + baseRate + "/hr";

    if (isPeak) {
        document.getElementById("cellMultiplier").textContent = "1.5× (Applied)";
    } else {
        document.getElementById("cellMultiplier").textContent = "1.0× (None)";
    }

    document.getElementById("cellTotal").textContent = "₹" + total + "/hr";
}


// --- 4. THE COUNTDOWN TIMER ---
// 5 minutes = 300 seconds
// We save the start time in localStorage so refreshing the page
// doesn't reset the timer.

var TIMER_DURATION = 300;  // 5 minutes in seconds
var TIMER_KEY = "parkpoint_timer_" + spotId;

// Get how many seconds are left
function getSecondsRemaining() {
    var startTime = localStorage.getItem(TIMER_KEY);

    // If this is the first time visiting, save the current time
    if (startTime === null) {
        localStorage.setItem(TIMER_KEY, Date.now().toString());
        return TIMER_DURATION;
    }

    // Calculate how much time has passed
    var now = Date.now();
    var started = parseInt(startTime);
    var elapsedSeconds = Math.floor((now - started) / 1000);
    var remaining = TIMER_DURATION - elapsedSeconds;

    if (remaining < 0) {
        remaining = 0;
    }

    return remaining;
}

// Turn seconds into "MM:SS" format
function formatTime(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    // Add leading zero if needed
    var minStr = minutes.toString();
    if (minutes < 10) {
        minStr = "0" + minutes;
    }

    var secStr = seconds.toString();
    if (seconds < 10) {
        secStr = "0" + seconds;
    }

    return minStr + ":" + secStr;
}

// Update the timer display every second
var timerEl = document.getElementById("timerValue");

function updateTimer() {
    var remaining = getSecondsRemaining();

    // Show the time
    timerEl.textContent = formatTime(remaining);

    // Change color based on time left
    timerEl.classList.remove("warning", "danger");
    if (remaining <= 60) {
        timerEl.classList.add("danger");       // red when 1 min or less
    } else if (remaining <= 150) {
        timerEl.classList.add("warning");      // yellow when 2.5 min or less
    }

    // If time ran out, go back to map
    if (remaining <= 0) {
        clearInterval(timerInterval);
        localStorage.removeItem(TIMER_KEY);
        alert("Time's up! The spot has been released.");
        window.location.href = "map.html";
    }
}

// Run it once right away, then every 1 second
updateTimer();
var timerInterval = setInterval(updateTimer, 1000);


// --- 5. PAYMENT METHOD SELECTION ---

var paymentCards = document.querySelectorAll(".payment-option");
var confirmBtn = document.getElementById("confirmBtn");
var selectedMethod = null;

// Add click listener to each payment card
for (var j = 0; j < paymentCards.length; j++) {
    paymentCards[j].addEventListener("click", handlePaymentClick);
}

function handlePaymentClick() {
    // Remove "selected" from all cards
    for (var k = 0; k < paymentCards.length; k++) {
        paymentCards[k].classList.remove("selected");
    }

    // Add "selected" to the one that was clicked
    this.classList.add("selected");

    // Remember which method was picked
    selectedMethod = this.getAttribute("data-method");

    // Enable the confirm button
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Confirm Booking';
}


// --- 6. CONFIRM BOOKING ---

confirmBtn.addEventListener("click", function () {
    if (selectedMethod === null) {
        return;  // do nothing if no payment method selected
    }

    // Stop the timer
    clearInterval(timerInterval);
    localStorage.removeItem(TIMER_KEY);

    // Figure out the method name to show
    var methodName = "";
    if (selectedMethod === "upi") {
        methodName = "UPI";
    } else if (selectedMethod === "card") {
        methodName = "Card";
    } else if (selectedMethod === "fastag") {
        methodName = "FASTag";
    }

    // Calculate total price for the message
    var finalPrice = spot.basePrice;
    if (isPeak) {
        finalPrice = Math.round(spot.basePrice * 1.5);
    }

    // Show the success overlay
    var overlay = document.getElementById("successOverlay");
    var msg = document.getElementById("successMsg");
    msg.textContent = spot.name + " booked via " + methodName + ". Total: ₹" + finalPrice + "/hr";
    overlay.classList.add("visible");
});
