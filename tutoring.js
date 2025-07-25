//   // tutoring.js — Step 1: Format selection → Step 2: Subject selection → Step 3: Time selection (coming soon)
  
document.addEventListener("DOMContentLoaded", () => {
  const scheduleBtn = document.getElementById("schedule-btn");
  
  // Remove any existing click listeners by cloning the node
  const cleanBtn = scheduleBtn.cloneNode(true);
  scheduleBtn.parentNode.replaceChild(cleanBtn, scheduleBtn);

  // Attach new handler that redirects to Contact Me
  cleanBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // TODO: re-enable tutoring app logic here when ready
    window.location.href = "/contact.html";
  });
});

//   document.addEventListener("DOMContentLoaded", () => {
//     const launchButton = document.getElementById("launch-scheduler");
//     const appContainer = document.getElementById("scheduler-app");

//   // Example hardcoded availability (can be refined)
//   const weeklyAvailability = [
//     { day: "Monday", start: 12, end: 20 },
//     { day: "Wednesday", start: 12, end: 20 },
//     { day: "Thursday", start: 12, end: 20 }
//   ]; // Availability in 24-hour format, easy to update

// // ─── week navigation state ───
// let weekOffset = 0;
// const todayDate   = new Date();
// const thisWeekStart = new Date(todayDate);
// thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay() + 1);
    
//     const introSection = document.querySelector(".intro");
// // removed duplicate declaration of selectedFormat
//   let selectedLevel = null;
//   let selectedTimeSlots = [];
//   let selectingStartTime = true;
//   let currentSelection = {};
  
//     // Reference pricing tables from static HTML
//     const formatPricingTable = document.querySelector(".pricing-table.format");
//     const levelPricingTable = document.querySelector(".pricing-table.level");
  
//     launchButton.addEventListener("click", () => {
//       launchButton.style.display = "none";
//       appContainer.style.display = "block";
//       introSection.insertAdjacentElement("afterend", appContainer);
//       renderFormatStep();
//     });
  
//     function renderFormatStep() {
//       appContainer.innerHTML = "";
  
//       const section = document.createElement("div");
//       section.className = "scheduler-step";
  
//       const heading = document.createElement("h2");
//       heading.textContent = "Choose a format";
//       section.appendChild(heading);
  
//       const clone = formatPricingTable.cloneNode(true);
//       Array.from(clone.querySelectorAll("tbody tr")).forEach(row => {
//         row.classList.add("clickable-row");
//         row.addEventListener("click", () => {
//           const format = row.cells[0].textContent.trim();
//           handleFormatSelection(format);
//         });
//       });
//       section.appendChild(clone);
  
//       const controls = document.createElement("div");
//       controls.className = "scheduler-controls";
//       const cancelBtn = document.createElement("button");
//       cancelBtn.className = "cancel";
//       cancelBtn.textContent = "Cancel";
//       cancelBtn.onclick = () => {
//         window.location.reload();
//       };
//       controls.appendChild(cancelBtn);
//       section.appendChild(controls);
  
//       appContainer.appendChild(section);
// }

// function renderTimeSelection() {
//   appContainer.innerHTML = "";

//   const section = document.createElement("div");
//   section.className = "scheduler-step";

//   const heading = document.createElement("h2");
//   heading.textContent = "Choose available time slots (PST/PDT)";
//   section.appendChild(heading);

//   // ─── week nav setup ───
//   const nav = document.createElement("div");
//   nav.className = "week-nav";

//   const weekControls = document.createElement("div");
//   weekControls.className = "week-controls";

//   const prevWeekBtn = document.createElement("button");
//   prevWeekBtn.textContent = "← Previous Week";
//   prevWeekBtn.disabled = (weekOffset === 0);

//   const weekInfo = document.createElement("span");
//   weekInfo.className = "week-info";

//   const nextWeekBtn = document.createElement("button");
//   nextWeekBtn.textContent = "Next Week →";
//   nextWeekBtn.disabled = (weekOffset >= 51);

//   // compute and display the dates for this weekOffset
//   const currentWeekStart = new Date(thisWeekStart.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000);
//   const endOfWeek = new Date(currentWeekStart);
//   endOfWeek.setDate(endOfWeek.getDate() + 6);
//   weekInfo.textContent = `${currentWeekStart.toDateString()} - ${endOfWeek.toDateString()}`;

