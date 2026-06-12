// ─────────────────────────────────────────────────────────
// main.js — shared interactions + page-specific render
// ─────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  injectNav();
  // home-only
  if (document.body.classList.contains("page-home")) {
    injectHome();
    initStars();
    initTypewriter();
    initParallax();
    initHomeReveal();
  }
  // inner pages
  if (document.body.classList.contains("page-projects"))   renderProjects();
  if (document.body.classList.contains("page-experience")) renderExperience();
  if (document.body.classList.contains("page-blog"))       renderBlog();
  if (document.body.classList.contains("page-post"))       renderPost();

  initCardReveal();
});

// ── shared nav ───────────────────────────────────────────
function injectNav() {
  const brand = document.querySelector("[data-brand]");
  const isHome = document.body.classList.contains("page-home");
  if (brand) {
    if (isHome) {
      brand.textContent = SITE.name;
    } else {
      brand.innerHTML = '<span class="back-arrow">←</span> BACK TO HOME';
    }
  }

  const list = document.querySelector("[data-nav-links]");
  if (!list) return;
  const order = ["github", "linkedin", "email", "cv"];
  const arrow = isHome ? "" : '<span class="arrow">↗</span>';
  list.innerHTML = order
    .map(k => `<li><a href="${SITE.links[k]}" target="_blank" rel="noopener">${k.toUpperCase()}${arrow}</a></li>`)
    .join("");
}

// ── HOME — inject hero + section cards ───────────────────
function injectHome() {
  const greet = document.querySelector("[data-greeting]");
  if (greet) greet.textContent = SITE.hero.greeting;

  const linesWrap = document.querySelector("[data-hero-lines]");
  if (linesWrap) {
    linesWrap.innerHTML = SITE.hero.lines
      .map((line, i) => {
        const isLast = i === SITE.hero.lines.length - 1;
        return `<span class="hero__line" data-line="${i}">${line}${isLast ? '<span class="cursor">_</span>' : ''}</span>`;
      })
      .join("");
  }

  const sectionsWrap = document.querySelector("[data-sections]");
  if (sectionsWrap) {
    sectionsWrap.innerHTML = SECTIONS.map(s => `
      <a class="section-card" href="${s.href}">
        <span class="section-card__meta">${s.number} // ${s.label}</span>
        <h2 class="section-card__title">${s.title}<span class="u">_</span></h2>
        <p class="section-card__blurb">${s.blurb}</p>
      </a>
    `).join("");
  }
}

// ── HOME — stars ─────────────────────────────────────────
function initStars() {
  const canvas = document.querySelector(".home__stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  let raf;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = canvas.offsetWidth  * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    seed();
  }
  function seed() {
    const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 18000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight * 0.7,
      r: Math.random() * 1.1 + 0.2,
      base: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.003 + 0.001,
    }));
  }
  function tick(t) {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    stars.forEach(s => {
      const alpha = s.base + Math.sin(t * s.speed + s.phase) * 0.25;
      ctx.beginPath();
      ctx.fillStyle = `rgba(245, 220, 200, ${Math.max(0, alpha)})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    raf = requestAnimationFrame(tick);
  }
  resize();
  window.addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); raf = requestAnimationFrame(tick); });
  raf = requestAnimationFrame(tick);
}

// ── HOME — typewriter ────────────────────────────────────
function initTypewriter() {
  const greet = document.querySelector("[data-greeting]");
  const lines = document.querySelectorAll(".hero__line");
  if (!greet || !lines.length) return;

  setTimeout(() => { greet.style.transition = "opacity 0.6s ease"; greet.style.opacity = 1; }, 200);

  let delay = 700;
  lines.forEach((lineEl) => {
    const cursor = lineEl.querySelector(".cursor");
    const fullText = cursor ? lineEl.textContent.replace("_", "") : lineEl.textContent;
    const chars = fullText.split("");

    setTimeout(() => {
      lineEl.style.opacity = 1;
      lineEl.innerHTML = "";
      if (cursor) lineEl.appendChild(cursor);
      let i = 0;
      const typeNext = () => {
        if (i < chars.length) {
          const node = document.createTextNode(chars[i]);
          if (cursor) lineEl.insertBefore(node, cursor);
          else lineEl.appendChild(node);
          i++;
          setTimeout(typeNext, 55 + Math.random() * 35);
        }
      };
      typeNext();
    }, delay);

    delay += chars.length * 70 + 250;
  });
}

// ── HOME — parallax ──────────────────────────────────────
function initParallax() {
  const bg = document.querySelector(".home__bg");
  if (!bg) return;
  let ticking = false;
  const update = () => {
    const y = window.scrollY * 0.2;
    bg.style.transform = `translate3d(0, ${-y}px, 0) scale(1.1)`;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

function initHomeReveal() {
  const cards = document.querySelectorAll(".section-card");
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, 1400 + i * 180);
  });
}

// ── PROJECTS ─────────────────────────────────────────────
function renderProjects() {
  const wrap = document.querySelector("[data-projects]");
  if (!wrap) return;
  wrap.innerHTML = projects.map(p => {
    const href = p.liveUrl || p.githubUrl || "#";
    const badges = [];
    if (p.status === "shipped") badges.push(`<span>SHIPPED</span>`);
    if (p.live) badges.push(`<span class="live">LIVE ↗</span>`);
    const img = p.image
      ? `<img src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.parentElement.classList.add('card__image--empty')" />`
      : "";
    const ctaLabel = p.live ? "VIEW LIVE" : (p.githubUrl ? "VIEW ON GITHUB" : "VIEW PROJECT");
    return `
      <a class="card card--project" href="${href}" target="_blank" rel="noopener">
        <div class="card__image">
          ${img}
          <span class="card__image-year">${p.year}</span>
          <span class="card__image-cta">${ctaLabel} <span class="arrow">↗</span></span>
        </div>
        <div class="card__badges">${badges.join("")}</div>
        <h3 class="card__name">${p.name}</h3>
        <p class="card__sub">${p.subtitle}</p>
        <p class="card__desc">${p.description}</p>
      </a>
    `;
  }).join("");
}

