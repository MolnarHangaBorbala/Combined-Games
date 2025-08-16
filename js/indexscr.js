const Rbtn = document.getElementById("Rbtn");
const Tbtn = document.getElementById("Tbtn");
const overlay = document.getElementById('fadeOverlay');

Rbtn.addEventListener("click", () => {
    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = "Rock-Paper-Scissors/Rindex.html";
    }, 1050);
});

Tbtn.addEventListener("click", () => {
    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = "Tic-Tac-Toe/Tindex.html";
    }, 1050);
});