//   // button handlers
//   prevWeekBtn.onclick = () => {
//     if (weekOffset > 0) {
//       weekOffset--;
//       renderTimeSelection();
//     }
//   };
//   nextWeekBtn.onclick = () => {
//     if (weekOffset < 51) {
//       weekOffset++;
//       renderTimeSelection();
//     }
//   };

//   weekControls.append(prevWeekBtn, weekInfo, nextWeekBtn);
//   nav.appendChild(weekControls);
//   section.appendChild(nav);

// // ─── time grid and controls ───
// const controls = document.createElement("div");
// controls.className = "scheduler-controls";

// // ← Back button: returns to level selection, but keeps your time slots in memory
// const backBtn = document.createElement("button");
// backBtn.className = "back";
// backBtn.textContent = "← Back";
// backBtn.onclick = () => {
//   renderLevelStep();
// };
// controls.appendChild(backBtn);

// // Next button: proceeds to review
// const nextBtn2 = document.createElement("button");
// nextBtn2.textContent = "Next";
// nextBtn2.onclick = () => {
//   if (selectedTimeSlots.length === 0 || !selectingStartTime) {
//     alert("Please select at least one complete time range before continuing.");
//     return;
//   }
//   console.log("Proceeding with:", selectedTimeSlots);
//   renderReviewStep();  // or whatever your review‐rendering function is called
// };
// controls.appendChild(nextBtn2);

//   section.appendChild(nav);

//   // Calendar grid container
//   const gridContainer = document.createElement("div");
//   gridContainer.className = "availability-grid";

//   // Iterate through the predefined availability schedule and create one
// // column per available day. Each column will display clickable 15-minute
// // time blocks labeled in 12-hour AM/PM format.
//   weeklyAvailability.forEach(slot => {
//     const dayColumn = document.createElement("div");
//     dayColumn.className = "day-column";

//   const header = document.createElement("div");
//   header.className = "day-header";

//   // calculate the Date for this slot.day in the current weekOffset
//   const currentWeekStart = new Date(thisWeekStart.getTime()
//     + weekOffset * 7 * 24 * 60 * 60 * 1000
//   );
//   const dayOffsets = {
//     Monday:    0, Tuesday:  1, Wednesday: 2,
//     Thursday:  3, Friday:   4, Saturday:  5,
//     Sunday:    6
//   };
//   const dateObj = new Date(currentWeekStart);
//   dateObj.setDate(
//     currentWeekStart.getDate()
//     + (dayOffsets[slot.day] || 0)
//   );

//   // format mm/dd/yy
//   const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
//   const dd = String(dateObj.getDate()).padStart(2, "0");
//   const yy = String(dateObj.getFullYear()).slice(-2);

//   header.textContent = `${slot.day} (${mm}/${dd}/${yy})`;
//   dayColumn.appendChild(header);

//     for (let hour = slot.start; hour < slot.end; hour++) {
//       for (let quarter = 0; quarter < 4; quarter++) {
//                 // For each hour chunk, divide it into four 15-minute intervals.
// // Each resulting time block is a div that can be selected or hovered
// // over to preview a time range. It holds a data-label to track its
// // time reference in the logic.
//         const cell = document.createElement("div");
//         cell.className = "time-block clickable-row";

//         const minute = quarter * 15;
//         const suffix = hour < 12 ? "am" : "pm";
//         const displayHour = hour % 12 === 0 ? 12 : hour % 12;
//         const displayMin = minute === 0 ? ":00" : minute === 15 ? ":15" : minute === 30 ? ":30" : ":45";
//         const hourDisplay = `${displayHour}${displayMin}${suffix}`;

//         const label = `${slot.day} ${hour}:${minute < 10 ? '0' + minute : minute}`;
//         cell.dataset.label = label;
//         cell.textContent = hourDisplay;

//         // Handle time block click to begin or complete a selection.
// // First click marks the start time, second click marks the end time.
// // The selected range will be stored in selectedTimeSlots and
// // visually highlighted by adding the "selected" class to the involved blocks.
// cell.addEventListener("click", () => {
//   const label = cell.dataset.label;
//   const parseTime = str => {
//     const [h, m] = str.split(":").map(Number);
//     return h * 60 + m;
//   };

