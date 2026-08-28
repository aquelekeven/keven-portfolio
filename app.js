(() => {
  const { highlights, services, projects } = window.portfolioData;
  const page = document.querySelector("#page");
  const hero = document.querySelector("#inicio");
  const highlightsSection = document.querySelector("#destaques");
  const projectLogoGrid = document.querySelector("#project-logo-grid");
  const caseViewer = document.querySelector("#case-viewer");

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

  const topHighlights = highlights.slice(0, 3);
  const bottomHighlights = highlights.slice(3, 6);
  document.querySelector("#highlight-top").innerHTML = topHighlights.map(highlightMarkup).join("");
  document.querySelector("#highlight-bottom").innerHTML = bottomHighlights.map((item, index) => highlightMarkup(item, index + 3)).join("");

  document.querySelector("#service-list").innerHTML = services.map((service, index) => `
    <article class="service-row reveal">
      <div class="service-row__marker"><span>${String(index + 1).padStart(2, "0")}</span><i aria-hidden="true"></i></div>
      <div class="service-row__content"><p>Atuação / ${String(index + 1).padStart(2, "0")}</p><h3>${service.title}</h3><div class="service-row__description">${service.description}</div></div>
    </article>`).join("");

  const logoMarkup = (project, context = "grid") => project.logoImage
    ? `<img class="project-logo project-logo--${context}" src="${project.logoImage}" alt="${project.logoAlt}" loading="lazy" decoding="async">`
    : `<span class="project-wordmark project-wordmark--${project.logoClass} project-wordmark--${context}" aria-label="${project.title}">${project.logoText.split("|").map((line) => `<span>${line}</span>`).join("")}</span>`;

  projectLogoGrid.innerHTML = projects.map((project, index) => `
    <button class="project-logo-card reveal" type="button" data-project-index="${index}" aria-label="Explorar projeto ${project.title}">
      <span class="project-logo-card__number">${String(index + 1).padStart(2, "0")}</span>
      <span class="project-logo-card__brand">${logoMarkup(project)}</span>
      <span class="project-logo-card__meta"><span>${project.category}</span><strong>Explorar case ↗</strong></span>
      ${project.placeholder ? '<span class="project-logo-card__placeholder">Logo provisória</span>' : ""}
    </button>`).join("");

  const caseProjectCount = document.querySelector("#case-project-count");
  const caseProjectTitle = document.querySelector("#case-project-title");
  const caseProjectCategory = document.querySelector("#case-project-category");
  const caseScene = document.querySelector("#case-scene");
  const caseMedia = document.querySelector("#case-media");
  const caseRail = document.querySelector("#case-rail");
  const caseTimerLabel = document.querySelector("#case-timer-label");
  const caseTimerProgress = document.querySelector("#case-timer-progress");
  const caseVideoSwitch = document.querySelector("#case-video-switch");
  let activeProjectIndex = 0;
  let activeChapterIndex = 0;
  let activeVideoFormat = "horizontal";
  let lastProjectTrigger = null;
  let pointerStart = null;
  let caseTimerId = 0;

  const stopCaseTimer = () => {
    clearInterval(caseTimerId);
    caseTimerId = 0;
  };

  const startCaseTimer = () => {
    stopCaseTimer();
    const startedAt = performance.now();
    const duration = 30000;
    const updateTimer = () => {
      const remaining = Math.max(0, duration - (performance.now() - startedAt));
      caseTimerLabel.textContent = `${String(activeChapterIndex + 1).padStart(2, "0")} / ${String(projects[activeProjectIndex].chapters.length).padStart(2, "0")} · próxima em ${Math.ceil(remaining / 1000)}s`;
      caseTimerProgress.style.width = `${(remaining / duration) * 100}%`;
      if (remaining <= 0) moveChapter(1);
    };
    updateTimer();
    caseTimerId = setInterval(updateTimer, 250);
  };

  const renderVideoPlaceholder = () => `<div class="case-video-placeholder" data-format="${activeVideoFormat}"><span>Vídeo ${activeVideoFormat === "vertical" ? "vertical" : "horizontal"}</span><b>▶</b><small>Arquivo será adicionado aqui</small></div>`;

  const renderCase = () => {
    const project = projects[activeProjectIndex];
    const chapter = project.chapters[activeChapterIndex];
    caseProjectCount.textContent = `${String(activeProjectIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
    caseProjectTitle.textContent = project.title;
    caseProjectCategory.textContent = project.category;
    caseScene.dataset.scene = chapter.scene;
    caseScene.classList.toggle("has-media", Boolean(chapter.image));
    caseMedia.innerHTML = chapter.image
      ? `<img class="case-viewer__content-image" src="${chapter.image}" alt="${chapter.title}" decoding="async">`
      : chapter.scene === "video"
        ? renderVideoPlaceholder()
        : chapter.scene === "overview" ? logoMarkup(project, "case") : `<span class="case-viewer__mark">${chapter.mark}</span>`;
    caseVideoSwitch.hidden = chapter.scene !== "video";
    caseVideoSwitch.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.videoFormat === activeVideoFormat)));
    caseRail.innerHTML = project.chapters.map((item, index) => `<button type="button" data-chapter-index="${index}" aria-pressed="${index === activeChapterIndex}">${item.label}</button>`).join("");
    startCaseTimer();
  };

  const moveChapter = (direction) => {
    const total = projects[activeProjectIndex].chapters.length;
    activeChapterIndex = (activeChapterIndex + direction + total) % total;
    activeVideoFormat = "horizontal";
    renderCase();
  };

  projectLogoGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project-index]");
    if (!trigger) return;
    lastProjectTrigger = trigger;
    activeProjectIndex = Number(trigger.dataset.projectIndex);
    activeChapterIndex = 0;
    activeVideoFormat = "horizontal";
    renderCase();
    document.body.classList.add("case-is-open");
    caseViewer.showModal();
  });

  caseRail.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-chapter-index]");
    if (!trigger) return;
    activeChapterIndex = Number(trigger.dataset.chapterIndex);
    activeVideoFormat = "horizontal";
    renderCase();
  });
  caseVideoSwitch.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-video-format]");
    if (!trigger) return;
    activeVideoFormat = trigger.dataset.videoFormat;
    caseMedia.innerHTML = renderVideoPlaceholder();
    caseVideoSwitch.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button === trigger)));
    startCaseTimer();
  });
  document.querySelector("#case-prev").addEventListener("click", () => moveChapter(-1));
  document.querySelector("#case-next").addEventListener("click", () => moveChapter(1));
  document.querySelector("#case-close").addEventListener("click", () => caseViewer.close());
  caseViewer.addEventListener("close", () => {
    stopCaseTimer();
    document.body.classList.remove("case-is-open");
    lastProjectTrigger?.focus();
  });
  caseViewer.querySelector(".case-viewer__visual").addEventListener("pointerdown", (event) => { pointerStart = { x: event.clientX, y: event.clientY }; });
  caseViewer.querySelector(".case-viewer__visual").addEventListener("pointerup", (event) => {
    if (!pointerStart) return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    if (Math.abs(deltaX) > 54 && Math.abs(deltaX) > Math.abs(deltaY)) moveChapter(deltaX < 0 ? 1 : -1);
    pointerStart = null;
  });
  addEventListener("keydown", (event) => {
    if (!caseViewer.open) return;
    if (event.key === "ArrowRight") moveChapter(1);
    if (event.key === "ArrowLeft") moveChapter(-1);
  });

  const progressFor = (element) => {
    const rect = element.getBoundingClientRect();
    const travel = Math.max(element.offsetHeight - window.innerHeight, 1);
    return Math.min(1, Math.max(0, -rect.top / travel));
  };

  const visibleProgressFor = (element) => {
    const rect = element.getBoundingClientRect();
    const travel = Math.max(element.offsetHeight, 1);
    return Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
  };

  let frame = 0;
  let lastFrame = performance.now();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const current = { hero: 0, highlights: 0 };
  const target = { hero: 0, highlights: 0 };

  const measure = () => {
    target.hero = progressFor(hero);
    target.highlights = visibleProgressFor(highlightsSection);
  };

  const render = (time) => {
    const delta = Math.min(time - lastFrame, 34);
    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 0.012);
    lastFrame = time;
    let moving = false;
    current.hero += (target.hero - current.hero) * ease;
    current.highlights += (target.highlights - current.highlights) * ease;
    page.style.setProperty("--hero-progress", current.hero.toFixed(4));
    const heroArtEntry = Math.min(1, Math.max(0, (current.hero - 0.12) / 0.18));
    const heroTextExit = Math.min(1, Math.max(0, (current.hero - 0.52) / 0.16));
    const heroArtExit = Math.min(1, Math.max(0, (current.hero - 0.74) / 0.16));
    page.style.setProperty("--hero-text-opacity", (1 - heroTextExit).toFixed(4));
    page.style.setProperty("--hero-text-exit", heroTextExit.toFixed(4));
    page.style.setProperty("--hero-art-entry", heroArtEntry.toFixed(4));
    page.style.setProperty("--hero-art-opacity", (heroArtEntry * (1 - heroArtExit)).toFixed(4));
    page.style.setProperty("--hero-art-exit", heroArtExit.toFixed(4));
    page.style.setProperty("--highlights-progress", current.highlights.toFixed(4));
    moving ||= Math.abs(target.hero - current.hero) > 0.0005 || Math.abs(target.highlights - current.highlights) > 0.0005;
    if (moving) frame = requestAnimationFrame(render);
    else frame = 0;
  };

  const onScroll = () => {
    const nextScrollY = window.scrollY;
    if (Math.abs(nextScrollY - lastScrollY) > 2) {
      page.classList.toggle("is-scrolling-up", nextScrollY < lastScrollY);
      lastScrollY = nextScrollY;
    }
    measure();
    if (!frame) {
      lastFrame = performance.now();
      frame = requestAnimationFrame(render);
    }
  };

  let lastScrollY = window.scrollY;
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.08) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, { threshold: [0, 0.08, 0.18], rootMargin: "0px 0px -4%" });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  document.querySelectorAll(".contact-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
    });
  });

  measure();
  frame = requestAnimationFrame(render);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
})();
