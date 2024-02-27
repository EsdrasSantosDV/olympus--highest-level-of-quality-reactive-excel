export function getAllDaysOfMonth(year: string, month: number): string[] {
  const date = new Date(parseInt(year), month - 1, 1);
  const days: string[] = [];

  while (date.getMonth() === month - 1) {
    days.push(`day-${date.getDate()}`);
    date.setDate(date.getDate() + 1);
  }

  return days;
}
