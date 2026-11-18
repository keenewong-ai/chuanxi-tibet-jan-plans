(function () {
  const tabs = Array.from(document.querySelectorAll("[data-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-panel]"));

  function show(id, pushHash) {
    const next = panels.some((p) => p.id === id) ? id : "overview";
    tabs.forEach((btn) => {
      const on = btn.getAttribute("data-tab") === next;
      btn.setAttribute("aria-selected", on ? "true" : "false");
      btn.tabIndex = on ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== next;
    });
    if (pushHash) {
      history.replaceState(null, "", "#" + next);
    }
    const nav = document.querySelector(".tabs");
    if (nav && pushHash) {
      const y = nav.getBoundingClientRect().top + window.scrollY - 8;
      if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => show(btn.getAttribute("data-tab"), true));
  });

  document.querySelectorAll("[data-open-tab]").forEach((el) => {
    el.addEventListener("click", () => show(el.getAttribute("data-open-tab"), true));
  });

  const fromHash = (location.hash || "").replace("#", "");
  show(fromHash, false);
  window.addEventListener("hashchange", () => show((location.hash || "").replace("#", ""), false));

  const sticky = document.querySelector(".tabs");
  if (sticky) {
    const onScroll = () => sticky.classList.toggle("is-stuck", sticky.getBoundingClientRect().top <= 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
