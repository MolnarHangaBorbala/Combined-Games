window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('fadeOverlay');

    setTimeout(() => {
        overlay.classList.remove('fade-out');
        overlay.classList.add('fade-in');
    }, 50);
});


function home() {
    const overlay = document.getElementById('fadeOverlay');

    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1050);
}

/* Full Screen--------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const outerContainerID = document.getElementById("outerContainerID");

    function isMaybeF11Fullscreen() {
        return window.innerHeight === screen.height || window.outerHeight === screen.height;
    }

    if (outerContainerID) {
        if (isMaybeF11Fullscreen()) {
            console.log("Page loaded in likely F11 fullscreen.");
            outerContainerID.style.marginTop = "100px";
        } else {
            outerContainerID.style.marginTop = "50px";
        }
    }

    window.addEventListener("resize", () => {
        if (outerContainerID) {
            if (isMaybeF11Fullscreen()) {
                console.log("User likely pressed F11 for fullscreen.");
                outerContainerID.style.marginTop = "100px";
            } else {
                console.log("Not in F11 fullscreen.");
                outerContainerID.style.marginTop = "50px";
            }
        }
    });
});