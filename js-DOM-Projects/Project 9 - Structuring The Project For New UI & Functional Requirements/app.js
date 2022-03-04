/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to copy the color code
 * - Add a toast message when copied
 * - User can type their own hex code too
 * - show rgb color too, but do not need to edit it
 * - user can also copy the rgb color code
 */

// Steps

// Globals
let toastMsgDiv = null;

window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById("root");
  const hexColorDisplay = document.getElementById("output");
  const rbgColorDisplay = document.getElementById("output2");
  const changeBtn = document.getElementById("change-btn");
  const hexCopyBtn = document.getElementById("copy-btn");
  const rbgCopyBtn = document.getElementById("copy-btn2");

  changeBtn.addEventListener("click", function () {
    const color = generateColorDecimal();
    const hex = generateHexColor(color);
    const rgb = generateRGBColor(color);
    root.style.backgroundColor = hex;
    hexColorDisplay.value = hex.substring(1);
    rbgColorDisplay.value = rgb;
  });

  hexCopyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(`#${hexColorDisplay.value}`);
    if (toastMsgDiv !== null) {
      removeToastMessage();
    }
    if (isValidHex(hexColorDisplay.value)) {
      generateToastMessage(`#${hexColorDisplay.value} copied`);
    } else {
      alert("Invalid Color Code");
    }
  });
  rbgCopyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(`${rbgColorDisplay.value}`);
    if (toastMsgDiv !== null) {
      removeToastMessage();
    }
    generateToastMessage(`${rbgColorDisplay.value} copied`);
  });
  hexColorDisplay.addEventListener("keyup", function (e) {
    const color = e.target.value;
    if (color) {
      hexColorDisplay.value = color.toUpperCase();
      if (isValidHex(color)) {
        root.style.backgroundColor = `#${color}`;
        rbgColorDisplay.value = hexToRgb(color);
      }
    }
  });
}

// function 1 - generate three random decimal number for red, green and blue
// return as an object
function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
}

// function 2 - generate hex color code
function generateHexColor({ red, green, blue }) {
  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

// function 3 - generate rgba color code
function generateRGBColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}
/**
 * convert Hex to RBG color
 * @param {string} hex
 */
function hexToRgb(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return `rgb(${red}, ${green}, ${blue})`;
}
function removeToastMessage() {
  toastMsgDiv.classList.remove("toast-message-slide-in");
  toastMsgDiv.classList.add("toast-message-slide-out");

  toastMsgDiv.addEventListener("animationend", function () {
    toastMsgDiv.remove();
    toastMsgDiv = null;
  });
}
function generateToastMessage(msg) {
  toastMsgDiv = document.createElement("div");
  toastMsgDiv.innerText = msg;
  toastMsgDiv.className = "toast-message toast-message-slide-in";

  toastMsgDiv.addEventListener("click", removeToastMessage);
  document.body.appendChild(toastMsgDiv);
  setTimeout(() => {
    removeToastMessage();
  }, 2000);
}

/**
 * @param {string} color : ;
 */
function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

// Step 1 - create onload handler

// step 2 - random color generator function

// step 3 - collect all necessary references

// step 4 - handle the change button click event

// step 5 - handle the copy button click event

// Step 6 - activate toast message

// Step 7 - create a dynamic toast message

// step 8 - clear toast message

// step 9 - create isHexValid function

// step 10 - implement change handler on input field

// step 11 - prevent copying hex code if it is not valid

// step 12 - refactor the color generator function

// step 13 - update color code to display rbg colors

// step 14 - create hex to rgb function

// step 15 - update change handler

// step 16 - implement copy function
