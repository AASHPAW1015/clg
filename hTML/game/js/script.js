// DOM elements
var zone = document.getElementById('reaction-zone');
var zoneMsg = document.getElementById('zone-msg');
var zoneTime = document.getElementById('zone-time');
var roundNum = document.getElementById('round-num');
var lastTime = document.getElementById('last-time');
var bestTime = document.getElementById('best-time');
var fill = document.getElementById('progress-fill');

// State
var round = 0, times = [], start = 0, timer = null, ready = false;
var ROUNDS = 5;

// Show one screen, hide others
function show(id) {
    document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
    document.getElementById(id).classList.add('active');
}

// Start game
function startGame() {
    round = 0; times = []; ready = false;
    lastTime.textContent = '—';
    bestTime.textContent = '—';
    roundNum.textContent = '1';
    fill.style.width = '0%';
    show('game-screen');
    newRound();
}

// New round: wait random 2–5s then turn green
function newRound() {
    ready = false;
    zone.className = 'zone waiting';
    zoneMsg.textContent = 'Wait...';
    zoneTime.textContent = '';
    var delay = 2000 + Math.floor(Math.random() * 3000);
    timer = setTimeout(function () {
        zone.className = 'zone ready';
        zoneMsg.textContent = 'CLICK!';
        start = Date.now();
        ready = true;
    }, delay);
}

// Zone click handler
zone.addEventListener('click', function () {
    // Too early
    if (!ready && zone.classList.contains('waiting')) {
        clearTimeout(timer);
        zone.className = 'zone too-early';
        zoneMsg.textContent = 'Too early! Click to retry.';
        zoneTime.textContent = '';
        return;
    }
    // Retry after too-early
    if (zone.classList.contains('too-early')) { newRound(); return; }
    // Next round after seeing result
    if (zone.classList.contains('clicked')) {
        round++;
        if (round >= ROUNDS) { endGame(); return; }
        roundNum.textContent = round + 1;
        newRound();
        return;
    }
    // Valid click on green
    if (ready) {
        var ms = Date.now() - start;
        ready = false;
        times.push(ms);
        zone.className = 'zone clicked';
        zoneMsg.textContent = 'Your time:';
        zoneTime.textContent = ms + ' ms';
        lastTime.textContent = ms;
        bestTime.textContent = Math.min.apply(null, times);
        fill.style.width = (times.length / ROUNDS * 100) + '%';
    }
});

// End game — show stats
function endGame() {
    var best = Math.min.apply(null, times);
    var worst = Math.max.apply(null, times);
    var avg = Math.round(times.reduce(function (a, b) { return a + b; }, 0) / times.length);
    document.getElementById('s-best').textContent = best + ' ms';
    document.getElementById('s-worst').textContent = worst + ' ms';
    document.getElementById('s-avg').textContent = avg + ' ms';
    document.getElementById('rating').textContent = avg < 300 ? 'Lightning fast!' : avg < 450 ? 'Nice reflexes!' : 'Keep practicing!';
    show('gameover-screen');
}

// Button listeners
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', function () { clearTimeout(timer); show('start-screen'); });
