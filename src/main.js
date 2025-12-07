// src/main.js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobilePanel = document.getElementById("mobilePanel");
  const backdrop = document.getElementById("backdrop");
  const navToggle = document.getElementById("navToggle");
  const topBtn = document.getElementById("topBtn");
  const yearEl = document.getElementById("year");
  const bookTargets = [
    "bookTop",
    "bookTopMobile",
    "bookHero",
    "bookCard",
    "bookContact",
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const bookingUrl = "https://obj.cgm-medistar.cz/cal/p72Lj";

  bookTargets.forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = bookingUrl;
    });
  });

  // sticky header show/hide
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const current = window.pageYOffset;
    if (current > lastScroll && current > 80) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScroll = current <= 0 ? 0 : current;

    if (current > 320) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });

  // smooth scroll for nav
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // mobile menu
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      mobilePanel.classList.toggle("show");
      backdrop.classList.toggle("show");
    });
  }
  if (backdrop) {
    backdrop.addEventListener("click", () => {
      mobilePanel.classList.remove("show");
      backdrop.classList.remove("show");
    });
  }
  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobilePanel.classList.remove("show");
      backdrop.classList.remove("show");
    });
  });

  // active section on scroll
  const sections = document.querySelectorAll("main section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (entry.isIntersecting && navLink) {
          document
            .querySelectorAll(".nav-link")
            .forEach((l) => l.classList.remove("active"));
          navLink.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach((sec) => observer.observe(sec));

  // footer year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
