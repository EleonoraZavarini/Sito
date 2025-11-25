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

  let startIndex = firstDay.getDay(); // 0=Dom ... 6=Sab
  startIndex = (startIndex === 0) ? 6 : startIndex - 1;

  const prevMonthLastDay = new Date(year, month, 0).getDate();

  gridEl.innerHTML = '';

  // Giorni del mese precedente
  for (let i = 0; i < startIndex; i++) {
    const dayNum = prevMonthLastDay - startIndex + 1 + i;
    gridEl.appendChild(makeDayCell(dayNum, false));
  }

  // Giorni del mese corrente
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = makeDayCell(d, true);
    if (year === today.getFullYear() && month === today.getMonth() && d === today.getDate()) {
      cell.classList.add('today');
    }
    gridEl.appendChild(cell);
  }

  // Giorni del mese successivo
  const totalCells = gridEl.children.length;
  const remaining = (Math.ceil(totalCells / 7) * 7) - totalCells;
  for (let r = 1; r <= remaining; r++) {
    gridEl.appendChild(makeDayCell(r, false));
  }
}

function makeDayCell(dayNumber, isCurrentMonth) {
  const div = document.createElement('div');
  div.className = 'day' + (isCurrentMonth ? '' : ' outside');

  const num = document.createElement('div');
  num.className = 'day-number';
  num.textContent = dayNumber;
  div.appendChild(num);

  return div;
}

prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Mostra subito il mese corrente
renderCalendar(currentMonth, currentYear);
