// tutoring.js — Step 1: Format selection

document.addEventListener("DOMContentLoaded", () => {
  const launchButton = document.getElementById("launch-scheduler");
  const appContainer = document.getElementById("scheduler-app");

  launchButton.addEventListener("click", () => {
    launchButton.style.display = "none";
    appContainer.style.display = "block";
    renderFormatStep();
  });

  function renderFormatStep() {
    appContainer.innerHTML = "";

    const section = document.createElement("div");
    section.className = "scheduler-step";

    const heading = document.createElement("h2");
    heading.textContent = "Choose a format";
    section.appendChild(heading);

    const description = document.createElement("p");
    description.innerHTML = "Please select a format for your tutoring session. Pricing details for each format will go here.";
    section.appendChild(description);

    const list = document.createElement("ul");
    const formats = ["Private", "Recorded", "Livestreamed"];

    formats.forEach(format => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = format;
      btn.onclick = () => handleFormatSelection(format);
      li.appendChild(btn);
      list.appendChild(li);
    });

    section.appendChild(list);
    appContainer.appendChild(section);
  }

  function handleFormatSelection(format) {
    console.log("Format selected:", format);
    // TODO: Transition to subject selection
  }
});
