const modal = document.getElementById("coming-soon-modal");
const openers = document.querySelectorAll("[data-coming-soon]");
const closeButton = document.getElementById("close-modal");

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

for (const opener of openers) {
  opener.addEventListener("click", showModal);
}

closeButton?.addEventListener("click", hideModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    hideModal();
  }
});

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
