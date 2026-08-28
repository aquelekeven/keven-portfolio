(() => {
  const data = window.PORTFOLIO_DATA;
  const page = document.querySelector("#page");
  const hero = document.querySelector(".hero-scroll");

  document.querySelector("#highlight-grid").innerHTML = data.highlights.map((item, index) => `
    <article class="highlight-card reveal" style="--accent:${item.accent}">
      <div class="highlight-card__media">
        <span class="highlight-card__number">${String(index + 1).padStart(2, "0")}</span>
        ${item.kind === "video" ? '<span class="highlight-card__play" aria-hidden="true">▶</span>' : ""}
        <span class="highlight-card__placeholder">${item.kind === "video" ? "Vídeo" : "Imagem"}</span>
      </div>
      <div class="highlight-card__meta"><h3>${item.title}</h3><p>${item.category}</p></div>
    </article>`).join("");

  document.querySelector("#service-list").innerHTML = data.services.map((item, index) => `
    <article class="service-row reveal">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <span aria-hidden="true">↗</span>
    </article>`).join("");

  document.querySelector("#project-grid").innerHTML = data.projects.map((item, index) => `
    <article class="project-card reveal" style="--accent:${item.accent}">
      <div class="project-card__visual"><span>${String(index + 1).padStart(2, "0")}</span><span>Case em breve</span></div>
      <div class="project-card__meta"><div><h3>${item.title}</h3><p>${item.category}</p></div><span aria-hidden="true">↗</span></div>
    </article>`).join("");

  let frame = 0;
  const update = () => {
    frame = 0;
    const rect = hero.getBoundingClientRect();
    const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
    page.style.setProperty("--hero-progress", progress.toFixed(3));
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
})();