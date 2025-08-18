const clickSound = document.getElementById("clickSound");
const targets = document.querySelectorAll('.sound-class');

targets.forEach(item => {
    item.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});