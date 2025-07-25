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

  const weekControls = document.createElement("div");
  weekControls.className = "week-controls";

  const prevWeekBtn = document.createElement("button");
  prevWeekBtn.textContent = "← Previous Week";
  prevWeekBtn.disabled = true;

  const nextWeekBtn = document.createElement("button");
  nextWeekBtn.textContent = "Next Week →";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "← Previous Week";
  prevBtn.disabled = true;

  const nextBtn = document.createElement("button"); // moved inside renderTimeSelection
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

  nextWeekBtn.onclick = () => {
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    prevWeekBtn.disabled = false;
    updateWeekDisplay();
    renderTimeSelection();
  };

  prevWeekBtn.onclick = () => {
    const thisWeek = new Date();
    const startOfWeek = new Date(thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay() + 1));
    if (currentWeekStart > startOfWeek) {
      currentWeekStart.setDate(currentWeekStart.getDate() - 7);
      updateWeekDisplay();
      if (currentWeekStart <= startOfWeek) prevWeekBtn.disabled = true;
      renderTimeSelection();
    }
  };

  weekControls.appendChild(prevWeekBtn);
  weekControls.appendChild(weekInfo);
  weekControls.appendChild(nextWeekBtn);
  nav.appendChild(weekControls);

  const controls = document.createElement("div");
  controls.className = "scheduler-controls";

  const nextBtn2 = document.createElement("button");
  nextBtn2.textContent = "Next";
  nextBtn2.onclick = () => {
    if (selectedTimeSlots.length === 0 || !selectingStartTime) {
      alert("Please select at least one complete time range before continuing.");
      return;
    }
    // TODO: reserve slots and proceed to payment screen
    console.log("Proceeding with:", selectedTimeSlots);
  };
  controls.appendChild(nextBtn2);

  section.appendChild(nav);

  // Calendar grid container
  const gridContainer = document.createElement("div");
  gridContainer.className = "availability-grid";

  // Iterate through the predefined availability schedule and create one
// column per available day. Each column will display clickable 15-minute
// time blocks labeled in 12-hour AM/PM format.
  weeklyAvailability.forEach(slot => {
    const dayColumn = document.createElement("div");
    dayColumn.className = "day-column";

    const dayHeader = document.createElement("div");
    dayHeader.className = "day-header";
    dayHeader.textContent = slot.day;
    dayColumn.appendChild(dayHeader);

    for (let hour = slot.start; hour < slot.end; hour++) {
      for (let quarter = 0; quarter < 4; quarter++) {
                // For each hour chunk, divide it into four 15-minute intervals.
// Each resulting time block is a div that can be selected or hovered
// over to preview a time range. It holds a data-label to track its
// time reference in the logic.
        const cell = document.createElement("div");
        cell.className = "time-block clickable-row";

        const minute = quarter * 15;
        const suffix = hour < 12 ? "am" : "pm";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const displayMin = minute === 0 ? ":00" : minute === 15 ? ":15" : minute === 30 ? ":30" : ":45";
        const hourDisplay = `${displayHour}${displayMin}${suffix}`;

        const label = `${slot.day} ${hour}:${minute < 10 ? '0' + minute : minute}`;
        cell.dataset.label = label;
        cell.textContent = hourDisplay;

        // Handle time block click to begin or complete a selection.
// First click marks the start time, second click marks the end time.
// The selected range will be stored in selectedTimeSlots and
// visually highlighted by adding the "selected" class to the involved blocks.
cell.addEventListener("click", () => {
  const label = cell.dataset.label;
  const parseTime = str => {
    const [h, m] = str.split(":").map(Number);
    return h * 60 + m;
  };

  // Deselect if clicking on an already-selected block
  if (cell.classList.contains("selected")) {
    const [day, timeRaw] = label.split(" ");
    const t = parseTime(timeRaw);
    selectedTimeSlots = selectedTimeSlots.filter(slot => {
      if (!slot.end) return true;
      const [dstart, startRaw] = slot.start.split(" ");
      const [, endRaw]  = slot.end.split(" ");
      if (dstart === day) {
        const s = parseTime(startRaw);
        const e = parseTime(endRaw);
        const low = Math.min(s, e), high = Math.max(s, e);
        if (t >= low && t <= high) {
          // clear UI for that entire slot
          const all = gridContainer.querySelectorAll(`.time-block[data-label^='${day}']`);
          all.forEach(c => {
            const mm = parseTime(c.dataset.label.split(" ")[1]);
            if (mm >= low && mm <= high) c.classList.remove("selected");
          });
          return false; // drop this slot object entirely
        }
      }
      return true;
    });
    console.log("Updated selections:", selectedTimeSlots);
    return;
  }

  // Begin new selection
  if (selectingStartTime) {
    currentSelection = { start: label, startCell: cell };
    selectedTimeSlots.push({ start: label });
    cell.classList.add("selected");
    selectingStartTime = false;

  // Complete selection: only add cells that aren’t already selected
  } else {
    currentSelection.end = label;
    const lastSlot = selectedTimeSlots[selectedTimeSlots.length - 1];
    lastSlot.end = label;

    const [day, startRaw] = currentSelection.start.split(" ");
    const [, endRaw]     = label.split(" ");
    const a = parseTime(startRaw), b = parseTime(endRaw);
    const low  = Math.min(a, b), high = Math.max(a, b);

    const all = gridContainer.querySelectorAll(`.time-block[data-label^='${day}']`);
    all.forEach(c => {
      const mins = parseTime(c.dataset.label.split(" ")[1]);
      if (mins >= low && mins <= high && !c.classList.contains("selected")) {
        c.classList.add("selected");
      }
    });

    selectingStartTime = true;
  }

  console.log("Current selection:", selectedTimeSlots);
});
        // Preview selection range during hover after selecting a start block.
// Only works within the same day. As the user moves their mouse
// vertically through the grid, this provides real-time visual feedback
// for the potential selection range before the second click.
        // Highlight preview on hover only while selecting end time
cell.addEventListener("mouseenter", () => {
  if (selectingStartTime || !currentSelection.startCell) return;

  const [dayStart, startRaw] = currentSelection.start.split(" ");
  const [dayEnd,   endRaw]   = cell.dataset.label.split(" ");
  if (dayStart !== dayEnd) return;

  const parseTime = str => {
    const [h, m] = str.split(":").map(Number);
    return h * 60 + m;
  };
  const a = parseTime(startRaw), b = parseTime(endRaw);
  const low  = Math.min(a, b), high = Math.max(a, b);

  const all = gridContainer.querySelectorAll(`.time-block[data-label^='${dayStart}']`);
  all.forEach(c => {
    const t = parseTime(c.dataset.label.split(" ")[1]);
    // only preview un-selected cells in range
    c.classList.toggle("hover-highlight", t >= low && t <= high && !c.classList.contains("selected"));
  });
});

        // When the user stops hovering a block (or moves away from the column),
// all hover previews should be cleared to keep the visual state clean.
cell.addEventListener("mouseleave", () => {
  const hov = gridContainer.querySelectorAll(".hover-highlight");
  hov.forEach(c => c.classList.remove("hover-highlight"));
});

        dayColumn.appendChild(cell);
      }
    }

    gridContainer.appendChild(dayColumn);
  });

  section.appendChild(gridContainer);
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
