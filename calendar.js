// calendar.js for From Zero to Zeta

document.addEventListener("DOMContentLoaded", () => {
  const calendarContainer = document.getElementById("calendar");

  const events = [
  ];

  events.forEach(event => {
    const div = document.createElement("div");
    div.className = "event";

    const title = document.createElement("h3");
    title.textContent = event.title;

    const time = document.createElement("time");
    time.textContent = new Date(event.date).toLocaleString();

    const desc = document.createElement("p");
    desc.textContent = event.description;

    div.appendChild(title);
    div.appendChild(time);
    div.appendChild(desc);
    calendarContainer.appendChild(div);
  });
});
