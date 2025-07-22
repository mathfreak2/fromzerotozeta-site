// script.js for From Zero to Zeta

// Placeholder: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Future hooks: Dynamic calendar, tutoring form integration, or modal popups will go here
console.log("From Zero to Zeta site script loaded.");
