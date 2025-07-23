// about.js for From Zero to Zeta

// Smoothly scroll to section if URL includes anchor
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Highlight section on scroll (optional visual effect)
  const sections = document.querySelectorAll("main.about section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("highlighted");
      } else {
        entry.target.classList.remove("highlighted");
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => observer.observe(section));
});
