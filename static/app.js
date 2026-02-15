const displayMain = document.getElementById("displayMain");
const displayPrev = document.getElementById("displayPrev");
const keysWrap = document.querySelector(".keys-wrap");
const historyEl = document.getElementById("history");
const historyDrawer = document.getElementById("historyDrawer");
const historyToggle = document.getElementById("historyToggle");
const historyClose = document.getElementById("historyClose");
const sciToggle = document.getElementById("sciToggle");
const themeToggle = document.getElementById("themeToggle");
const calc = document.querySelector(".calculator");
const statusEl = document.querySelector(".status");

let expression = "";
let lastResult = "";
let justEvaluated = false;
let history = [];
let memoryValue = null;

const math = window.math.create(window.math.all);
math.config({ number: "BigNumber", precision: 32 });

const isOperator = (value) => ["+", "-", "*", "/", "^"].includes(value);
const isFunctionToken = (value) => ["sin", "cos", "tan", "log", "ln", "sqrt"].includes(value);

const updateDisplay = () => {
  displayMain.textContent = expression || "0";
  displayPrev.textContent = lastResult;
  historyEl.replaceChildren(
    ...history.map((item) => {
      const line = document.createElement("div");
      line.className = "history-item";
      line.textContent = item;
      return line;
    })
  );
};

const toggleDrawer = (forceOpen) => {
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !calc.classList.contains("drawer-open");
  calc.classList.toggle("drawer-open", shouldOpen);
};

const sanitizeExpression = (value) => {
  return value.replace(/[^0-9+\-*/^().a-zA-Z\s]/g, "");
};

const toRadians = (value) => {
  return math.divide(math.multiply(value, math.bignumber(Math.PI)), math.bignumber(180));
};

const scope = {
  sin: (x) => math.sin(toRadians(x)),
  cos: (x) => math.cos(toRadians(x)),
  tan: (x) => math.tan(toRadians(x)),
  log: (x) => math.log(x, 10),
  ln: (x) => math.log(x),
  sqrt: (x) => math.sqrt(x),
  pi: math.bignumber(Math.PI),
  e: math.bignumber(Math.E),
};

const evaluateExpression = (value) => {
  const sanitized = sanitizeExpression(value);
  if (!sanitized) return null;
  if (/^[+*/^]/.test(sanitized)) return null;
  try {
    const result = math.evaluate(sanitized, scope);
    if (math.isBigNumber(result)) return result.toString();
    if (typeof result === "number") return math.bignumber(result).toString();
    return result?.toString() ?? null;
  } catch (error) {
    return null;
  }
};

const trimTrailingOperator = (value) => value.replace(/[-+*/^]+$/, "");

const pushHistory = (expr, result) => {
  history = [`${expr} = ${result}`, ...history].slice(0, 3);
};

const shouldImplicitMultiply = (value) => {
  if (!expression) return false;
  const lastChar = expression.slice(-1);
  if (/[0-9)]/.test(lastChar)) return true;
  if (/[a-zA-Z]$/.test(expression)) return true;
  return value === "(";
};

const appendFunction = (fnName) => {
  if (justEvaluated) {
    expression = "";
    lastResult = "";
    justEvaluated = false;
  }

  if (shouldImplicitMultiply("(")) {
    expression += "*";
  }

  expression += `${fnName}(`;
};

const appendValue = (value) => {
  if (justEvaluated && !isOperator(value)) {
    expression = "";
    lastResult = "";
    justEvaluated = false;
  }

  if (justEvaluated && isOperator(value)) {
    justEvaluated = false;
  }

  if (isOperator(value)) {
    if (!expression) {
      if (value === "-") {
        expression = "-";
      }
      return;
    }
    if (isOperator(expression.slice(-1))) {
      expression = expression.slice(0, -1) + value;
      return;
    }
  }

  if (value === "(" && shouldImplicitMultiply(value)) {
    expression += "*";
  }

  if (value === "pi" || value === "e") {
    if (shouldImplicitMultiply(value)) {
      expression += "*";
    }
  }

  if (value === ".") {
    const lastChunk = expression.split(/[-+*/^()]/).pop();
    if (lastChunk.includes(".")) return;
  }

  if (/^[0-9]$/.test(value)) {
    const lastChunk = expression.split(/[-+*/]/).pop();
    if (lastChunk === "0") {
      const prefix = expression.slice(0, -1);
      expression = prefix + value;
      return;
    }
  }

  expression += value;
};

