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
