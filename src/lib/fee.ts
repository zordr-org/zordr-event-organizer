export const PLATFORM_FEE_RATE = 0.05;

export function calculatePlatformFee(
  amount: number,
): number {
  return amount * PLATFORM_FEE_RATE;
}

export function calculateNetAmount(
  amount: number,
): number {
  return (
    amount -
    calculatePlatformFee(amount)
  );
}

export function calculateGrossAmount(
  netAmount: number,
): number {
  return (
    netAmount /
    (1 - PLATFORM_FEE_RATE)
  );
}

export function formatCurrency(
  amount: number,
): string {
  return `₹${amount.toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    },
  )}`;
}