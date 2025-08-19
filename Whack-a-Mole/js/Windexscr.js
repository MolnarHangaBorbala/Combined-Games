const EasyBtn = document.getElementById("EasyBtn");
const NormalBtn = document.getElementById("NormalBtn");
const HardBtn = document.getElementById("HardBtn");
const playButton = document.getElementById("Playbtn");
const LoadingText = document.getElementById("loading");
const overlay = document.getElementById('fadeOverlay');
LoadingText.style.opacity = "0";

EasyBtn.disabled = false;
NormalBtn.disabled = false;
HardBtn.disabled = false;

playButton.classList.add("no-link");
playButton.classList.remove("link");
playButton.classList.remove("Playbtn");

let btn = 0;

EasyBtn.addEventListener("click", () => {
    playButton.disabled = false;
    EasyBtn.classList.add("active");
    NormalBtn.classList.remove("active");
    HardBtn.classList.remove("active");
    playButton.classList.add("link");
    playButton.classList.remove("no-link");
    playButton.classList.add("Playbtn");
    btn = 1;
});

NormalBtn.addEventListener("click", () => {
    playButton.disabled = false;
    NormalBtn.classList.add("active");
    EasyBtn.classList.remove("active");
    HardBtn.classList.remove("active");
    playButton.classList.add("link");
    playButton.classList.remove("no-link");
    playButton.classList.add("Playbtn");
    btn = 2;
});

HardBtn.addEventListener("click", () => {
    playButton.disabled = false;
    HardBtn.classList.add("active");
    NormalBtn.classList.remove("active");
    EasyBtn.classList.remove("active");
    playButton.classList.add("link");
    playButton.classList.remove("no-link");
    playButton.classList.add("Playbtn");
    btn = 3;
});

playButton.addEventListener("click", () => {
    LoadingText.style.opacity = "1";
    EasyBtn.disabled = true;
    NormalBtn.disabled = true;
    HardBtn.disabled = true;

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
    setTimeout(() => {
        if (btn === 1) {
            window.location.href = "html/Easy.html";
        } else if (btn === 2) {
            window.location.href = "html/Normal.html";
        } else if (btn === 3) {
            window.location.href = "html/Hard.html";
        }
    }, 1050);
});

function home() {
    const overlay = document.getElementById('fadeOverlay');

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1050);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        home();
    }
});