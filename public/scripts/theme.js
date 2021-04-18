const html = document.querySelector("html");

const checkbox = document.querySelector("input[name=theme]");

const getStyle = (element, style) => {
  return window.getComputedStyle(element).getPropertyValue(style);
};

const initialColors = {
  colorBackground: getStyle(html, "--color-background"),
  colorText: getStyle(html, "--color-text"),

  colorPrimary: getStyle(html, "--color-primary"),
  colorSecondary: getStyle(html, "--color-secondary"),
  colorSecondaryHover: getStyle(html, "--color-secondary-hover"),

  colorInputBackground: getStyle(html, "--color-input-background"),
  colorInputText: getStyle(html, "--color-input-text"),
  colorButtonText: getStyle(html, "--color-button-text"),
  colorHairlineInDark: getStyle(html, "--color-hairline-in-dark"),
  colorHairlineInLight: getStyle(html, "--color-hairline-in-light"),

  colorCardBackground: getStyle(html, "--color-card-background"),
  colorCardTitle: getStyle(html, "--color-card-title"),
  colorCardInputText: getStyle(html, "--color-card-input-text"),
  colorCardLabel: getStyle(html, "--color-card-label"),
  colorCardContent: getStyle(html, "--color-card-content"),

  colorCancel: getStyle(html, "--color-cancel"),
  colorDelete: getStyle(html, "--color-delete"),
  colorSave: getStyle(html, "--color-save"),

  colorBadgeProgressText: getStyle(html, "--color-badge-progress-text"),
  colorBadgeProgressBackground: getStyle(
    html,
    "--color-badge-progress-background"
  ),
  colorBadgeDoneText: getStyle(html, "--color-badge-done-text"),
  colorBadgeDoneBackground: getStyle(html, "--color-badge-done-background"),

  colorHeaderInnerTitle: getStyle(html, "--color-header-inner-title"),

  colorModalBackground: getStyle(html, "--color-modal-background"),
  colorModalTitle: getStyle(html, "--color-modal-title"),
  colorModeSwitcher: getStyle(html, "--color-mode-switcher"),
  colorAsideBorder: getStyle(html, "--color-aside-border"),
};

const darkMode = {
  colorBackground: "#1a1a1a",
  colorText: "#dbdbdb",

  colorPrimary: "#151db4",
  colorSecondary: "#8208ff",
  colorSecondaryHover: "#0066ff",

  colorInputBackground: "#dbdbdf",
  colorInputText: "rgb(39, 39, 39)",
  colorButtonText: "#ffffff",
  colorHairlineInDark: "#4f4f5b",
  colorHairlineInLight: "#e1e3e5",

  colorCardBackground: "#383838",
  colorCardTitle: "#dadada",
  colorCardInputText: "#5a5a66",
  colorCardLabel: "#bfbfcc",
  colorCardContent: "#787880",

  colorCancel: "#c1c1c2",
  colorDelete: "#a72e2a",
  colorSave: "#8208ff",

  colorBadgeProgressText: "#2a802a",
  colorBadgeProgressBackground: "#e8f8e8",
  colorBadgeDoneText: "#a72e2a",
  colorBadgeDoneBackground: "#faeceb",

  colorHeaderInnerTitle: "#bfbfcc",

  colorModalBackground: "#1a1a1a",
  colorModalTitle: "#5a5a66",
  colorModeSwitcher: "#8208ff",
  colorAsideBorder: "transparent",
};

const transformKey = (key) =>
  "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map((key) => {
    html.style.setProperty(transformKey(key), colors[key]);
  });
};

const saveTheme = (theme) => {
  localStorage.setItem("jobs-calc:theme", JSON.stringify(theme));
};

const loadTheme = (theme) => {
  if (theme === "dark") {
    checkbox ? (checkbox.checked = true) : undefined;
    changeColors(darkMode);
  }
};

checkbox &&
  checkbox.addEventListener("change", ({ target }) => {
    let theme = "";

    if (target.checked) {
      changeColors(darkMode);
      theme = "dark";
    } else {
      changeColors(initialColors);
      theme = "light";
    }

    saveTheme(theme);
  });

window.onload = loadTheme(JSON.parse(localStorage.getItem("jobs-calc:theme")));
