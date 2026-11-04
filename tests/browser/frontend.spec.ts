import { test, expect } from "@playwright/test";

test("ZOR-001 currency and punctuation render correctly", async ({ page }) => {
  for (const route of ["/dashboard", "/events", "/events/new", "/settings", "/onboarding/1", "/onboarding/3"]) {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText(/Ã|Â|â[€‚œ]|ðŸ/);
  }
});

test("ZOR-002/005/006 ticket preview formats prices and reveals added tickets", async ({ page }) => {
  await page.goto("/events/new");
  await expect(page.locator("body")).not.toContainText("NaN");
  await page.getByRole("button", { name: /5 Tickets Ticket types/ }).click();
  await expect(page.getByRole("textbox", { name: "Ticket 1 Name", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Add Ticket Type" }).click();
  await page.getByRole("button", { name: "View all", exact: true }).click();
  await expect(page.getByText("New Ticket", { exact: true })).toBeVisible();
  await page.getByRole("textbox", { name: "Ticket 3 Price", exact: true }).fill("Infinity");
  await expect(page.getByText("Invalid price", { exact: true })).toBeVisible();
});

test("ZOR-003/006 Next opens Venue and exposes schedule labels", async ({ page }) => {
  await page.goto("/events/new");
  await page.getByRole("button", { name: "Next: Venue", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Venue Name", exact: true })).toBeVisible();
  await expect(page.locator('[data-event-section="venue"] > button')).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "Next: Schedule", exact: true }).click();
  for (const name of ["Event Date", "Start Time", "End Date", "End Time"]) await expect(page.getByLabel(name, { exact: true })).toBeVisible();
});

test("ZOR-004 blank basic fields show errors and cannot publish", async ({ page }) => {
  await page.goto("/events/new");
  await page.getByLabel("Event Name", { exact: true }).fill("");
  await page.getByLabel("Short Description", { exact: true }).fill("");
  await page.getByRole("button", { name: "Next: Venue", exact: true }).click();
  await expect(page.getByLabel("Event Name", { exact: true })).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Event Name is required.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /7.*Publish/ }).click();
  await expect(page.getByRole("button", { name: "Publish Event", exact: true }).last()).toBeDisabled();
});

test("ZOR-007/011 scanner switches expose state and row actions are named", async ({ page }) => {
  await page.goto("/scanner");
  const toggle = page.getByRole("switch", { name: /Play sound/ });
  const initial = await toggle.getAttribute("aria-checked");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-checked", initial === "true" ? "false" : "true");
  await expect(page.getByRole("button", { name: /View scan details for/ }).first()).toBeVisible();
  await page.getByRole("button", { name: "View", exact: true }).first().click();
  await expect(page.getByRole("button", { name: "Close attendee details", exact: true })).toBeVisible();
});

test("ZOR-008/009/010 Settings switches and modal keyboard behavior", async ({ page }) => {
  await page.goto("/settings");
  for (const name of ["Allow Waitlist", "Age Restriction", "Show Attendee List", "Terms & Conditions"]) await expect(page.getByRole("switch", { name, exact: true })).toBeVisible();
  const trigger = page.getByRole("button", { name: "Edit", exact: true }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Edit Event Information", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await dialog.getByLabel("Event Name", { exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("ZOR-011 settlement actions have row context", async ({ page }) => {
  await page.goto("/settlements");
  const action = page.getByRole("button", { name: /Actions for transaction/ }).first();
  await expect(action).toBeVisible();
  await action.click();
  await expect(page.getByRole("button", { name: "View Details", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "View Details", exact: true }).click();
  await expect(page.getByRole("button", { name: "Close transaction details", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Previous transactions page", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Next transactions page", exact: true })).toBeVisible();
});

test("ZOR-012/013 event links preserve context and open a working preview", async ({ page }) => {
  await page.goto("/dashboard");
  const links = page.locator('a[href^="/events/"]').filter({ has: page.locator("h3") });
  expect(await links.count()).toBeGreaterThanOrEqual(3);
  expect(new Set(await links.evaluateAll(items => items.map(item => item.getAttribute("href")))).size).toBeGreaterThanOrEqual(3);
  await page.goto("/events/1");
  await expect(page.getByRole("heading", { name: "Crescendo Fest 2026", exact: true })).toBeVisible();
  await page.goto("/settings");
  await page.getByRole("button", { name: "Team", exact: true }).click();
  await expect(page.getByRole("link", { name: "View Event Page" })).toHaveAttribute("href", "/events/1");
  await page.getByRole("link", { name: "View Event Page" }).click();
  await expect(page.getByRole("heading", { name: "Crescendo Fest 2026", exact: true })).toBeVisible();
});

test("ZOR-014/015/016 auth mode updates copy, state, errors and focus", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Create Account", exact: true }).first().click();
  await expect(page.getByRole("heading", { name: "Create your account", exact: true })).toBeVisible();
  await expect(page.getByText("Welcome Back!", { exact: true })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Create Account", exact: true }).first()).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Confirm Password", { exact: true }).press("Enter");
  const email = page.getByLabel("Email Address", { exact: true });
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByRole("alert").filter({ hasText: "Please enter a valid email address." })).toBeVisible();
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await page.getByRole("button", { name: "Forgot Password?" }).click();
  await expect(page.getByRole("heading", { name: "Reset your password", exact: true })).toBeVisible();
});

test("ZOR-017/024 organization required fields prevent advancement", async ({ page }) => {
  await page.goto("/onboarding/1");
  await page.getByLabel("Organization / Group Name", { exact: true }).fill("");
  await page.getByLabel("Your Full Name", { exact: true }).fill("");
  await page.getByRole("button", { name: "Save & Continue" }).click();
  await expect(page).toHaveURL(/\/onboarding\/1$/);
  await expect(page.locator("#onboarding-errors")).toContainText("Organization Logo");
  await expect(page.getByLabel("Your Full Name", { exact: true })).toHaveAttribute("aria-invalid", "true");
});

test("ZOR-018/024 malformed contact details cannot advance", async ({ page }) => {
  await page.goto("/onboarding/2");
  await page.getByLabel("Official Email Address", { exact: true }).fill("not-an-email");
  await page.getByLabel("Public Contact Number", { exact: true }).fill("abc");
  await page.getByLabel("Pincode", { exact: true }).fill("XYZ");
  await page.getByRole("button", { name: "Save & Continue" }).click();
  await expect(page).toHaveURL(/\/onboarding\/2$/);
  for (const name of ["Official Email Address", "Public Contact Number", "Pincode"]) await expect(page.getByLabel(name, { exact: true })).toHaveAttribute("aria-invalid", "true");
});

test("ZOR-019/020/024 malformed payout fields are rejected without IFSC check", async ({ page }) => {
  await page.goto("/onboarding/3");
  for (const [name, value] of [["Account Number", "111"], ["Confirm Account Number", "222"], ["IFSC Code", "BAD"], ["UPI ID", "not-upi"]]) await page.getByLabel(name, { exact: true }).fill(value);
  await expect(page.getByLabel("IFSC Code", { exact: true }).locator("..").locator("svg.lucide-check")).toHaveCount(0);
  await page.getByRole("button", { name: "Save & Continue" }).click();
  await expect(page).toHaveURL(/\/onboarding\/3$/);
  for (const name of ["Account Number", "Confirm Account Number", "IFSC Code", "UPI ID"]) await expect(page.getByLabel(name, { exact: true })).toHaveAttribute("aria-invalid", "true");
});

test("ZOR-021/022/023 document validation preserves optional document rules", async ({ page }) => {
  await page.goto("/onboarding/4");
  const input = page.locator("#document-other-upload");
  await input.setInputFiles({ name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("unsupported") });
  await expect(page.locator("#onboarding-errors")).toContainText("Choose a PDF, PNG or JPG");
  await expect(page.getByText("Uploaded", { exact: true })).toHaveCount(0);
  await input.setInputFiles({ name: "large.pdf", mimeType: "application/pdf", buffer: Buffer.alloc(6 * 1024 * 1024) });
  await expect(page.locator("#onboarding-errors")).toContainText("5 MB");
  await input.setInputFiles({ name: "valid.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4\nexample") });
  await expect(page.getByText("Uploaded", { exact: true })).toBeVisible();
  await input.setInputFiles({ name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("unsupported") });
  await expect(page.getByText("valid.pdf", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "PAN Card", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Save & Continue" }).click();
  await expect(page).toHaveURL(/\/onboarding\/5$/);
});

test("onboarding keeps entered details across steps and validates final submission", async ({ page }) => {
  await page.goto("/onboarding/1");
  await page.getByLabel("Organization / Group Name", { exact: true }).fill("Regression Test Club");
  await page.locator("#organization-logo-upload").setInputFiles({ name: "logo.png", mimeType: "image/png", buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aMZ0AAAAASUVORK5CYII=", "base64") });
  await page.getByRole("button", { name: "Save & Continue" }).click();
  await expect(page).toHaveURL(/\/onboarding\/2$/);
  await page.getByLabel("Official Email Address", { exact: true }).fill("regression@example.com");
  await page.getByRole("button", { name: "Save & Continue" }).click();
  await expect(page).toHaveURL(/\/onboarding\/3$/);
  await page.getByRole("button", { name: "Save & Continue" }).click();
  await expect(page).toHaveURL(/\/onboarding\/4$/);
  await page.getByRole("button", { name: "Save & Continue" }).click();
  await expect(page).toHaveURL(/\/onboarding\/5$/);
  await expect(page.getByText("Regression Test Club", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Submit Application" }).click();
  await expect(page).toHaveURL(/\/onboarding\/status$/);
});
