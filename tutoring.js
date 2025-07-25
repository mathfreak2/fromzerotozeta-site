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
        
          const endLabel = cell.dataset.label;
          const [dayEnd, endTimeRaw] = endLabel.split(" ");
          const [dayStart, startTimeRaw] = currentSelection.start.split(" ");
          if (dayStart !== dayEnd) return;
        
          const parseTime = str => {
            const [h, m] = str.split(":").map(Number);
            return h * 60 + m;
          };
        
          const startTime = parseTime(startTimeRaw);
          const endTime = parseTime(endTimeRaw);
          const low = Math.min(startTime, endTime);
          const high = Math.max(startTime, endTime);
        
          const allBlocks = gridContainer.querySelectorAll(`.time-block[data-label^='${dayStart}']`);
          allBlocks.forEach(c => {
            const time = parseTime(c.dataset.label.split(" ")[1]);
            c.classList.toggle("hover-highlight", time >= low && time <= high);
          });
        });

        // When the user stops hovering a block (or moves away from the column),
// all hover previews should be cleared to keep the visual state clean.
        cell.addEventListener("mouseleave", () => {
          const blocks = gridContainer.querySelectorAll(".hover-highlight");
          blocks.forEach(c => c.classList.remove("hover-highlight"));
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
