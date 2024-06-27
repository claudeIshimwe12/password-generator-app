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

// Adding an event listenner to the generate button

generateButton.addEventListener("click", function () {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  // Password Length
  const passwordLength = document.querySelector(".password-range").value;

  const upperCaseCheckBox = document.getElementById("uppercase");
  const hasUpperCase = upperCaseCheckBox.checked;

  const lowerCaseCheckBox = document.getElementById("lowercase");
  const hasLowerCase = lowerCaseCheckBox.checked;
  const numbersCheckBox = document.getElementById("numbers");
  const hasNumbers = numbersCheckBox.checked;
  const symbolsCheckBox = document.getElementById("symbols");
  const hasSymbols = symbolsCheckBox.checked;

  let allCharacters = "";
  if (hasUpperCase) {
    allCharacters += uppercase;
  }
  if (hasLowerCase) {
    allCharacters += lowercase;
  }
  if (hasNumbers) {
    allCharacters += numbers;
  }
  if (hasSymbols) {
    allCharacters += symbols;
  }

  if (allCharacters.length === 0) {
    alert(
      "You have to select at least one characters to be included in your password"
    );
    return;
  }
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }
  const psw = document.querySelector(".password");
  psw.textContent = password;
  psw.style.color = "var(--almost-white)";

  // Check the strength of the password and update the DOM
  let strength = checkPasswordStrength(
    password,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSymbols,
    8
  );

  const strengIndicator = document.querySelector(".strength");
  const classes = ["too-weak", "weak", "medium", "strong"];
  for (let i = 0; i < 4; i++) {
    if (strengIndicator.classList.contains(classes[i])) {
      strengIndicator.classList.remove(classes[i]);
    }
  }
  document.querySelector(".med").textContent =
    strength === "too-weak" ? "TOO WEAK" : strength.toUpperCase();
  strengIndicator.classList.add(strength);
  document.querySelector(".copy-btn").addEventListener("click", function () {
    copyContent(password);
    setTimeout(() => {
      document.querySelector(".hide-btn").classList.add("hidden");
    }, 2000);
  });
});
function checkPasswordStrength(
  password,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
  length
) {
  let strength = 0;
  if (password.length >= length) {
    strength++;
  }
  if (includeUppercase && /[A-Z]/.test(password)) {
    strength++;
  }
  if (includeLowercase && /[a-z]/.test(password)) {
    strength++;
  }
  if (includeNumbers && /[0-9]/.test(password)) {
    strength++;
  }
  if (includeSymbols && /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(password)) {
    strength++;
  }
  switch (strength) {
    case 0:
    case 1:
      return "too-weak";
    case 2:
      return "weak";
    case 3:
      return "medium";
    case 4:
    case 5:
      return "strong";
    default:
      return "Unknown";
  }
}

// Copy to clipboard
async function copyContent(text) {
  try {
    await navigator.clipboard.writeText(text);
    document.querySelector(".copy-btn-wrapper h1").classList.remove("hidden");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