//   // ─── Deselection ───
//   if (cell.classList.contains("selected")) {
//     const [day, timeRaw] = label.split(" ");
//     const t = parseTime(timeRaw);
//     selectedTimeSlots = selectedTimeSlots.filter(slot => {
//       if (slot.week !== weekOffset || !slot.end) return true;
//       const [d, startRaw] = slot.start.split(" ");
//       const [, endRaw]    = slot.end.split(" ");
//       if (d === day) {
//         const s = parseTime(startRaw), e = parseTime(endRaw);
//         const low = Math.min(s, e), high = Math.max(s, e);
//         if (t >= low && t <= high) {
//           // clear UI
//           gridContainer
//             .querySelectorAll(`.time-block[data-label^='${day}']`)
//             .forEach(c => {
//               const mm = parseTime(c.dataset.label.split(" ")[1]);
//               if (mm >= low && mm <= high) c.classList.remove("selected");
//             });
//           return false; // remove this slot
//         }
//       }
//       return true;
//     });
//   }
//   // ─── Start new selection ───
//   else if (selectingStartTime) {
//     currentSelection = { week: weekOffset, start: label, startCell: cell };
//     selectedTimeSlots.push({ week: weekOffset, start: label });
//     cell.classList.add("selected");
//     selectingStartTime = false;
//   }
//   // ─── Complete range (no overlaps) ───
//   else {
//     currentSelection.end = label;
//     const lastSlot = selectedTimeSlots[selectedTimeSlots.length - 1];
//     lastSlot.end  = label;
//     lastSlot.week = weekOffset;

//     const [day, startRaw] = currentSelection.start.split(" ");
//     const [,   endRaw]   = label.split(" ");
//     const a = parseTime(startRaw), b = parseTime(endRaw);
//     const low  = Math.min(a, b), high = Math.max(a, b);

//     gridContainer
//       .querySelectorAll(`.time-block[data-label^='${day}']`)
//       .forEach(c => {
//         const mins = parseTime(c.dataset.label.split(" ")[1]);
//         if (mins >= low && mins <= high && !c.classList.contains("selected")) {
//           c.classList.add("selected");
//         }
//       });

//     selectingStartTime = true;
//   }

//   // ─── Enhanced review log with full dates ───
//   const formatTime = str => {
//     const [h, m] = str.split(":").map(Number);
//     const suffix = h < 12 ? "am" : "pm";
//     const hr = h % 12 === 0 ? 12 : h % 12;
//     return `${hr}:${m.toString().padStart(2,"0")}${suffix}`;
//   };

//   const dayIndexMap = {
//     "Sunday":    0,
//     "Monday":    1,
//     "Tuesday":   2,
//     "Wednesday": 3,
//     "Thursday":  4,
//     "Friday":    5,
//     "Saturday":  6
//   };

//   const humanRanges = selectedTimeSlots
//     .filter(slot => slot.end)
//     .map(slot => {
//       const base = new Date(thisWeekStart.getTime() + slot.week * 7*24*60*60*1000);
//       const [day, startRaw] = slot.start.split(" ");
//       const [,   endRaw]   = slot.end.split(" ");
//       const dayIdx = dayIndexMap[day];
//       const actualDate = new Date(base.getTime() + (dayIdx-1)*24*60*60*1000);
//       // format date as "Mon Jul 28, 2025"
//       const dateStr = actualDate.toDateString().split(" ").slice(0,4).join(" ");
//       return `${dateStr} ${formatTime(startRaw)}–${formatTime(endRaw)}`;
//     });

//   const totalMin = selectedTimeSlots.reduce((sum, slot) => {
//     if (!slot.end) return sum;
//     const a = parseTime(slot.start.split(" ")[1]);
//     const b = parseTime(slot.end.split(" ")[1]);
//     return sum + Math.abs(b - a);
//   }, 0);
//   const totalHrs = (totalMin/60).toFixed(2);

