export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");

  if (!name || !domain) {
    return email;
  }

  if (name.length <= 2) {
    return `${name[0] ?? "*"}*@${domain}`;
  }

  return `${name[0]}${"*".repeat(
    Math.max(name.length - 2, 1),
  )}${name[name.length - 1]}@${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length < 4) {
    return phone;
  }

  return `${"*".repeat(
    Math.max(digits.length - 4, 0),
  )}${digits.slice(-4)}`;
}

export function maskAccountNumber(
  accountNumber: string,
): string {
  const clean = accountNumber.replace(/\s/g, "");

  if (clean.length <= 4) {
    return clean;
  }

  return `${"*".repeat(clean.length - 4)}${clean.slice(-4)}`;
}