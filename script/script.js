if (window.location.hash === "") {
    window.location.hash = "#about";
}

const verticalText = document.querySelector('.vertical-text span');

verticalText.addEventListener("click", () => {
    verticalText.classList.toggle('cyrilic');
});
