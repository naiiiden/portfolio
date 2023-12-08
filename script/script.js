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
  item.addEventListener("mousemove", moveImage);
});

function moveImage(event) {
  const boundingRect = event.currentTarget.getBoundingClientRect();
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const imageCenterX = boundingRect.left + boundingRect.width / 2;
  const imageCenterY = boundingRect.top + boundingRect.height / 2;

  const moveX = mouseX - imageCenterX;
  const moveY = mouseY - imageCenterY;

  const transformValue = `translate(${moveX}px, ${moveY}px)`;

  event.currentTarget.querySelector("img").style.transform = transformValue;
}