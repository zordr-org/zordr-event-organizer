export function formatNumber(
  value: number,
): string {
  return value.toLocaleString("en-IN");
}

export function formatPercentage(
  value: number,
): string {
  return `${value.toFixed(1)}%`;
}

export function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(
    Math.max(value, min),
    max,
  );
}