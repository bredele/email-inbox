# email-inbox

Return email inbox URL based on a given email

## Installation

```sh
npm install @bredele/email-inbox
```

## Usage

```ts
import inbox from "@bredele/email-inbox";

await inbox("hello@gmail.com");
// => { provider: 'gmail', url: 'https://accounts.google.com/AccountChooser?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F%3Fauthuser%3Dhello%2540gmail.com&service=mail&Email=hello%40gmail.com'}

await inbox("hello@something-random.com");
// => null
```

## Providers

This module supports the following providers:

- gmail
- outlook
- yahoo
- zoho
- protonmail
- icloud
- fastmail
