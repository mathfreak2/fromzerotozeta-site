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
// removed duplicate declaration of selectedFormat
  let selectedLevel = null;
  let selectedTimeSlots = [];
  let selectingStartTime = true;
  let currentSelection = {};
  
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

  const nav = document.createElement("div");
  nav.className = "week-nav";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "← Previous Week";
  prevBtn.disabled = true;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next Week →";

  const weekInfo = document.createElement("span");
  weekInfo.className = "week-info";
  const today = new Date();
  let currentWeekStart = new Date(today.setDate(today.getDate() - today.getDay() + 1));

  function updateWeekDisplay() {
    const endOfWeek = new Date(currentWeekStart);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    weekInfo.textContent = `${currentWeekStart.toDateString()} - ${endOfWeek.toDateString()}`;
  }

  updateWeekDisplay();

  nextBtn.onclick = () => {
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    prevBtn.disabled = false;
    updateWeekDisplay();
    renderTimeSelection();
  };

  prevBtn.onclick = () => {
    const today = new Date();
    const thisWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    if (currentWeekStart > thisWeek) {
      currentWeekStart.setDate(currentWeekStart.getDate() - 7);
      updateWeekDisplay();
      if (currentWeekStart <= thisWeek) prevBtn.disabled = true;
      renderTimeSelection();
    }
  };

  nav.appendChild(prevBtn);
  nav.appendChild(weekInfo);
  nav.appendChild(nextBtn);
  section.appendChild(nav);
  section.appendChild(heading);

  const info = document.createElement("p");
  info.textContent = "Click on available blocks to select. You'll be able to confirm and proceed to payment after clicking Next.";
  section.appendChild(info);

  const table = document.createElement("table");
  table.classList.add("availability-table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.appendChild(document.createElement("th")); // Empty corner cell
  for (let hour = 12; hour < 20; hour++) {
    for (let quarter = 0; quarter < 4; quarter++) {
      const th = document.createElement("th");
      const minute = quarter * 15;
      const suffix = hour < 12 ? "am" : "pm";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const displayMin = minute === 0 ? ":00" : minute === 15 ? ":15" : minute === 30 ? ":30" : ":45";
      th.textContent = `${displayHour}${displayMin}${suffix}`;
      headerRow.appendChild(th);
    }
  }
  const dateRow = document.createElement("tr");
  dateRow.appendChild(document.createElement("td"));

  for (let hour = 12; hour < 20; hour++) {
    for (let quarter = 0; quarter < 4; quarter++) {
      const th = document.createElement("th");
      const minute = quarter * 15;
      const suffix = hour < 12 ? "am" : "pm";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const displayMin = minute === 0 ? ":00" : minute === 15 ? ":15" : minute === 30 ? ":30" : ":45";
      th.textContent = `${displayHour}${displayMin}${suffix}`;
      headerRow.appendChild(th);
      dateRow.appendChild(document.createElement("td"));
    }
  }

  thead.appendChild(headerRow);
  thead.appendChild(dateRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  weeklyAvailability.forEach(slot => {
    const row = document.createElement("tr");
    const dayCell = document.createElement("td");
    const dayOffset = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(slot.day);
    const currentDate = new Date(currentWeekStart);
    currentDate.setDate(currentWeekStart.getDate() + dayOffset);
    const dateString = currentDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    dayCell.innerHTML = `<strong>${slot.day}</strong><br><small>${dateString}</small>`;
    row.appendChild(dayCell);

    for (let hour = slot.start; hour < slot.end; hour++) {
      for (let quarter = 0; quarter < 4; quarter++) {
        const cell = document.createElement("td");
        const minute = quarter * 15;
        const suffix = hour < 12 ? "am" : "pm";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const displayMin = minute === 0 ? ":00" : minute === 15 ? ":15" : minute === 30 ? ":30" : ":45";
        const hourDisplay = `${displayHour}${displayMin}${suffix}`;
        const label = `${slot.day} ${hour}:${minute < 10 ? '0' + minute : minute}`;
        cell.textContent = hourDisplay;
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

            const [dayStart, timeStart] = currentSelection.start.split(" ");
            const [dayEnd, timeEnd] = currentSelection.end.split(" ");

            if (dayStart === dayEnd) {
              const day = dayStart;
              const start = parseFloat(timeStart.replace(":15", ".25").replace(":30", ".5").replace(":45", ".75"));
              const end = parseFloat(timeEnd.replace(":15", ".25").replace(":30", ".5").replace(":45", ".75"));
              const low = Math.min(start, end);
              const high = Math.max(start, end);

              const row = currentSelection.startCell.closest("tr");
              Array.from(row.children).forEach(cell => {
                if (cell.dataset.label && cell.dataset.label.startsWith(day)) {
                  const hour = parseFloat(cell.dataset.label.split(" ")[1].replace(":15", ".25").replace(":30", ".5").replace(":45", ".75"));
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
  
    
  
    function handleLevelSelection(level) {
  selectedLevel = level;
  console.log("Selected format:", selectedFormat);
  console.log("Selected level:", selectedLevel);
  renderTimeSelection();
}
  });
