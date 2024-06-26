const inputRange = document.getElementById("password-range");
const activeColor = "#a4ffaf";
const inactiveColor = "#18171f";

inputRange.addEventListener("input", function () {
  const ratio = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
  document.querySelector(".char-length-number").textContent = this.value;
});

//  Styling the arrow button on generate button hover

const generateButton = document.querySelector(".generate-btn");

function changeIcon() {
  document.querySelector(
    ".right-arrow"
  ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="#94f0a6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.6" d="M5 12h14m-7-7l7 7l-7 7"/></svg>`;
}
function changeIconAgain() {
  document.querySelector(
    ".right-arrow"
  ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.6" d="M5 12h14m-7-7l7 7l-7 7"/></svg>`;
}
