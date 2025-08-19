const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('time');
const scoreText = document.getElementById('scoreText');
const timerText = document.getElementById('timerText');
const playButton = document.getElementById('Playbtn');
const secSound = document.getElementById("secSound");
const endSound = document.getElementById("endSound");
const tickSound = document.getElementById("tickSound");

let score = 0;
let timeLeft = 30;
let gameActive = false;
let countdown;
let moleTimeout;
playButton.disabled = false;
rBlinking();
link();

function playSecSound() {
    secSound.currentTime = 0;
    secSound.play();
}

function gameEndSound() {
    endSound.currentTime = 0;
    endSound.play();
}

function tickSoundPlay() {
    tickSound.currentTime = 0;
    tickSound.play();
}

function rBlinking() {
    scoreText.classList.remove('blinking');
    timerText.classList.remove('blinking');
}

function aBlinking() {
    scoreText.classList.add('blinking');
    timerText.classList.add('blinking');
}

function link() {
    playButton.classList.add('link');
    playButton.classList.remove('no-link');
}

function noLink() {
    playButton.classList.remove('link');
    playButton.classList.add('no-link');
}

playButton.addEventListener('click', startGame);

function startGame() {
    aBlinking();
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = "0:30";
    playButton.disabled = true;
    noLink();

    showMole();

    setTimeout(() => {
        tickSoundPlay();
    }, 200);

    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `0:${timeLeft < 10 ? "0" : ""}${timeLeft}`;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

let lastHole;

function randomHole() {
    let idx;
    let hole;
    do {
        idx = Math.floor(Math.random() * holes.length);
        hole = holes[idx];
    } while (hole === lastHole);
    lastHole = hole;
    return hole;
}


function showMole() {
    if (!gameActive) return;

    const hole = randomHole();
    hole.classList.add('active');

    moleTimeout = setTimeout(() => {
        hole.classList.remove('active');
        if (gameActive) showMole();
        tickSoundPlay();
    }, 1000);
}

holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('active')) {
            score++;
            scoreDisplay.textContent = score;
            playSecSound();

            const mole = hole.querySelector('.mole');
            mole.src = "../img/redMole.png";

            const hammer = hole.querySelector('.hammer');
            hammer.classList.add('hit');
            setTimeout(() => hammer.classList.remove('hit'), 300);

            setTimeout(() => {
                mole.src = "../img/mole.png";
                hole.classList.remove('active');
            }, 800);
        }
    });
});

function endGame() {
    gameEndSound();
    gameActive = false;
    clearInterval(countdown);
    clearTimeout(moleTimeout);
    playButton.disabled = false;
    holes.forEach(hole => {
        hole.classList.remove('active');
    });
    rBlinking();
    link();
}

function home() {
    const overlay = document.getElementById('fadeOverlay');

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = "../Windex.html";
    }, 1050);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        home();
    }
});