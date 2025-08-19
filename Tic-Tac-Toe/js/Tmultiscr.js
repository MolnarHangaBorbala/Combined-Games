const GameCubes = document.querySelectorAll('.gameCubes');
const logBook = document.getElementById("LogBook");
const ScoreText = document.getElementById("ScoreBoardID");
const ResultText = document.getElementById("ResultText");
const Nextbtn = document.getElementById("Nextbtn");
const ResetBtn = document.getElementById("Resetbtn");
const TurnSignal = document.getElementById("TurnSignal");
const ClickSound = document.getElementById("clickSound");
const ResultSound = document.getElementById("resultSound");

let player1Score = 0;
let player2Score = 0;
let gameOver = false;
let player1Turn = true;

TurnSignal.innerHTML = `P1 <span id="TurnID">turn</span>`;
TurnSignal.style.color = "crimson";

Nextbtn.classList.add('opa');

function resultSound() {
    ResultSound.currentTime = 0;
    ResultSound.play();
}

Nextbtn.addEventListener('click', () => {
    Nextbtn.disabled = true;
    Nextbtn.classList.add('opa');
});

GameCubes.forEach((cube) => {
    cube.addEventListener('click', () => {
        if (!gameOver && cube.innerHTML === '') {
            ClickSound.currentTime = 0;
            ClickSound.play();

            cube.innerHTML = player1Turn ? 'X' : 'O';
            cube.style.color = player1Turn ? "crimson" : "dodgerblue";

            const winPattern = checkWin(player1Turn ? 'X' : 'O');
            if (winPattern) return endGame(player1Turn ? 'Player1' : 'Player2', winPattern);
            if (isDraw()) return endGame('Draw');

            player1Turn = !player1Turn;
            updateTurnSignal();
        }
    });
});


function updateTurnSignal() {
    if (player1Turn) {
        TurnSignal.innerHTML = `P1 <span id="TurnID">turn</span>`;
        TurnSignal.style.color = "crimson";
    } else {
        TurnSignal.innerHTML = `P2 <span id="TurnID">turn</span>`;
        TurnSignal.style.color = "dodgerblue";
    }
}

function checkWin(symbol) {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of wins) {
        if (pattern.every(i => GameCubes[i].innerHTML === symbol)) {
            return pattern;
        }
    }
    return null;
}

function isDraw() {
    return Array.from(GameCubes).every(cube => cube.innerHTML !== '');
}

function endGame(winner, winPattern) {
    gameOver = true;

    if (winner === 'Player1') {
        player1Score++;
        ResultText.textContent = "Player1 won!";
        WinningCubes(winPattern);
    } else if (winner === 'Player2') {
        player2Score++;
        ResultText.textContent = "Player2 won!";
        WinningCubes(winPattern);
    } else {
        ResultText.textContent = "Draw!";
    }

    updateScoreboard();
    logResult(winner);
    resultSound();
    Nextbtn.disabled = false;
    Nextbtn.classList.remove('opa');
}

function WinningCubes(pattern) {
    pattern.forEach(i => {
        GameCubes[i].style.backgroundColor = "rgba(65, 65, 65, 1)";
        GameCubes[i].style.color = "rgb(60, 220, 20)";
        GameCubes[i].classList.add('blinkAnim');
    });
}

function updateScoreboard() {
    ScoreText.innerHTML = `<span id="X">X:${player1Score}</span> <span id="dash">-</span> <span id="O">O:${player2Score}</span>`;
}

function logResult(winner) {
    const li = document.createElement('li');
    if (winner === 'Draw') {
        li.textContent = '- Draw!';
    } else {
        li.textContent = `- ${winner} won!`;
    }
    if (li.textContent.includes('Player1')) {
        li.style.color = "crimson";
    } else if (li.textContent.includes('Player2')) {
        li.style.color = "dodgerblue";
    }
    logBook.prepend(li);
}

function clearLog() {
    logBook.innerHTML = '';
}

function resetBoard() {
    ResultText.textContent = 'Play!';
    gameOver = false;
    player1Turn = true;
    GameCubes.forEach(cube => {
        cube.style.backgroundColor = "";
        cube.innerHTML = ''
        cube.classList.remove('blinkAnim');
    });
}

Nextbtn.addEventListener('click', () => {
    resetBoard();
    updateTurnSignal();
});

ResetBtn.addEventListener('click', () => {
    resetBoard();
    clearLog();
    player1Score = 0;
    player2Score = 0;
    updateScoreboard();
    ResultText.textContent = 'Play!';
    Nextbtn.disabled = true;
    Nextbtn.classList.remove('opa');
    updateTurnSignal();
});

function home() {
    const overlay = document.getElementById('fadeOverlay');

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = "../Tindex.html";
    }, 1050);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        home();
    }
});