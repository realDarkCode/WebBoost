/**
 * Author: Tanzil Islam
 * Date: 08-03-2022
 * Description: Color Picker Application
 */

// Globals
let toastMessageContainer = null;
const defaultColor = {
  red: 221,
  green: 222,
  blue: 238,
};
// onload handler
window.onload = () => {
  main();
  updateColorCodeToDom(defaultColor);
};

// main or boot function, this function will take care of getting all the DOM references
function main() {
  // Dom References
  const generateRandomColorBtn = document.getElementById(
    "generate-random-color"
  );
  const colorModeHexInp = document.getElementById("input-hex");
  const colorSliderRed = document.getElementById("color-slider-red");
  const colorSliderGreen = document.getElementById("color-slider-green");
  const colorSliderBlue = document.getElementById("color-slider-blue");
  const copyToClipboardButton = document.getElementById("copy-to-clipboard");
  // event listeners
  generateRandomColorBtn.addEventListener(
    "click",
    handleGenerateRandomColorBtn
  );
  colorSliderRed.addEventListener(
    "change",
    handleColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderGreen.addEventListener(
    "change",
    handleColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderBlue.addEventListener(
    "change",
    handleColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  copyToClipboardButton.addEventListener("click", handleCopyToClipboard);
  // changing color via hex color input field
  colorModeHexInp.addEventListener("keyup", handleColorModeHexInput);
}

// event handlers
function handleGenerateRandomColorBtn() {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
}
function handleColorModeHexInput(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    if (isValidHex(hexColor)) {
      const color = hexToDecimalColor(hexColor);
      updateColorCodeToDom(color);
    }
  }
}
function handleColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };
    updateColorCodeToDom(color);
  };
}
function handleCopyToClipboard() {
  const colorModeRadios = document.getElementsByName("color-mode");

  const mode = getCheckedValueFromRadios(colorModeRadios);
  if (toastMessageContainer !== null) {
    removeToastMessage();
  }
  if (mode == null) {
    throw new Error("Invalid color mode radio input");
  } else if (mode == "hex") {
    const hexValue = document.getElementById("input-hex").value;
    if (hexValue && isValidHex(hexValue)) {
      navigator.clipboard.writeText(`#${hexValue}`);
      generateToastMessage(`#${hexValue} Copied`);
    } else {
      alert("Invalid Hex Code!, Unable to copy");
    }
  } else if (mode == "rgb") {
    const rgbValue = document.getElementById("input-rgb").value;
    if (rgbValue) {
      navigator.clipboard.writeText(`${rgbValue}`);
      generateToastMessage(`${rgbValue} Copied`);
    } else {
      alert("Invalid Hex Code!, Unable to copy");
    }
  }
}
// DOM functions
/**
 * Remove already generated toast message
 */
function removeToastMessage() {
  toastMessageContainer.classList.remove("toast-message-slide-in");
  toastMessageContainer.classList.add("toast-message-slide-out");

  toastMessageContainer.addEventListener("animationend", function () {
    toastMessageContainer.remove();
    toastMessageContainer = null;
  });
}
/**
 * Generate and display a Toast Message
 * @param {string} msg
 */
function generateToastMessage(msg) {
  toastMessageContainer = document.createElement("div");
  toastMessageContainer.innerText = msg;
  toastMessageContainer.className = "toast-message toast-message-slide-in";

  toastMessageContainer.addEventListener("click", removeToastMessage);
  document.body.appendChild(toastMessageContainer);
  setTimeout(() => {
    removeToastMessage();
  }, 2000);
}
/**
 * find the check elements from a list of radio buttons
 * @param {Array} nodes
 * @returns {String | null}
 */
function getCheckedValueFromRadios(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
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
