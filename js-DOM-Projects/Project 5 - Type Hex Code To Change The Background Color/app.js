/*
  Project Requirements:
    - Change background color by clicking on a button
    - also display the color code
    - can copy the color code by clicking a button
    - show a toast message when color code is copied
    - can input custom color code and change the background according to the color code
*/

// step 1: on loader handler
window.onload = () => {
  main();
};

// step 2: random color generator function
function generateHexColor() {
  function generateSingleCode() {
    let singleColor = "";
    singleColor = Math.floor(Math.random() * 257).toString(16);
    while (singleColor.length != 2) {
      singleColor = Math.floor(Math.random() * 257).toString(16);
    }

    return singleColor;
  }
  const red = `${generateSingleCode()}`;
  const green = `${generateSingleCode()}`;
  const blue = `${generateSingleCode()}`;
  return `#${red}${green}${blue}`;
}

// step 3: collect on necessary references
let backgroundColor = null;
let toastMsgElement = null;
const rootElement = document.getElementById("root");
const changeButton = document.getElementById("change-button");
const colorCodeElement = document.getElementById("display-colorCode");
const copyButton = document.getElementById("copy-color");
function main() {
  // step 4: handle click event
  changeButton.addEventListener("click", () => {
    backgroundColor = generateHexColor();
    rootElement.style.backgroundColor = backgroundColor;
    colorCodeElement.value = backgroundColor;
  });

  // step 5: handle Copy Button;
  copyButton.addEventListener("click", () => {
    const colorCode = colorCodeElement.value;
    if (isValidHex(colorCode)) {
      colorCodeElement.select();
      navigator.clipboard.writeText(colorCode);
      generateToastMessage(`${colorCodeElement.value} copied to clipboard!`);
    } else {
      alert("invalid color code!!");
    }
  });
}

// step 6: create toast message
function generateToastMessage(msg) {
  if (toastMsgElement !== null) {
    removeToastMessage(toastMsgElement);
  }
  toastMsgElement = document.createElement("div");
  toastMsgElement.classList.add("toast-message");
  toastMsgElement.innerText = msg;
  activateToastMessage(toastMsgElement);
  setTimeout(() => {
    toastMsgElement.remove();
  }, 3000);
}

// step 7: activate toast message
function activateToastMessage(toastMsgElement) {
  toastMsgElement.classList.add("toast-message-slide-in");
  rootElement.appendChild(toastMsgElement);
  toastMsgElement.addEventListener("click", () =>
    removeToastMessage(toastMsgElement)
  );
  // auto remove toast message after 2 second
  setTimeout(() => {
    removeToastMessage(toastMsgElement);
  }, 2000);
}

// step 8: remove toast message
function removeToastMessage(toastMsgElement) {
  toastMsgElement.classList.remove("toast-message-slide-in");
  toastMsgElement.classList.add("toast-message-slide-out");
  toastMsgElement.addEventListener("animationend", () => {
    toastMsgElement.remove();
    toastMsgElement = null;
  });
}
// step 9: create isHexValid function
/**
 
 * @param {string} code 
 */
function isValidHex(code) {
  if (code.length !== 7) return false;
  if (code[0] !== "#") return false;
  code = code.substring(1);
  return /^[0-9A-Fa-f]{6}$/i.test(code);
}

// step 10: implement change handler on input field
colorCodeElement.addEventListener("keyup", function (e) {
  const color = e.target.value;
  if (color && isValidHex(color)) {
    rootElement.style.backgroundColor = color;
  }
});
// step 11 - prevent copying hex code if it is not valid
