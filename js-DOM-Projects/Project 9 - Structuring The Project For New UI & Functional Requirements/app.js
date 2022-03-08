/**
 * Author: Tanzil Islam
 * Date: 08-03-2022
 * Description: Color Picker Application
 */

// Globals
let toastMsgDiv = null;

// onload handler
window.onload = () => {
  main();
};

// main or boot function, this function will take care of getting all the DOM references
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

// event handlers

// DOM functions
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
// util functions

/**
 * Generate and return an object of three color decimal values
 * @returns {object}
 */
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

/**
 * take a color object of three values and return hexadecimal color code
 * @param {object} color
 * @returns {string}
 */
function generateHexColor({ red, green, blue }) {
  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

/**
 * take a color object of three values and return rbg color code
 * @param {object} color
 * @returns {string}
 */
function generateRGBColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}
/**
 * convert Hex to RBG color
 * @param {string} hex
 * @returns {string}
 */
function hexToRgb(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * validate hex color code
 * @param {string} color;
 * @returns {boolean}
 */
function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

