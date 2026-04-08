export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

export function dateKey(year, month, day) {
  return `${year}-${month}-${day}`;
}

export function isSameDay(d1, d2) {
  return d1 && d2 &&
    d1.year === d2.year &&
    d1.month === d2.month &&
    d1.day === d2.day;
}

export function isBetween(d, start, end) {
  if (!start || !end) return false;
  const t = d.year * 10000 + d.month * 100 + d.day;
  const s = start.year * 10000 + start.month * 100 + start.day;
  const e = end.year * 10000 + end.month * 100 + end.day;
  const lo = Math.min(s, e);
  const hi = Math.max(s, e);
  return t > lo && t < hi;
}

export function isEndpoint(d, start, end) {
  return isSameDay(d, start) || isSameDay(d, end);
}

export function buildCells(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevDays = getDaysInMonth(year, month === 0 ? 11 : month - 1);

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevDays - firstDay + 1 + i, current: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, current: true });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, current: false });
  }
  return cells;
}
