// 1) Theme toggle
const toggleSwitch = document.getElementById("toggleSwitch");
toggleSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
});

// 2) Calculator functionality
const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("#keypad button");

let expression = "";

// Update the screen
function updateScreen(value) {
  screen.textContent = value;
}

// Convert last operand to percentage
function applyPercentage() {
  const regex = /(\d+\.?\d*)$/;
  const match = expression.match(regex);
  if (match) {
    const number = parseFloat(match[1]);
    const percentValue = number / 100;
    expression = expression.slice(0, match.index) + percentValue;
  }
}

// Evaluate expression
function evaluateExpression() {
  const sanitized = expression.replace(/÷/g, "/").replace(/×/g, "*");
  try {
    const result = eval(sanitized);
    expression = result.toString();
    updateScreen(expression);
  } catch (err) {
    updateScreen("Error");
    expression = "";
  }
}

// Handle clicks
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.value;
    switch (val) {
      case "AC":
        expression = "";
        updateScreen("0");
        break;
      case "DEL":
        expression = expression.slice(0, -1);
        updateScreen(expression || "0");
        break;
      case "%":
        applyPercentage();
        updateScreen(expression);
        break;
      case "=":
        evaluateExpression();
        break;
      case "":
        // Blank button: do nothing
        break;
      default:
        expression += val;
        updateScreen(expression);
        break;
    }
  });
});
