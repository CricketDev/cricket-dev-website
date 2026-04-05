document.documentElement.classList.add("nav-ready");

const modal = document.getElementById("coming-soon-modal");
const openers = document.querySelectorAll("[data-coming-soon]");
const closeButton = document.getElementById("close-modal");
const topbar = document.querySelector(".topbar");
const navToggle = document.querySelector(".nav-toggle");
const topnav = document.querySelector(".topnav");
const navToggleLabel = navToggle?.querySelector(".nav-toggle-label");
const mobileNavQuery = window.matchMedia("(max-width: 760px)");

const showModal = () => {
  if (!modal) {
    return;
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
  closeButton?.focus();
};

const hideModal = () => {
  if (!modal) {
    return;
  }

  modal.hidden = true;
  document.body.classList.remove("modal-open");
};

const syncMobileNav = () => {
  if (!topbar || !navToggle || !topnav) {
    return;
  }

  if (!mobileNavQuery.matches) {
    topbar.classList.remove("is-nav-open");
  }

  const isOpen = mobileNavQuery.matches && topbar.classList.contains("is-nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

  if (navToggleLabel) {
    navToggleLabel.textContent = isOpen ? "Close" : "Menu";
  }
};

const setMobileNavOpen = (isOpen) => {
  if (!topbar || !navToggle || !topnav || !mobileNavQuery.matches) {
    return;
  }

  topbar.classList.toggle("is-nav-open", isOpen);
  syncMobileNav();
};

for (const opener of openers) {
  opener.addEventListener("click", showModal);
}

closeButton?.addEventListener("click", hideModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

navToggle?.addEventListener("click", () => {
  if (!topbar) {
    return;
  }

  setMobileNavOpen(!topbar.classList.contains("is-nav-open"));
});

for (const link of topnav?.querySelectorAll("a") ?? []) {
  link.addEventListener("click", () => {
    setMobileNavOpen(false);
  });
}

document.addEventListener("click", (event) => {
  if (
    !mobileNavQuery.matches ||
    !topbar ||
    !topbar.classList.contains("is-nav-open") ||
    !(event.target instanceof Node) ||
    topbar.contains(event.target)
  ) {
    return;
  }

  setMobileNavOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (mobileNavQuery.matches && topbar?.classList.contains("is-nav-open")) {
    setMobileNavOpen(false);
  }

  if (modal && !modal.hidden) {
    hideModal();
  }
});

if (mobileNavQuery.addEventListener) {
  mobileNavQuery.addEventListener("change", syncMobileNav);
} else if (mobileNavQuery.addListener) {
  mobileNavQuery.addListener(syncMobileNav);
}

syncMobileNav();

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.14 }
  );

  for (const target of revealTargets) {
    observer.observe(target);
  }
} else {
  for (const target of revealTargets) {
    target.classList.add("is-visible");
  }
}
