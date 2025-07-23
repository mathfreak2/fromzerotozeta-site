// calendar.js for From Zero to Zeta

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle Calendar View";
  toggleBtn.style.marginBottom = "1rem";
  toggleBtn.style.padding = "0.5rem 1rem";
  toggleBtn.style.fontWeight = "bold";

  const calendar = document.querySelector("iframe");
  const main = document.querySelector("main");

  toggleBtn.addEventListener("click", () => {
    if (calendar.style.display === "none") {
      calendar.style.display = "block";
      toggleBtn.textContent = "Hide Calendar";
    } else {
      calendar.style.display = "none";
      toggleBtn.textContent = "Show Calendar";
    }
  });

  main.insertBefore(toggleBtn, calendar);
  calendar.style.display = "block";
});
