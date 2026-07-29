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
