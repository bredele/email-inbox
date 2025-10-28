import provider, { EMAIL_PROVIDER } from "@bredele/email-provider";

/**
 * Get provider name based on `email` MX records and return the inbox URL.
 */

export default async (
  email: string
): Promise<{ provider: EMAIL_PROVIDER; url: string } | null> => {
  const providerName = await provider(email);
  const url = getInboxUrl(providerName, email);
  if (url) return { provider: providerName, url };
  return null;
};

/**
 * Return email inbox URL and provider based on the provided email address.
 */

export const getInboxUrl = (
  providerName: string,
  email: string
): string | void => {
  const user = encodeURIComponent(email.toLowerCase());
  switch (providerName) {
    case EMAIL_PROVIDER.GMAIL:
      return getGmailSignInUrl(user);
    case EMAIL_PROVIDER.OUTLOOK:
      return `https://outlook.live.com/mail/0/inbox`;
    case EMAIL_PROVIDER.YAHOO:
      return `https://mail.yahoo.com/`;
    case EMAIL_PROVIDER.PROTONMAIL:
      return `https://mail.proton.me/inbox?email=${user}`;
    case EMAIL_PROVIDER.ZOHO:
      return `https://mail.zoho.com/`;
    case EMAIL_PROVIDER.ICLOUD:
      return `https://www.icloud.com/#mail/`;
    case EMAIL_PROVIDER.FASTMAIL:
      return `https://www.fastmail.com/mail?username=${user}`;
  }
};

/**
 * Return Gmail inbox redirection URL.
 * @private
 */

export const getGmailSignInUrl = (encodedEmail: string): string => {
  const inboxUrl = `https://mail.google.com/mail/u/?authuser=${encodedEmail}`;
  const continueVal = encodeURIComponent(inboxUrl);
  return (
    `https://accounts.google.com/AccountChooser?` +
    `continue=${continueVal}` +
    `&service=mail` +
    `&Email=${encodedEmail}`
  );
};
