export type SortDirection = 'asc' | 'desc';

export function sortByColumn<T>(
  array: T[],
  column: keyof T,
  direction: SortDirection,
  shouldRemoveDigits: boolean = false
): T[] {
  return [...array].sort((a, b) => {
    const valA = a[column];
    const valB = b[column];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return direction === 'asc' ? valA - valB : valB - valA;
    }

    if (shouldRemoveDigits) {
      return direction === 'asc'
      ? removeDigits(String(valA)).localeCompare(removeDigits(String(valB)))
      : removeDigits(String(valB)).localeCompare(removeDigits(String(valA)));
    }
    return direction === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });
}

function removeDigits(str: string): string {
  return str.replace(/\d+/g, '');
}
