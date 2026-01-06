import { URL } from 'node:url';

const variables = [
  'AUTH0_SECRET',
  'APP_BASE_URL',
  'AUTH0_DOMAIN',
  'AUTH0_CLIENT_ID',
  'AUTH0_CLIENT_SECRET',
  'AUTH0_BASE_URL',
  'AUTH0_ISSUER_BASE_URL'
];

console.log('--- Env Check ---');
variables.forEach(v => {
  console.log(`${v}: ${process.env[v] ? 'LOADED' : 'MISSING'}`);
});

const urlChecks = [
  { name: 'APP_BASE_URL', value: process.env.APP_BASE_URL || process.env.AUTH0_BASE_URL },
  { name: 'AUTH0_ISSUER_BASE_URL', value: process.env.AUTH0_ISSUER_BASE_URL }
];

try {
  urlChecks.forEach(({ name, value }) => {
    if (!value) {
      console.log(`${name}: MISSING`);
      return;
    }
    new URL(value);
    console.log(`${name}: VALID`);
  });
} catch (e) {
  console.error('URL Validation Error:', e.message);
}
