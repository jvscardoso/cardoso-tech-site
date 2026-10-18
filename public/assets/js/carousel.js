(function () {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const INTERVAL = 6000;
  const track = root.querySelector(".car-track");
  const slides = Array.from(track.querySelectorAll(".slide"));
  const dotsWrap = root.querySelector(".car-dots");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer = null;
  let hovering = false;

  root.style.setProperty("--car-interval", INTERVAL + "ms");
  if (reduceMotion) root.classList.add("static");

  const dots = slides.map((slide, i) => {
    slide.setAttribute("aria-label", `${i + 1} / ${slides.length}`);
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "car-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `${i + 1} / ${slides.length}`);
    dot.addEventListener("click", () => { go(i); restart(); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function setActive(i) {
    current = i;
    dots.forEach((d, j) => {
      d.setAttribute("aria-selected", String(j === i));
    });
  }

  function go(i) {
    i = (i + slides.length) % slides.length;
    track.scrollTo({ left: slides[i].offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
    setActive(i);
  }

  function restart() {
    clearInterval(timer);
    if (reduceMotion || hovering || document.hidden) return;
    timer = setInterval(() => go(current + 1), INTERVAL);
    root.classList.remove("paused");
    const active = dots[current];
    active.setAttribute("aria-selected", "false");
    void active.offsetWidth;
    active.setAttribute("aria-selected", "true");
  }

  function pause() {
    clearInterval(timer);
    root.classList.add("paused");
  }

  root.querySelector("[data-prev]").addEventListener("click", () => { go(current - 1); restart(); });
  root.querySelector("[data-next]").addEventListener("click", () => { go(current + 1); restart(); });

  // keep dots in sync when the user swipes or scrolls the track
  let scrollEnd;
  track.addEventListener("scroll", () => {
    clearTimeout(scrollEnd);
    scrollEnd = setTimeout(() => {
      const i = slides.reduce((best, s, j) =>
        Math.abs(s.offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft) ? j : best, 0);
      if (i !== current) { setActive(i); if (!hovering) restart(); }
    }, 120);
  });

  track.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); restart(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); restart(); }
  });

  root.addEventListener("mouseenter", () => { hovering = true; pause(); });
  root.addEventListener("mouseleave", () => { hovering = false; restart(); });
  root.addEventListener("focusin", () => { hovering = true; pause(); });
  root.addEventListener("focusout", e => { if (!root.contains(e.relatedTarget)) { hovering = false; restart(); } });
  document.addEventListener("visibilitychange", () => (document.hidden ? pause() : restart()));

  setActive(0);
  restart();
})();
