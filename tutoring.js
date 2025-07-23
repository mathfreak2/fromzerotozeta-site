// tutoring.js — Step 1: Format selection → Step 2: Subject selection → Step 3: Time selection (coming soon)

document.addEventListener("DOMContentLoaded", () => {
  const launchButton = document.getElementById("launch-scheduler");
  const appContainer = document.getElementById("scheduler-app");
  const introSection = document.querySelector(".intro");

  // Reference pricing tables from static HTML
  const formatPricingTable = document.querySelector(".pricing-table.format");
  const levelPricingTable = document.querySelector(".pricing-table.level");

  launchButton.addEventListener("click", () => {
    launchButton.style.display = "none";
    appContainer.style.display = "block";
    introSection.insertAdjacentElement("afterend", appContainer);
    renderFormatStep();
  });

  function renderFormatStep() {
    appContainer.innerHTML = "";

    const section = document.createElement("div");
    section.className = "scheduler-step";

    const heading = document.createElement("h2");
    heading.textContent = "Choose a format";
    section.appendChild(heading);

    const clone = formatPricingTable.cloneNode(true);
    Array.from(clone.querySelectorAll("tbody tr")).forEach(row => {
      row.classList.add("clickable-row");
      row.addEventListener("click", () => {
        const format = row.cells[0].textContent.trim();
        handleFormatSelection(format);
      });
    });
    section.appendChild(clone);

    const controls = document.createElement("div");
    controls.className = "scheduler-controls";
    const cancelBtn = document.createElement("button");
    cancelBtn.className = "cancel";
    cancelBtn.textContent = "Cancel";
      cancelBtn.onclick = () => {
        appContainer.innerHTML = "";

        // Clear and reset the intro section content
        introSection.innerHTML = "";

        const title = document.createElement("h1");
        title.textContent = "Schedule a Tutoring Session";

        const paragraph = document.createElement("p");
        paragraph.textContent = "Choose your preferred format, subject, and time. All sessions are priced based on format and topic. Payments are handled securely through PayPal. All times shown are in Pacific Time (PST/PDT).";

        introSection.appendChild(title);
        introSection.appendChild(paragraph);
        introSection.appendChild(launchButton);

        launchButton.style.display = "block";
      };
    controls.appendChild(cancelBtn);
    section.appendChild(controls);

    appContainer.appendChild(section);
  }

  let selectedFormat = null;

  function handleFormatSelection(format) {
    selectedFormat = format;
    renderLevelStep();
  }

  function renderLevelStep() {
    appContainer.innerHTML = "";

    const section = document.createElement("div");
    section.className = "scheduler-step";

    const heading = document.createElement("h2");
    heading.textContent = "Choose a level";
    section.appendChild(heading);

    const clone = levelPricingTable.cloneNode(true);
    Array.from(clone.querySelectorAll("tbody tr")).forEach(row => {
      row.classList.add("clickable-row");
      row.addEventListener("click", () => {
        const level = row.cells[0].textContent.trim();
        handleLevelSelection(level);
      });
    });
    section.appendChild(clone);

    const controls = document.createElement("div");
    controls.className = "scheduler-controls";
    const backBtn = document.createElement("button");
    backBtn.className = "back";
    backBtn.textContent = "Back";
    backBtn.onclick = () => renderFormatStep();
    controls.appendChild(backBtn);
    section.appendChild(controls);

    appContainer.appendChild(section);
  }

  let selectedLevel = null;

  function handleLevelSelection(level) {
    selectedLevel = level;
    console.log("Selected format:", selectedFormat);
    console.log("Selected level:", selectedLevel);
    // TODO: renderTimeSelection();
  }
});
