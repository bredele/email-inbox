import { test } from "node:test";
import { EMAIL_PROVIDER } from "@bredele/email-provider";
import assert from "node:assert";
import emailInbox, { getGmailSignInUrl } from ".";

test("should return Gmail inbox for gmail.com email", async () => {
  const email = "test@gmail.com";
  const result = await emailInbox("test@gmail.com");

  assert.strictEqual(result?.provider, EMAIL_PROVIDER.GMAIL);
  assert.strictEqual(
    result?.url,
    getGmailSignInUrl(encodeURIComponent(email.toLowerCase()))
  );
});

test("should return Outlook inbox for outlook.com email", async () => {
  const result = await emailInbox("test@outlook.com");

  assert.strictEqual(result?.provider, EMAIL_PROVIDER.OUTLOOK);
  assert.strictEqual(result?.url, "https://outlook.live.com/mail/0/inbox");
});

test("should return Yahoo inbox for yahoo.com email", async () => {
  const result = await emailInbox("test@yahoo.com");

  assert.strictEqual(result?.provider, EMAIL_PROVIDER.YAHOO);
  assert.strictEqual(result?.url, "https://mail.yahoo.com/");
});

test("should return ProtonMail inbox for protonmail.com email", async () => {
  const email = "test@protonmail.com";
  const result = await emailInbox(email);

  assert.strictEqual(result?.provider, EMAIL_PROVIDER.PROTONMAIL);
  assert.strictEqual(
    result?.url,
    `https://mail.proton.me/inbox?email=${encodeURIComponent(
      email.toLowerCase()
    )}`
  );
});

test("should return Zoho inbox for zoho.com email", async () => {
  const result = await emailInbox("test@zoho.com");

  assert.strictEqual(result?.provider, EMAIL_PROVIDER.ZOHO);
  assert.strictEqual(result?.url, "https://mail.zoho.com/");
});

test("should return iCloud inbox for icloud.com email", async () => {
  const result = await emailInbox("test@icloud.com");

  assert.strictEqual(result?.provider, EMAIL_PROVIDER.ICLOUD);
  assert.strictEqual(result?.url, "https://www.icloud.com/#mail/");
});

test("should return null for unsupported email provider", async () => {
  const result = await emailInbox("test@unsupported.com");

  assert.strictEqual(result, null);
});

test("should handle email case insensitivity", async () => {
  const email = "TEST@GMAIL.COM";
  const result = await emailInbox("TEST@GMAIL.COM");

  assert.strictEqual(result?.provider, EMAIL_PROVIDER.GMAIL);
  assert.strictEqual(
    result?.url,
    getGmailSignInUrl(encodeURIComponent(email.toLowerCase()))
  );
});
