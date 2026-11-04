import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import Module from 'node:module';
import ts from 'typescript';
import path from 'node:path';

function loadTs(filename) {
  const absolute = path.resolve(filename);
  const compiled = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = new Module(absolute);
  mod.filename = absolute;
  mod.paths = Module._nodeModulePaths(path.dirname(absolute));
  mod._compile(compiled, absolute);
  return mod.exports;
}

const schemas = loadTs('src/schemas/onboarding/index.ts');
const contact = { email: 'organizer@example.com', phone: '9876543210', address: 'Campus Road', city: 'Warangal', state: 'Telangana', pincode: '506015' };
const payout = { accountHolder: 'Organizer', accountNumber: '12345678901', confirmAccountNumber: '12345678901', ifsc: 'HDFC0001234', bankName: 'HDFC Bank', branchName: 'Warangal', upiId: '' };
const helpers = loadTs('src/lib/frontend-validation.ts');
test('uploads reject unsupported extensions, mismatched MIME and files above 5 MB', () => {
  const validate = helpers.validateUpload;
  assert.match(validate({ name: 'notes.txt', type: 'text/plain', size: 20 }), /PDF|PNG|JPG/);
  assert.match(validate({ name: 'large.pdf', type: 'application/pdf', size: 6 * 1024 * 1024 }), /5 MB/);
  assert.match(validate({ name: 'notes.pdf', type: 'text/plain', size: 20 }), /PDF|PNG|JPG/);
  assert.equal(validate({ name: 'valid.pdf', type: 'application/pdf', size: 5 * 1024 * 1024 }), '');
  assert.equal(validate({ name: 'valid.JPG', type: 'image/jpeg', size: 20 }), '');
});
test('ticket preview normalizes grouped prices and guards non-finite values', () => {
  const format = helpers.formatTicketPrice;
  assert.equal(format('1,999'), '1,999');
  for (const value of ['Infinity', '1e999', 'abc', '-5']) assert.equal(format(value), 'Invalid price');
  assert.equal(format(''), '0');
});

test('required organization name, full name and logo cannot be blank', () => {
  const result = schemas.organizationDetailsSchema.safeParse({ organizationName: 'Club', organizationType: 'College', contactName: '', logoUrl: '' });
  assert.equal(result.success, false);
  assert.ok(result.error.issues.some(i => i.path[0] === 'contactName'));
  assert.ok(result.error.issues.some(i => i.path[0] === 'logoUrl'));
});
test('contact rejects alphabetic phone numbers and nonnumeric pincodes', () => {
  assert.equal(schemas.contactAddressSchema.safeParse({ ...contact, phone: 'abcdefghij' }).success, false);
  assert.equal(schemas.contactAddressSchema.safeParse({ ...contact, pincode: 'ABCDEF' }).success, false);
  assert.equal(schemas.contactAddressSchema.safeParse({ ...contact, email: 'not-an-email' }).success, false);
  assert.equal(schemas.contactAddressSchema.safeParse(contact).success, true);
});
test('payout rejects malformed IFSC, account numbers and UPI', () => {
  for (const values of [{ ifsc: 'ABCDEFGHIJK' }, { accountNumber: 'abcdefghij', confirmAccountNumber: 'abcdefghij' }, { upiId: 'not-upi' }, { confirmAccountNumber: '11111111111' }]) {
    assert.equal(schemas.payoutDetailsSchema.safeParse({ ...payout, ...values }).success, false);
  }
  assert.equal(schemas.payoutDetailsSchema.safeParse(payout).success, true);
});
test('payout accepts grouped account numbers shown by the form', () => {
  const result = schemas.payoutDetailsSchema.safeParse({ ...payout, accountNumber: '5012 3456 7890', confirmAccountNumber: '501234567890' });
  assert.equal(result.success, true);
  assert.equal(result.data.accountNumber, '501234567890');
});
