const EventList = [
  {
    id: "Halloween",
    name: "Festa Halloween",
    time: "21:00 - 01:00",
    price: "8€ a persona",
    icon: "🎃",
    date: {day: 31, month: 9},
    description: "Serata a tema con giochi in costume, premi e dolcetti",
    recurring: true
  },

  {
    id: "Natale",
    name: "Festa di Natale",
    time: "19:00 - 00:00",
    price: "15€ a persona",
    icon: "🎅🏼",
    date: {day: 25, month: 11},
    description: "Festa natalizia con mercatino e dolci",
    recurring: true
  },
  {
    id: "Capodanno",
    name: "Festa di Capodanno",
    time: "22:30 - 02:00",
    price: "15€ a persona",
    icon: "🎊",
    date: {day:31, month: 11},
    description: "Festa di capodanno",
    recurring: true
  },

  {
    id: "Epifania",
    name: "Festa della befana",
    time: "20:00 - 00:00",
    price: "8€ a persona",
    icon: "🧹",
    date: {day: 6, month: 0},
    recurring: true
  },
  {
    id: "Ferragosto",
    name: "Festa di Ferragosto",
    time: "19:00 - 00:00",
    price: "7€ a persona",
    icon: "⛱️​",
    date: {day: 15, month: 7},
    recurring: true
  },
  {
    id: "Ognissanti",
    name: "Ognissanti",
    icon: "👼",
    description: "Chiusi per festa",
    date: {day: 1, month: 10},
    recurring: true
  },
  {
    id: "Festa dei lavoratori",
    name: "Festa dei lavoratori",
    icon: "👨‍🚒",
    description: "Chiusi per festa",
    date: {day: 1, month: 4},
    recurring: true
  },
  {
    id: "Festa della Repubblica",
    name: "Festa della Repubblica",
    icon: "🇮🇹",
    description: "Chiusi per festa",
    date: {day: 2, month: 5},
    recurring: true
  },
  {
    id: "Immacolata Concezione",
    name: "Immacolata Concezione",
    icon: "🤷‍♀️",
    description: "Chiusi per festa",
    date: {day: 1, month: 4},
    recurring: true
  },
  {
    id: "Festa della Liberazione",
    name: "Festa della Liberazione",
    icon: "❌",
    description: "Chiusi per festa",
    date: {day: 25, month: 3},
    recurring: true
  }
];

const itMonths = [
  "Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno",
  "Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"
];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const titleEl = document.getElementById('calendarTitle');
const gridEl = document.getElementById('calendarGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function renderCalendar(month, year) {
  titleEl.textContent = `${itMonths[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  let startIndex = firstDay.getDay();
  startIndex = (startIndex === 0) ? 6 : startIndex - 1;

  const prevMonthLastDay = new Date(year, month, 0).getDate();

  gridEl.innerHTML = "";

  /* --- Giorni del mese precedente --- */
  for (let i = 0; i < startIndex; i++) {
    const dayNum = prevMonthLastDay - startIndex + 1 + i;
    gridEl.appendChild(makeDayCell(dayNum, false, month - 1, year));
  }

  /* --- Giorni del mese corrente --- */
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = makeDayCell(d, true, month, year);

    // evidenzia oggi
    if (year === today.getFullYear() &&
        month === today.getMonth() &&
        d === today.getDate()) {
      cell.classList.add("today");
    }

    gridEl.appendChild(cell);
  }

  /* --- Giorni del mese successivo --- */
  const totalCells = gridEl.children.length;
  const remaining = (Math.ceil(totalCells / 7) * 7) - totalCells;

  for (let r = 1; r <= remaining; r++) {
    gridEl.appendChild(makeDayCell(r, false, month + 1, year));
  }
}

/**
 * Crea la cella del giorno. Normalizza monthForCell per gestire -1 o 12 ecc.
 */
function makeDayCell(dayNumber, isCurrentMonth, monthForCell, yearForCell) {
  // Normalize month and year (gestisce monthForCell -1 o 12)
  let adjMonth = ((monthForCell % 12) + 12) % 12;
  let adjYear = yearForCell;

  if (monthForCell < 0) adjYear = yearForCell - 1;
  if (monthForCell > 11) adjYear = yearForCell + 1;

  const div = document.createElement("div");
  div.className = "day" + (isCurrentMonth ? "" : " outside");
  div.style.position = div.style.position || "";

  const num = document.createElement("div");
  num.className = "day-number";
  num.textContent = dayNumber;
  div.appendChild(num);

  const eventContainer = document.createElement("div");
  eventContainer.className = "event-container";
  div.appendChild(eventContainer); // Il contenitore è aggiunto alla cella

  //emoji lunedi "X"
  const date = new Date(adjYear, adjMonth, dayNumber);
    if(date.getDay() === 1){
    const mondayX = document.createElement("div");
    mondayX.className = "event-icon";
    mondayX.textContent = "❌";
    eventContainer.appendChild(mondayX); // Aggiunto al contenitore
  }

  // Trova eventi ricorrenti per quel giorno/mese
  const matches = EventList.filter(ev => {
    if (!ev.date) return false;
    if (ev.date.day !== dayNumber) return false;
    if (ev.date.month !== adjMonth) return false;

    // Se l'evento ha un anno specifico
    if (ev.date.year !== undefined && ev.date.year !== null) {
    return ev.date.year === adjYear;
  }
  // Evento ricorrente ogni anno
    return ev.recurring === true;
  });

  if (matches.length > 0) {
      // se più eventi, mostro i primi due icone e un contatore
      matches.slice(0, 2).forEach(ev => {
      const iconDiv = document.createElement("div");
      iconDiv.className = "event-icon";
      iconDiv.textContent = ev.icon || "★";
      iconDiv.title = ev.name || ""; // ancora utile come hover tooltip

    iconDiv.tabIndex = -1;
    iconDiv.addEventListener('click', (e) => {
      e.stopPropagation();
    });

      eventContainer.appendChild(iconDiv);
    });

    if (matches.length > 2) {
      const count = document.createElement("div");
      count.className = "event-count";
      count.textContent = `+${matches.length - 2}`;
      eventContainer.appendChild(count); // CORRETTO: Aggiunto a eventContainer
    }
  }
 return div;
}

renderCalendar(currentMonth, currentYear);

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});
