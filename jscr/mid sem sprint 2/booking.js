/* ============================================================
   ParkPoint – Booking Page Logic (booking.js)
   ============================================================
   Handles:
     1. Reading URL params (spotId, isPeak)
     2. Populating pricing breakdown
     3. Reservation hold timer (5 min countdown, localStorage)
     4. Payment method selection
     5. Confirm booking → success overlay
   ============================================================ */

// ── 1. Read URL Parameters ──────────────────────────────────
const params = new URLSearchParams(window.location.search);
const spotId = params.get('spotId');
const isPeak = params.get('isPeak') === '1';

// Find the spot from our mock database (data.js)
const spot = parkingSpots.find(s => s.id === spotId);

if (!spot) {
    // Invalid or missing spot → redirect back to map
    document.getElementById('bookingSpotName').textContent = 'Spot not found';
    setTimeout(() => { window.location.href = 'map.html'; }, 2000);
}

// ── 2. Populate Spot Name & Pricing ─────────────────────────
if (spot) {
    document.getElementById('bookingSpotName').textContent = spot.name;

    const baseRate = spot.basePrice;
    const multiplier = isPeak ? 1.5 : 1.0;
    const total = Math.round(baseRate * multiplier);

    document.getElementById('cellBase').textContent = '₹' + baseRate + '/hr';
    document.getElementById('cellMultiplier').textContent = isPeak ? '1.5× (Applied)' : '1.0× (None)';
    document.getElementById('cellTotal').textContent = '₹' + total + '/hr';
}

// ── 3. Reservation Hold Timer ───────────────────────────────
// Uses localStorage so the countdown survives page refreshes.
// Key format: parkpoint_timer_<spotId>

const TIMER_DURATION = 5 * 60;  // 5 minutes in seconds
const TIMER_KEY = 'parkpoint_timer_' + spotId;

function getSecondsRemaining() {
    const startTime = localStorage.getItem(TIMER_KEY);

    if (!startTime) {
        // First visit → record the start time
        localStorage.setItem(TIMER_KEY, Date.now().toString());
        return TIMER_DURATION;
    }

    const elapsed = Math.floor((Date.now() - parseInt(startTime, 10)) / 1000);
    const remaining = TIMER_DURATION - elapsed;
    return remaining > 0 ? remaining : 0;
}

function formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return m + ':' + s;
}

const timerEl = document.getElementById('timerValue');

function updateTimerDisplay() {
    const remaining = getSecondsRemaining();

    timerEl.textContent = formatTime(remaining);

    // Color states
    timerEl.classList.remove('warning', 'danger');
    if (remaining <= 60) {
        timerEl.classList.add('danger');
    } else if (remaining <= 150) {
        timerEl.classList.add('warning');
    }

    if (remaining <= 0) {
        // Time expired → release spot and redirect
        clearInterval(timerInterval);
        localStorage.removeItem(TIMER_KEY);
        alert('⏰ Reservation expired! The spot has been released.');
        window.location.href = 'map.html';
    }
}

// Initial display + start interval
updateTimerDisplay();
const timerInterval = setInterval(updateTimerDisplay, 1000);

// ── 4. Payment Method Selection ─────────────────────────────
const paymentOptions = document.querySelectorAll('.payment-option');
const confirmBtn = document.getElementById('confirmBtn');
let selectedMethod = null;

paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Deselect all
        paymentOptions.forEach(o => o.classList.remove('selected'));
        // Select this one
        option.classList.add('selected');
        selectedMethod = option.getAttribute('data-method');
        // Enable confirm button
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Confirm Booking';
    });
});

// ── 5. Confirm Booking ──────────────────────────────────────
confirmBtn.addEventListener('click', () => {
    if (!selectedMethod) return;

    // Stop the timer
    clearInterval(timerInterval);
    // Clean up localStorage
    localStorage.removeItem(TIMER_KEY);

    // Show success overlay
    const overlay = document.getElementById('successOverlay');
    const msg = document.getElementById('successMsg');

    const methodLabels = { upi: 'UPI', card: 'Card', fastag: 'FASTag' };
    msg.textContent = `${spot.name} booked via ${methodLabels[selectedMethod]}. Total: ₹${Math.round(spot.basePrice * (isPeak ? 1.5 : 1.0))}/hr`;

    overlay.classList.add('visible');
});
