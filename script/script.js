if (window.location.hash === "") {
  window.location.hash = "#about";
}

const verticalText = document.querySelector(".vertical-text span");

verticalText.addEventListener("click", () => {
  verticalText.classList.toggle("cyrilic");
});

document.addEventListener("mousemove", (e) => {
  document.querySelector("#cursor").style.left = e.clientX - 10 + "px";
  document.querySelector("#cursor").style.top = e.clientY - 10 + "px";
});
