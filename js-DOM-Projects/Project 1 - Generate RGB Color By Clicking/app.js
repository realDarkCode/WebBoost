window.onload = () => {
  main();
};
function main() {
  let rootElement = document.getElementById("root");
  let changeButton = document.getElementById("btn");
  let BGColor = generateRGBColor();
  changeButton.addEventListener("click", function () {
    BGColor = generateRGBColor();
    rootElement.style.backgroundColor = BGColor;
  });
}

function generateRGBColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}
