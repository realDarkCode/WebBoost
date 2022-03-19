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
  const generateRandomColorBtn = document.getElementById(
    "generate-random-color"
  );
  const colorModeHexInp = document.getElementById("input-hex");

  generateRandomColorBtn.addEventListener(
    "click",
    handleGenerateRandomColorBtn
  );

  colorModeHexInp.addEventListener("keyup", function (e) {
    const color = e.target.value;
    if (color) {
      hexColorDisplay.value = color.toUpperCase();
      if (isValidHex(color)) {
        root.style.backgroundColor = `#${color}`;
        rbgColorDisplay.value = hexToRgb(color);
      }
    }
  });
  // hexCopyBtn.addEventListener("click", function () {
  //   navigator.clipboard.writeText(`#${hexColorDisplay.value}`);
  //   if (toastMsgDiv !== null) {
  //     removeToastMessage();
  //   }
  //   if (isValidHex(hexColorDisplay.value)) {
  //     generateToastMessage(`#${hexColorDisplay.value} copied`);
  //   } else {
  //     alert("Invalid Color Code");
  //   }
  // });
  // rbgCopyBtn.addEventListener("click", function () {
  //   navigator.clipboard.writeText(`${rbgColorDisplay.value}`);
  //   if (toastMsgDiv !== null) {
  //     removeToastMessage();
  //   }
  //   generateToastMessage(`${rbgColorDisplay.value} copied`);
  // });
}

// event handlers
function handleGenerateRandomColorBtn() {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
}
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
/**
 *  Update dom elements with calculated color values
 * @param {object} color
 */

function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  document.getElementById("color-display").style.backgroundColor = hexColor;
  document.getElementById("input-hex").value = hexColor.slice(1);
  document.getElementById("input-rgb").value = rgbColor;
  document.getElementById("color-slider-red").value = color.red;
  document.getElementById("color-slider-red-label").innerText = color.red;
  document.getElementById("color-slider-green").value = color.green;
  document.getElementById("color-slider-green-label").innerText = color.green;
  document.getElementById("color-slider-blue").value = color.blue;
  document.getElementById("color-slider-blue-label").innerText = color.blue;
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
 * convert Hex to decimal color object
 * @param {string} hex
 * @returns {object}
 */
function hexToDecimalColor(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return {
    red,
    green,
    blue,
  };
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
