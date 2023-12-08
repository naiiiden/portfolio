if (window.location.hash === "") {
  window.location.hash = "#about";
}

const verticalText = document.querySelector(".vertical-text span");

verticalText.addEventListener("click", () => {
  verticalText.classList.toggle("cyrilic");
});

document.addEventListener("mousemove", (e) => {
    document.querySelector("#cursor").style.cssText = `left: ${e.clientX - 10}px; top: ${e.clientY - 10}px;`;
});

const listItems = document.querySelectorAll("#work-list li");

listItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    e.currentTarget.querySelector("img").style.cssText = `left: ${e.clientX - 225}px; top: ${e.clientY - 250}px;`;
  });
});