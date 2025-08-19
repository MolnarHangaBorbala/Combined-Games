const clickSound = document.getElementById("clickSound");
const menuBgMusic = document.getElementById("BgMusic");
const targets = document.querySelectorAll('.sound-class');
const speakerIcon = document.getElementById("speakerIcon");

menuBgMusic.volume = 0.15;
menuBgMusic.loop = true;

targets.forEach(item => {
    item.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});

function speakerIndex() {
    if (menuBgMusic.paused) {
        menuBgMusic.play();
        speakerIcon.src = "../SHARED/SHARED-IMG/icons/speakerBtn.png";
    } else {
        menuBgMusic.pause();
        speakerIcon.src = "../SHARED/SHARED-IMG/icons/muteBtn.png";
    }
}

function speaker() {
    if (menuBgMusic.paused) {
        menuBgMusic.play();
        speakerIcon.src = "../../SHARED/SHARED-IMG/icons/speakerBtn.png";
    } else {
        menuBgMusic.pause();
        speakerIcon.src = "../../SHARED/SHARED-IMG/icons/muteBtn.png";
    }
}