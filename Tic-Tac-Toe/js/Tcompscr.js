const GameCubes = document.querySelectorAll('.gameCubes');
const logBook = document.getElementById("LogBook");
const ScoreText = document.getElementById("ScoreBoardID");
const ResultText = document.getElementById("ResultText");
const Nextbtn = document.getElementById("Nextbtn");
const ResetBtn = document.getElementById("Resetbtn");
const ClickSound = document.getElementById("clickSound");
const ResultSound = document.getElementById("resultSound");
const X = document.getElementById("X");
const O = document.getElementById("O");

let playerScore = 0;
let computerScore = 0;
let gameOver = false;
let playerTurn = true;

Nextbtn.classList.add('opa');
unlink();

function resultSound() {
    ResultSound.currentTime = 0;
    ResultSound.play();
}

function link() {
    Nextbtn.classList.remove('no-link');
    Nextbtn.classList.add('link');
}

function unlink() {
    Nextbtn.classList.remove('link');
    Nextbtn.classList.add('no-link');
}

Nextbtn.addEventListener('click', () => {
    Nextbtn.classList.add('opa');
    unlink();
});

GameCubes.forEach((cube) => {
    cube.addEventListener('click', () => {
        if (!gameOver && playerTurn && cube.innerHTML === '') {
            ClickSound.currentTime = 0;
            ClickSound.play();

            cube.innerHTML = 'X';
            cube.style.color = "crimson";
            playerTurn = false;

            if (checkWin('X')) return endGame('Player');
            if (isDraw()) return endGame('Draw');

            setTimeout(() => {
                placeRandomO();
                if (checkWin('O')) return endGame('Computer');
                if (isDraw()) return endGame('Draw');
                playerTurn = true;
            }, 500);
        }
    });
});

function placeRandomO() {
    const availableCubes = Array.from(GameCubes).filter(cube => cube.innerHTML === '');
    if (availableCubes.length === 0) return;
    const randomCube = availableCubes[Math.floor(Math.random() * availableCubes.length)];
    randomCube.innerHTML = 'O';
    randomCube.style.color = "dodgerblue";
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

function endGame(winner) {
    gameOver = true;
    playerTurn = false;

    if (winner === 'Player') {
        playerScore++;
        ResultText.textContent = "Player won!";
        const winPattern = checkWin('X');
        if (winPattern) WinningCubes(winPattern);
    } else if (winner === 'Computer') {
        computerScore++;
        ResultText.textContent = "Computer won!";
        const winPattern = checkWin('O');
        if (winPattern) WinningCubes(winPattern);
    } else {
        ResultText.textContent = "Draw!";
    }

    updateScoreboard();
    logResult(winner);
    link();
    resultSound();
    Nextbtn.classList.remove('opa');
}

function WinningCubes(pattern) {
    pattern.forEach(i => {
        GameCubes[i].style.backgroundColor = "rgba(56, 56, 56, 1)";
        GameCubes[i].style.color = "rgb(60, 220, 20)";
        GameCubes[i].classList.add('blinkAnim');
    });
}


function isDraw() {
    return Array.from(GameCubes).every(cube => cube.innerHTML !== '');
}

function updateScoreboard() {
    ScoreText.innerHTML = `<span id="X">X:${playerScore}</span> <span id="dash">-</span> <span id="O">O:${computerScore}</span>`;
}

function logResult(winner) {
    const li = document.createElement('li');
    if (winner === 'Draw') {
        li.textContent = '- Draw!';
    }
    else if (winner === 'Player') {
        li.textContent = `- Player won!`;
    } else if (winner === 'Computer') {
        li.textContent = `- Computer won!`;
    }
    if (li.textContent.includes('Player')) {
        li.style.color = "crimson";
    } else if (li.textContent.includes('Computer')) {
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
    playerTurn = true;
    GameCubes.forEach(cube => {
        cube.style.backgroundColor = "";
        cube.innerHTML = ''
        cube.classList.remove('blinkAnim');
    });
}

Nextbtn.addEventListener('click', () => {
    resetBoard();
});

ResetBtn.addEventListener('click', () => {
    resetBoard();
    clearLog();
    playerScore = 0;
    computerScore = 0;
    updateScoreboard();
    ResultText.textContent = 'Play!';
    Nextbtn.classList.remove('opa');
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