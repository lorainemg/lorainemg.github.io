const chips = document.querySelectorAll("#filters [data-filter]");
chips.forEach(chip => chip.addEventListener("click", () => {
  chips.forEach(c => c.classList.remove("on"));
  chip.classList.add("on");
  const f = chip.dataset.filter;
  document.querySelectorAll("#project-grid [data-category]").forEach(card => {
    card.style.display = (f === "all" || card.dataset.category === f) ? "" : "none";
  });
}));
