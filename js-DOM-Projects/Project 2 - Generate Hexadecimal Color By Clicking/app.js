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
    return Math.floor(Math.random() * 17).toString(16);
  }
  const red = `${generateSingleCode()}${generateSingleCode()}`;
  const green = `${generateSingleCode()}${generateSingleCode()}`;
  const blue = `${generateSingleCode()}${generateSingleCode()}`;

  return `#${red}${green}${blue}`;
}
function main() {
  // step 3: collect on necessary references
  const rootElement = document.getElementById("root");
  const changeButton = document.getElementById("change-button");
  const displayColor = document.getElementById("display-colorCode");
  // step 4: handle click event
  changeButton.addEventListener("click", () => {
    const backgroundColor = generateHexColor();
    rootElement.style.backgroundColor = backgroundColor;
    displayColor.setAttribute("value", backgroundColor);
  });
}
