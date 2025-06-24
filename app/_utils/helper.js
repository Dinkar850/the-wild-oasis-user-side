export function setUTCStartOrEndOfDay(date, { end = false } = {}) {
  const copy = new Date(date);
  if (end) {
    copy.setUTCHours(23, 59, 59, 999);
  } else {
    copy.setUTCHours(0, 0, 0, 0);
  }
  return copy.toISOString();
}
