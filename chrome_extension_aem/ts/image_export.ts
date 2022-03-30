// @ts-ignore
const setLight = () => {
  document.documentElement.classList.add("light");
}

// @ts-ignore
const setDark = () => {
  document.documentElement.classList.add("dark");
}

// on popup ...
chrome.storage.local.get("theme", ({ theme }) => {
  // ------------------------- theme -------------------------

  if (theme === "light") {
    setLight();
  } else if (theme === "dark") {
    setDark();
  } else {
    const PREFERS_COLOR_SCHEME = window.matchMedia("(prefers-color-scheme: light)");

    if (PREFERS_COLOR_SCHEME.matches) {
      setLight();
    } else {
      setDark();
    }
  }
});

// ------------------------- ... -------------------------

const BODY = document.querySelector("body") as HTMLBodyElement;

const DIV_0 = document.createElement("div") as HTMLDivElement;
DIV_0.setAttribute("class", "position-fixed bottom-0 start-0 rounded m-2 p-2 | f-app-surface-base ms-motion-slideUpIn");
DIV_0.setAttribute("id", "div_ie_0");

// .ms-motion-slideUpIn animation
setTimeout(() => {
  BODY.appendChild(DIV_0);
}, 250);

const BUTTON = document.createElement("button") as HTMLButtonElement;
BUTTON.setAttribute("class", "btn btn-sm position-absolute top-0 start-100 translate-middle | icon f-text");
BUTTON.setAttribute("id", "button_ie_chrome_close");
BUTTON.setAttribute("type", "button");
DIV_0.appendChild(BUTTON);

const DIV_1 = document.createElement("div") as HTMLDivElement;
DIV_1.setAttribute("class", "rounded p-2 | f-app-surface-layer");
DIV_0.appendChild(DIV_1);

const DIV_2 = document.createElement("div") as HTMLDivElement;
DIV_2.setAttribute("class", "row g-2");
DIV_1.appendChild(DIV_2);

const DIV_3 = document.createElement("div") as HTMLDivElement;
DIV_3.setAttribute("class", "col");
DIV_2.appendChild(DIV_3);

// select

const SELECT = document.createElement("select") as HTMLSelectElement;
SELECT.setAttribute("class", "form-select form-select-sm | f-body f-text");
SELECT.setAttribute("id", "select_ie");
DIV_3.appendChild(SELECT);

const OPTION_0 = document.createElement("option") as HTMLOptionElement;
OPTION_0.setAttribute("value", "contains");
SELECT.appendChild(OPTION_0);

const OPTION_0_CTN = document.createTextNode("contains");
OPTION_0.appendChild(OPTION_0_CTN);

const OPTION_1 = document.createElement("option") as HTMLOptionElement;
OPTION_1.setAttribute("value", "not contains");
SELECT.appendChild(OPTION_1);

const OPTION_1_CTN = document.createTextNode("not contains");
OPTION_1.appendChild(OPTION_1_CTN);

const DIV_4 = document.createElement("div") as HTMLDivElement;
DIV_4.setAttribute("class", "col");
DIV_2.appendChild(DIV_4);

// input

const INPUT = document.createElement("input") as HTMLInputElement;
INPUT.setAttribute("class", "form-control form-control-sm | f-body f-text");
INPUT.setAttribute("type", "text");
INPUT.setAttribute("placeholder", "/pl/");
DIV_4.appendChild(INPUT);

const DIV_5 = document.createElement("div") as HTMLDivElement;
DIV_5.setAttribute("class", "rounded mt-2 p-2 | f-app-surface-layer");
DIV_5.setAttribute("id", "div_ie_5");
DIV_0.appendChild(DIV_5);

const DIV_6 = document.createElement("div") as HTMLDivElement;
DIV_6.setAttribute("class", "overflow-scroll");
DIV_6.setAttribute("id", "div_ie_6");
DIV_5.appendChild(DIV_6);

const IMGS = document.querySelectorAll("img");
let i: number = 0;

if (IMGS !== null) {
  for (let img of Array.from(IMGS)) {
    const DIV = document.createElement("div") as HTMLDivElement;
    DIV.setAttribute("class", "d-flex flex-column mb-2");
    DIV_6.appendChild(DIV);

    const SPAN_0 = document.createElement("span") as HTMLSpanElement;
    SPAN_0.setAttribute("class", "text-nowrap | f-body f-text cascadia_code");
    DIV.appendChild(SPAN_0);

    const SPAN_0_CTN = document.createTextNode(`img ${i}:`);
    SPAN_0.appendChild(SPAN_0_CTN);

    i++;

    const SPAN_1 = document.createElement("span") as HTMLSpanElement;
    SPAN_1.setAttribute("class", "text-nowrap | f-caption f-text cascadia_code_italic");
    DIV.appendChild(SPAN_1);

    const SPAN_1_CTN = document.createTextNode(`src: ${img.src}`);
    SPAN_1.appendChild(SPAN_1_CTN);

    const SPAN_2 = document.createElement("span") as HTMLSpanElement;
    SPAN_2.setAttribute("class", "text-muted text-nowrap | f-caption f-text cascadia_code_italic");
    DIV.appendChild(SPAN_2);

    const SPAN_2_CTN = document.createTextNode(`alt: ${img.alt}`);
    SPAN_2.appendChild(SPAN_2_CTN);
  }
}

BUTTON.addEventListener("click", () => {
  DIV_0.classList.remove("ms-motion-slideUpIn");
  DIV_0.classList.add("ms-motion-slideDownOut");

  // .ms-motion-slideDownOut animation
  setTimeout(() => {
    BODY.removeChild(DIV_0);
    location.reload();
  }, 100);
});

const setFilters = () => {
  const DIVS = DIV_6.querySelectorAll("div");

  for (let div of Array.from(DIVS)) {
    const SPAN_TEXTCONTENT: string = div.children[1].textContent;

    if (SELECT.options[SELECT.selectedIndex].value === "contains") {
      if (SPAN_TEXTCONTENT.indexOf(INPUT.value) !== -1) {
        div.classList.remove("d-none");
        div.classList.add("d-flex");
      } else {
        div.classList.remove("d-flex");
        div.classList.add("d-none");
      }
    } else {
      if (SPAN_TEXTCONTENT.indexOf(INPUT.value) === -1) {
        div.classList.remove("d-none");
        div.classList.add("d-flex");
      } else {
        div.classList.remove("d-flex");
        div.classList.add("d-none");
      }
    }
  }
}

SELECT.addEventListener("change", () => {
  setFilters();
});

INPUT.addEventListener("keyup", () => {
  setFilters();
});
