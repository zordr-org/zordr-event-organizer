export function formatTicketPrice(value: string): string {
  const price = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(price) && price >= 0
    ? price.toLocaleString("en-IN")
    : "Invalid price";
}

export function validateUpload(
  file: Pick<File, "name" | "type" | "size">,
  logo = false,
): string {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const types: Record<string, string[]> = {
    png: ["image/png"], jpg: ["image/jpeg", "image/jpg"], jpeg: ["image/jpeg", "image/jpg"],
    ...(logo ? {} : { pdf: ["application/pdf"] }),
  };
  if (!extension || !types[extension] || (file.type && !types[extension].includes(file.type))) {
    return logo ? "Choose a PNG or JPG image." : "Choose a PDF, PNG or JPG document.";
  }
  if (file.size > 5 * 1024 * 1024) return "The maximum file size is 5 MB.";
  if (file.size === 0) return "Choose a non-empty file.";
  return "";
}
