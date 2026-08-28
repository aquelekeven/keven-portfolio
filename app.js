(() => {
  const { highlights, services, projects } = window.portfolioData;
  const page = document.querySelector("#page");
  const hero = document.querySelector("#inicio");
  const highlightsSection = document.querySelector("#destaques");
  const projectScroll = document.querySelector("#project-scroll");

  const highlightMarkup = (item, index) => `
    <article class="highlight-card">
      <div class="highlight-card__media">
        <img src="${item.image}" alt="" loading="lazy" decoding="async">
        <span class="highlight-card__number">${String(index + 1).padStart(2, "0")}</span>
        ${item.kind === "video" ? '<span class="highlight-card__play" aria-hidden="true">▶</span>' : ""}
        <span class="highlight-card__placeholder">${item.kind === "video" ? "Play" : "Still"}</span>
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
    <article class="project-card" style="--card-progress:var(--project-${index});z-index:${index + 1}">
      <div class="project-card__visual">
        <img src="${project.image}" alt="" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">
        <div class="project-card__topline"><span>${String(index + 1).padStart(2, "0")}</span><span>${project.label}</span><span>${project.year}</span></div>
        <div class="project-card__content">
          <p>${project.category}</p><strong>${project.title}</strong><p>${project.summary}</p>
          <ul aria-label="Disciplinas do projeto">${project.tags.map((tag) => `<li>${tag}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="project-card__meta"><p>${project.category}</p><p>${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}</p></div>
    </article>`).join("");

  const progressFor = (element) => {
    const rect = element.getBoundingClientRect();
    const travel = Math.max(element.offsetHeight - window.innerHeight, 1);
    return Math.min(1, Math.max(0, -rect.top / travel));
  };

  let frame = 0;
  let lastFrame = performance.now();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const current = { hero: 0, highlights: 0, projects: projects.map((_, index) => index === 0 ? 1 : 0) };
  const target = { hero: 0, highlights: 0, projects: projects.map((_, index) => index === 0 ? 1 : 0) };

  const measure = () => {
    target.hero = progressFor(hero);
    target.highlights = progressFor(highlightsSection);
    const projectProgress = progressFor(projectScroll);
    projects.forEach((_, index) => {
      target.projects[index] = index === 0 ? 1 : Math.min(1, Math.max(0, projectProgress * (projects.length - 1) - (index - 1)));
    });
  };

  const render = (time) => {
    const delta = Math.min(time - lastFrame, 34);
    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 0.012);
    lastFrame = time;
    let moving = false;
    current.hero += (target.hero - current.hero) * ease;
    current.highlights += (target.highlights - current.highlights) * ease;
    page.style.setProperty("--hero-progress", current.hero.toFixed(4));
    page.style.setProperty("--highlights-progress", current.highlights.toFixed(4));
    projects.forEach((_, index) => {
      current.projects[index] += (target.projects[index] - current.projects[index]) * ease;
      page.style.setProperty(`--project-${index}`, current.projects[index].toFixed(4));
      moving ||= Math.abs(target.projects[index] - current.projects[index]) > 0.0005;
    });
    moving ||= Math.abs(target.hero - current.hero) > 0.0005 || Math.abs(target.highlights - current.highlights) > 0.0005;
    if (moving) frame = requestAnimationFrame(render);
    else frame = 0;
  };

  const onScroll = () => {
    measure();
    if (!frame) {
      lastFrame = performance.now();
      frame = requestAnimationFrame(render);
    }
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  measure();
  frame = requestAnimationFrame(render);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
})();