// ── EXPERIENCE ───────────────────────────────────────────
function renderExperience() {
  const wrap = document.querySelector("[data-experience]");
  if (!wrap) return;
  wrap.innerHTML = experiences.map(e => {
    const statusClass = e.status === "active" ? "status--active" : "status--completed";
    const statusLabel = e.status.toUpperCase();
    const dates = `${fmtDate(e.start)} → ${e.end ? fmtDate(e.end) : "PRESENT"}`;
    const bullets = e.bullets.map(b => `<li>${b}</li>`).join("");
    const tags = (e.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
    return `
      <div class="card card--exp">
        <div class="card__head">
          <span class="status ${statusClass}">${statusLabel}</span>
          <span class="card__dates">${dates}</span>
        </div>
        <h3 class="card__role">${e.role}<span class="at"> @ </span><span class="company">${e.company}</span></h3>
        <ul class="card__bullets">${bullets}</ul>
        ${tags ? `<div class="card__tags">${tags}</div>` : ""}
      </div>
    `;
  }).join("");
}

// ── BLOG list with filters ───────────────────────────────
function renderBlog() {
  const wrap = document.querySelector("[data-blog]");
  if (!wrap) return;
  const filterBar = document.querySelector("[data-filters]");
  let active = "all";

  function paint() {
    const list = active === "all" ? posts : posts.filter(p => p.category === active);
    wrap.innerHTML = list.map(p => {
      const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
      return `
        <a class="card card--blog" href="post.html?slug=${encodeURIComponent(p.slug)}">
          <div class="card__meta">
            <span>${fmtDate(p.date)}</span>
            <span class="dot"></span>
            <span>${p.readTime} MIN READ</span>
          </div>
          <h3 class="card__title">${p.title}</h3>
          <p class="card__excerpt">${p.excerpt}</p>
          ${tags ? `<div class="card__tags">${tags}</div>` : ""}
        </a>
      `;
    }).join("");
    // re-trigger reveal on the new cards
    initCardReveal();
  }

  if (filterBar) {
    filterBar.addEventListener("click", e => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      filterBar.querySelectorAll(".filter").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      active = btn.dataset.filter;
      paint();
    });
  }
  paint();
}

// ── single POST ──────────────────────────────────────────
function renderPost() {
  const slug = new URLSearchParams(location.search).get("slug");
  const post = posts.find(p => p.slug === slug);
  const wrap = document.querySelector("[data-post]");
  if (!wrap) return;

  if (!post) {
    wrap.innerHTML = `
      <a class="post__back" href="blog.html">← BACK TO BLOG</a>
      <h1 class="post__title">POST NOT FOUND</h1>
    `;
    return;
  }
  document.title = `${post.title} — Arnav Nathani`;
  const tags = (post.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
  wrap.innerHTML = `
    <a class="post__back" href="blog.html">← BACK TO BLOG</a>
    <div class="post__meta">${fmtDate(post.date)} · ${post.readTime} MIN READ</div>
    <h1 class="post__title">${post.title}</h1>
    ${tags ? `<div class="post__tags card__tags">${tags}</div>` : ""}
    <div class="post__body">${escapeHtml(post.body)}</div>
  `;
}

// ── card reveal on scroll (inner pages) ──────────────────
function initCardReveal() {
  const cards = document.querySelectorAll(".card:not(.is-visible)");
  if (!cards.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("is-visible"), idx * 80);
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -50px 0px", threshold: 0.05 });
  cards.forEach(c => io.observe(c));
}

// ── utils ────────────────────────────────────────────────
function fmtDate(s) {
  if (!s) return "";
  // accept "YYYY-MM" or "YYYY-MM-DD"
  return s.replace(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/, (_, y, m, d) =>
    d ? `${y}-${m}-${d}` : `${y}-${m}`
  );
}
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