const getCurrentValue = () => {
  if (!expression) return math.bignumber(0);
  const trimmed = trimTrailingOperator(expression);
  const result = evaluateExpression(trimmed);
  if (!result) return math.bignumber(0);
  return math.bignumber(result);
};

const handleAction = (action, payload) => {
  switch (action) {
    case "clear":
      expression = "";
      lastResult = "";
      break;
    case "back":
      expression = expression.slice(0, -1);
      justEvaluated = false;
      break;
    case "equals":
      if (!expression) return;
      {
        const trimmed = trimTrailingOperator(expression);
        if (!trimmed || trimmed === "-") return;
        const result = evaluateExpression(trimmed);
        if (!result) return;
        lastResult = `${trimmed} =`;
        expression = result;
        justEvaluated = true;
        pushHistory(trimmed, result);
      }
      break;
    case "func":
      if (!payload || !isFunctionToken(payload)) return;
      appendFunction(payload);
      break;
    case "mc":
      memoryValue = null;
      break;
    case "mr":
      if (memoryValue !== null) {
        if (justEvaluated) {
          expression = "";
          lastResult = "";
          justEvaluated = false;
        }
        if (expression && /[0-9)]|[a-zA-Z]$/.test(expression)) {
          expression += "*";
        }
        expression += memoryValue.toString();
      }
      break;
    case "mplus":
      {
        const current = getCurrentValue();
        memoryValue = memoryValue ? math.add(memoryValue, current) : current;
      }
      break;
    case "mminus":
      {
        const current = getCurrentValue();
        memoryValue = memoryValue ? math.subtract(memoryValue, current) : math.multiply(current, -1);
      }
      break;
    case "theme":
      toggleTheme();
      break;
    case "sci":
      toggleSci();
      break;
    default:
      break;
  }
};

const toggleSci = () => {
  const isOpen = !calc.classList.contains("sci-open");
  calc.classList.toggle("sci-open", isOpen);
  statusEl.textContent = isOpen ? "SCI MODE" : "BASIC OPS";
};

const setTheme = (theme) => {
  document.body.classList.toggle("theme-light", theme === "light");
  themeToggle.textContent = theme === "light" ? "DARK" : "LIGHT";
  localStorage.setItem("calc-theme", theme);
};

const toggleTheme = () => {
  const isLight = document.body.classList.contains("theme-light");
  setTheme(isLight ? "dark" : "light");
};

keysWrap.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const value = button.dataset.value;
  const action = button.dataset.action;
  const fn = button.dataset.fn;

  if (value) {
    appendValue(value);
  } else if (action === "func") {
    handleAction(action, fn);
  } else if (action) {
    handleAction(action);
  }

  updateDisplay();
});

themeToggle.addEventListener("click", () => {
  handleAction("theme");
});

historyToggle.addEventListener("click", () => {
  toggleDrawer();
});

historyClose.addEventListener("click", () => {
  toggleDrawer(false);
});

sciToggle.addEventListener("click", () => {
  handleAction("sci");
});

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/^[0-9]$/.test(key) || ["+", "-", "*", "/", ".", "^", "(", ")"].includes(key)) {
    appendValue(key);
    updateDisplay();
    return;
  }

  if (key === "Enter" || key === "=") {
    handleAction("equals");
    updateDisplay();
  }

  if (key === "Backspace") {
    handleAction("back");
    updateDisplay();
  }

  if (key.toLowerCase() === "c") {
    handleAction("clear");
    updateDisplay();
  }
});

const savedTheme = localStorage.getItem("calc-theme") || "dark";
setTheme(savedTheme);
updateDisplay();

// PWA Install Prompt
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the mini-infobar from appearing
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;
  // Show the install button
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response: ${outcome}`);
  
  // Clear the deferredPrompt
  deferredPrompt = null;
  
  // Hide the install button
  installBtn.style.display = "none";
});

window.addEventListener("appinstalled", () => {
  console.log("PWA installed successfully");
  deferredPrompt = null;
  installBtn.style.display = "none";
});
