const toc = document.getElementById("toc");
if (toc && "IntersectionObserver" in window) {
  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const byId = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach(a => a.removeAttribute("aria-current"));
      byId.get(e.target.id).setAttribute("aria-current", "true");
    }
  }, { rootMargin: "-25% 0px -65% 0px" });
  byId.forEach((a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

// Below the gutter breakpoint the TOC is a panel opened from the header button.
const tocToggle = document.getElementById("toc-toggle");
if (toc && tocToggle) {
  const setOpen = open => {
    toc.toggleAttribute("data-open", open);
    tocToggle.setAttribute("aria-expanded", open);
  };
  tocToggle.addEventListener("click", () => setOpen(tocToggle.getAttribute("aria-expanded") !== "true"));
  toc.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("click", e => {
    if (!toc.contains(e.target) && !tocToggle.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape" || tocToggle.getAttribute("aria-expanded") !== "true") return;
    setOpen(false);
    tocToggle.focus();
  });
}
