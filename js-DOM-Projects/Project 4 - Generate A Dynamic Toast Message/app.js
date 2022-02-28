/*
  Project Requirements:
    - Change background color by clicking on a button
    - also display the color code
*/

// step 1: on loader handler
window.onload = () => {
  main();
};
// step 2: random color generator function
function generateHexColor() {
  function generateSingleCode() {
    return Math.floor(Math.random() * 257).toString(16);
  }
  const red = `${generateSingleCode()}`;
  const green = `${generateSingleCode()}`;
  const blue = `${generateSingleCode()}`;

  return `#${red}${green}${blue}`;
}

// step 3: collect on necessary references
const rootElement = document.getElementById("root");
const changeButton = document.getElementById("change-button");
const displayColor = document.getElementById("display-colorCode");
const copyButton = document.getElementById("copy-color");
let backgroundColor = generateHexColor();
let toastMsgElement = null;
function main() {
  // step 4: handle click event
  changeButton.addEventListener("click", () => {
    backgroundColor = generateHexColor();
    rootElement.style.backgroundColor = backgroundColor;
    displayColor.value = backgroundColor;
  });
  // step 5: handle Copy Button;
  copyButton.addEventListener("click", () => {
    const colorCode = displayColor.value;
    displayColor.select();
    navigator.clipboard.writeText(colorCode);
    generateToastMessage(`${displayColor.value} copied to clipboard!`);
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
