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

  function extractColumnValues(tableSection, columnIndex) {
    const rows = tableSection.querySelectorAll("tbody tr");
    return Array.from(rows).map(row => row.cells[columnIndex].textContent.trim());
  }

  function renderFormatStep() {
    appContainer.innerHTML = "";

    const section = document.createElement("div");
    section.className = "scheduler-step";

    const heading = document.createElement("h2");
    heading.textContent = "Choose a format";
    section.appendChild(heading);

    const clone = formatPricingTable.cloneNode(true);
    section.appendChild(clone);

    const formats = extractColumnValues(formatPricingTable, 0);
    formats.forEach(format => {
      const btn = document.createElement("button");
      btn.textContent = format;
      btn.onclick = () => handleFormatSelection(format);
      section.appendChild(btn);
    });

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
    section.appendChild(clone);

    const levels = extractColumnValues(levelPricingTable, 0);
    levels.forEach(level => {
      const btn = document.createElement("button");
      btn.textContent = level;
      btn.onclick = () => handleLevelSelection(level);
      section.appendChild(btn);
    });

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
