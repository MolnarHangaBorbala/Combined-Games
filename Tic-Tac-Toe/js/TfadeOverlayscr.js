window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('fadeOverlay');

    setTimeout(() => {
        overlay.classList.remove('fade-out');
        overlay.classList.add('fade-in');
    }, 50);
});

/* Full Screen--------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const outerGameContID = document.getElementById("outerGameContID");

    function isMaybeF11Fullscreen() {
        return window.innerHeight === screen.height || window.outerHeight === screen.height;
    }

    if (outerGameContID) {
        if (isMaybeF11Fullscreen()) {
            console.log("Page loaded in likely F11 fullscreen.");
            outerGameContID.style.marginTop = "100px";
        } else {
            outerGameContID.style.marginTop = "50px";
        }
    }

    window.addEventListener("resize", () => {
        if (outerGameContID) {
            if (isMaybeF11Fullscreen()) {
                console.log("User likely pressed F11 for fullscreen.");
                outerGameContID.style.marginTop = "100px";
            } else {
                console.log("Not in F11 fullscreen.");
                outerGameContID.style.marginTop = "50px";
            }
        }
    });
});