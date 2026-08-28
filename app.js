(() => {
  const { highlights, services, projects } = window.portfolioData;
  const page = document.querySelector("#page");
  const hero = document.querySelector("#inicio");
  const highlightsSection = document.querySelector("#destaques");
  const projectScroll = document.querySelector("#project-scroll");

  const highlightMarkup = (item, index) => `
    <article class="highlight-card" style="--accent:${item.accent}">
      <div class="highlight-card__media">
        <span class="highlight-card__number">${String(index + 1).padStart(2, "0")}</span>
        ${item.kind === "video" ? '<span class="highlight-card__play" aria-hidden="true">▶</span>' : ""}
        <span class="highlight-card__placeholder">${item.kind === "video" ? "Vídeo" : "Imagem"}</span>
      </div>
      <div class="highlight-card__meta"><h3>${item.title}</h3><p>${item.category}</p></div>
    </article>`;

  document.querySelector("#highlight-top").innerHTML = highlights.slice(0, 6).map(highlightMarkup).join("");
  document.querySelector("#highlight-bottom").innerHTML = highlights.slice(6).map((item, index) => highlightMarkup(item, index + 6)).join("");

  document.querySelector("#service-list").innerHTML = services.map((service, index) => `
    <article class="service-row reveal">
      <span>${String(index + 1).padStart(2, "0")}</span><h3>${service.title}</h3><p>${service.description}</p><b aria-hidden="true">↗</b>
    </article>`).join("");

  document.querySelector("#project-stage").innerHTML = projects.map((project, index) => `
    <article class="project-card" style="--accent:${project.accent};--card-progress:var(--project-${index});z-index:${index + 1}">
      <div class="project-card__visual"><span>${String(index + 1).padStart(2, "0")}</span><strong>${project.title}</strong><span>Case em breve</span></div>
      <div class="project-card__meta"><p>${project.category}</p><p>${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}</p></div>
    </article>`).join("");

  const progressFor = (element) => {
    const rect = element.getBoundingClientRect();
    const travel = Math.max(element.offsetHeight - window.innerHeight, 1);
    return Math.min(1, Math.max(0, -rect.top / travel));
  };

  let frame = 0;
  const updateScroll = () => {
    frame = 0;
    page.style.setProperty("--hero-progress", progressFor(hero).toFixed(4));
    page.style.setProperty("--highlights-progress", progressFor(highlightsSection).toFixed(4));
    const projectProgress = progressFor(projectScroll);
    projects.forEach((_, index) => {
      const progress = index === 0 ? 1 : Math.min(1, Math.max(0, projectProgress * (projects.length - 1) - (index - 1)));
      page.style.setProperty(`--project-${index}`, progress.toFixed(4));
    });
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateScroll); };
  updateScroll();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
})();