//   console.log(
//     "Review selection →",
//     humanRanges.length ? humanRanges.join(", ") : "*(none complete)*",
//     "| Total hours:", totalHrs
//   );
// });
//         // Preview selection range during hover after selecting a start block.
// // Only works within the same day. As the user moves their mouse
// // vertically through the grid, this provides real-time visual feedback
// // for the potential selection range before the second click.
//         // Highlight preview on hover only while selecting end time
// cell.addEventListener("mouseenter", () => {
//   if (selectingStartTime || !currentSelection.startCell) return;

//   const [dayStart, startRaw] = currentSelection.start.split(" ");
//   const [dayEnd,   endRaw]   = cell.dataset.label.split(" ");
//   if (dayStart !== dayEnd) return;

//   const parseTime = str => {
//     const [h, m] = str.split(":").map(Number);
//     return h * 60 + m;
//   };
//   const a = parseTime(startRaw), b = parseTime(endRaw);
//   const low = Math.min(a,b), high = Math.max(a,b);

//   const all = gridContainer.querySelectorAll(`.time-block[data-label^='${dayStart}']`);
//   all.forEach(c => {
//     const t = parseTime(c.dataset.label.split(" ")[1]);
//     // only preview un-selected cells in range
//     c.classList.toggle("hover-highlight",
//       t >= low && t <= high && !c.classList.contains("selected")
//     );
//   });
// });

//         // When the user stops hovering a block (or moves away from the column),
// // all hover previews should be cleared to keep the visual state clean.
// cell.addEventListener("mouseleave", () => {
//   const hov = gridContainer.querySelectorAll(".hover-highlight");
//   hov.forEach(c => c.classList.remove("hover-highlight"));
// });
//         dayColumn.appendChild(cell);
//       }
//     }

//     gridContainer.appendChild(dayColumn);
//   });

//   // ─── repopulate any previously-selected slots for this week ───
// selectedTimeSlots
//   .filter(slot => slot.week === weekOffset && slot.end)
//   .forEach(slot => {
//     const [ day, startRaw ] = slot.start.split(" ");
//     const [,   endRaw   ] = slot.end.split(" ");

//     // helper to convert "HH:MM" → minutes since midnight
//     const parseTime = str => {
//       const [ h, m ] = str.split(":").map(Number);
//       return h * 60 + m;
//     };

//     const s = parseTime(startRaw),
//           e = parseTime(endRaw),
//           low  = Math.min(s, e),
//           high = Math.max(s, e);

//     gridContainer
//       .querySelectorAll(`.time-block[data-label^='${day}']`)
//       .forEach(cell => {
//         const mins = parseTime(cell.dataset.label.split(" ")[1]);
//         if (mins >= low && mins <= high) {
//           cell.classList.add("selected");
//         }
//       });
//   });

// // … then append the grid (with selections re-highlighted) …
// section.appendChild(gridContainer);
  
//   section.appendChild(gridContainer);
//   section.appendChild(controls);
//   appContainer.appendChild(section);
//     }
  
//     function handleFormatSelection(format) {
//       selectedFormat = format;
//       renderLevelStep();
//     }
  
//     function renderLevelStep() {
//       appContainer.innerHTML = "";
  
//       const section = document.createElement("div");
//       section.className = "scheduler-step";
  
//       const heading = document.createElement("h2");
//       heading.textContent = "Choose a level";
//       section.appendChild(heading);
  
//       const clone = levelPricingTable.cloneNode(true);
//       Array.from(clone.querySelectorAll("tbody tr")).forEach(row => {
//         row.classList.add("clickable-row");
//         row.addEventListener("click", () => {
//           const level = row.cells[0].textContent.trim();
//           handleLevelSelection(level);
//         });
//       });
//       section.appendChild(clone);
  
//       const controls = document.createElement("div");
//       controls.className = "scheduler-controls";
//       const backBtn = document.createElement("button");
//       backBtn.className = "back";
//       backBtn.textContent = "Back";
//       backBtn.onclick = () => renderFormatStep();
//       controls.appendChild(backBtn);
//       section.appendChild(controls);
  
//       appContainer.appendChild(section);
//     }
  
    
  
//     function handleLevelSelection(level) {
//   selectedLevel = level;
//   console.log("Selected format:", selectedFormat);
//   console.log("Selected level:", selectedLevel);
//   renderTimeSelection();
// }
//   });
