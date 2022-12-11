import "./style.sass";
import currency from "currency.js";

const amountInput = document.querySelector("#amount-input");
const flagsContainer = document.querySelector(".flags-container");
const resultContainer = document.querySelector("#amount-formatted");

const amount = {
  regionSelectedCode: "eu",
  value: Number(amountInput.value) || 0,
};

amountInput.addEventListener("input", (e) => {
  e.preventDefault();
  console.log(e.target.value);
  if (!e.target.value) {
    e.target.value = 0;
  }
  amount.value = Number(e.target.value);
  formatValue(amount);
});

flagsContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("flag-btn")) {
    return;
  }
  e.preventDefault();
  flagsContainer.querySelectorAll(".flag-btn").forEach((el) => {
    console.log(el);
    el.classList.remove("selected");
  });
  e.target.classList.add("selected");
  amount.regionSelectedCode = e.target.dataset.region;
  formatValue(amount);
});

const formatValue = (formatData) => {
  let formatOptions = {};
  switch (formatData.regionSelectedCode) {
    case "us":
      formatOptions = {
        symbol: "$",
        pattern: "!#",
        separator: ",",
        decimal: ".",
      };
      break;
    case "jp":
      formatOptions = {
        symbol: "¥",
        pattern: "! #",
        separator: ",",
        decimal: ".",
      };
      break;
    case "cn":
      formatOptions = {
        symbol: "¥",
        pattern: "! #",
        separator: ",",
        decimal: ".",
      };
      break;
    case "kr":
      formatOptions = {
        symbol: "₩",
        pattern: "! #",
        separator: ",",
        decimal: ".",
      };
      break;
    case "ma":
      formatOptions = {
        symbol: ".د.م.",
        pattern: "# !",
        separator: ",",
        decimal: ".",
      };
      break;
    case "ph":
      formatOptions = {
        symbol: "₱",
        pattern: "! #",
        separator: ",",
        decimal: ".",
      };
      break;
    case "pl":
      formatOptions = {
        symbol: "zł",
        pattern: "# !",
        separator: ".",
        decimal: ",",
      };
      break;
    case "sa":
      formatOptions = {
        symbol: "﷼",
        pattern: "# !",
        separator: ",",
        decimal: ".",
      };
      break;
    case "ch":
      formatOptions = {
        symbol: "fr.",
        pattern: "! #",
        separator: ".",
        decimal: ",",
      };
      break;
    case "tw":
      formatOptions = {
        symbol: "元",
        pattern: "! #",
        separator: ",",
        decimal: ".",
      };
      break;
    case "th":
      formatOptions = {
        symbol: "฿",
        pattern: "# !",
        separator: ",",
        decimal: ".",
      };
      break;
    case "tr":
      formatOptions = {
        symbol: "₺",
        pattern: "# !",
        separator: ",",
        decimal: ".",
      };
      break;

    case "il":
      formatOptions = {
        symbol: "₪",
        pattern: "! #",
        separator: ".",
        decimal: ",",
      };
      break;
    case "gb":
      formatOptions = {
        symbol: "£",
        pattern: "!#",
        separator: ",",
        decimal: ".",
      };
      break;
    case "eu":
    default:
      formatOptions = {
        symbol: "€",
        pattern: "# !",
        separator: ".",
        decimal: ",",
      };
      break;
  }
  const formattedValue = currency(formatData.value, formatOptions);
  resultContainer.innerHTML = formattedValue.format();
};
