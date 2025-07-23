  // tutoring.js — Step 1: Format selection → Step 2: Subject selection → Step 3: Time selection (coming soon)
  
  document.addEventListener("DOMContentLoaded", () => {
    const launchButton = document.getElementById("launch-scheduler");
    const appContainer = document.getElementById("scheduler-app");

  // Example hardcoded availability (can be refined)
  const weeklyAvailability = [
    { day: "Monday", start: 12, end: 20 },
    { day: "Wednesday", start: 12, end: 20 },
    { day: "Thursday", start: 12, end: 20 }
  ]; // Availability in 24-hour format, easy to update
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
        window.location.reload();
      };
      controls.appendChild(cancelBtn);
      section.appendChild(controls);
  
      appContainer.appendChild(section);
}

function renderTimeSelection() {
  appContainer.innerHTML = "";

  const section = document.createElement("div");
  section.className = "scheduler-step";

  const heading = document.createElement("h2");
  heading.textContent = "Choose available time slots (PST/PDT)";
  section.appendChild(heading);

  const info = document.createElement("p");
  info.textContent = "Click on available blocks to select. You'll be able to confirm and proceed to payment after clicking Next.";
  section.appendChild(info);

  const table = document.createElement("table");
  table.classList.add("availability-table");
  const tbody = document.createElement("tbody");

  weeklyAvailability.forEach(slot => {
    const row = document.createElement("tr");
    const dayCell = document.createElement("td");
    dayCell.textContent = slot.day;
    row.appendChild(dayCell);

    for (let hour = slot.start; hour < slot.end; hour++) {
      const cell = document.createElement("td");
      const label = `${slot.day} ${hour}:00`;
      cell.textContent = `${hour}:00`;
      cell.classList.add("clickable-row");
      cell.dataset.label = label;

      cell.addEventListener("click", () => {
        const label = cell.dataset.label;

        if (selectingStartTime) {
          currentSelection.start = label;
          selectedTimeSlots.push({ start: label });
          cell.classList.add("selected");
          currentSelection.startCell = cell;
          selectingStartTime = false;
        } else {
          currentSelection.end = label;
          const lastSlot = selectedTimeSlots[selectedTimeSlots.length - 1];
          lastSlot.end = label;

          const startParts = currentSelection.start.split(" ");
          const endParts = currentSelection.end.split(" ");

          if (startParts[0] === endParts[0]) {
            const day = startParts[0];
            const startHour = parseInt(startParts[1]);
            const endHour = parseInt(endParts[1]);
            const low = Math.min(startHour, endHour);
            const high = Math.max(startHour, endHour);

            const row = currentSelection.startCell.closest("tr");
            Array.from(row.children).forEach(cell => {
              if (cell.dataset.label && cell.dataset.label.startsWith(day)) {
                const hour = parseInt(cell.dataset.label.split(" ")[1]);
                if (hour >= low && hour <= high) {
                  cell.classList.add("selected");
                }
              }
            });
          }
          selectingStartTime = true;
        }
        console.log("Current selection:", selectedTimeSlots);
      });

      row.appendChild(cell);
    }
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  section.appendChild(table);

  const controls = document.createElement("div");
  controls.className = "scheduler-controls";

  const backBtn = document.createElement("button");
  backBtn.className = "back";
  backBtn.textContent = "Back";
  backBtn.onclick = () => renderLevelStep();
  controls.appendChild(backBtn);

  const nextBtn = document.createElement("button");
  nextBtn.className = "next";
  nextBtn.textContent = "Next";
  nextBtn.onclick = () => {
    if (selectedTimeSlots.length === 0 || !selectingStartTime) {
      alert("Please select at least one complete time range before continuing.");
      return;
    }
    // TODO: reserve slots and proceed to payment screen
    console.log("Proceeding with:", selectedTimeSlots);
  };
  controls.appendChild(nextBtn);

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
let selectedTimeSlots = [];
let selectingStartTime = true;
let currentSelection = {};
  
    function handleLevelSelection(level) {
  selectedLevel = level;
  console.log("Selected format:", selectedFormat);
  console.log("Selected level:", selectedLevel);
  renderTimeSelection();
}
  });
