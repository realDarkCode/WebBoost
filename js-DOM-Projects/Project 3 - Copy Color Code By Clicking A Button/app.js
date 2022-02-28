// step 1: on loader handler
window.onload = () => {
  main();
};
let backgroundColor = null;
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
function main() {
  // step 3: collect on necessary references
  const rootElement = document.getElementById("root");
  const changeButton = document.getElementById("change-button");
  const displayColor = document.getElementById("display-colorCode");
  const copyButton = document.getElementById("copy-color");
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
    displayColor.value = "Color Code has been copied to clipboard";
    setTimeout(() => {
      displayColor.value = backgroundColor;
    }, 2000);
  });
}
