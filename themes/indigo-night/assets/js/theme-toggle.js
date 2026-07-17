const themeToggle = document.getElementById("theme-toggle");
const setPressed = () => {
  themeToggle.setAttribute("aria-pressed", document.documentElement.getAttribute("data-theme") === "light");
};
setPressed();
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  setPressed();
});
