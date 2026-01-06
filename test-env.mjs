import { URL } from 'node:url';

const variables = [
  'AUTH0_SECRET',
  'AUTH0_BASE_URL',
  'AUTH0_ISSUER_BASE_URL',
  'AUTH0_DOMAIN',
  'AUTH0_CLIENT_ID',
  'AUTH0_CLIENT_SECRET'
];

console.log('--- Env Check ---');
variables.forEach(v => {
  console.log(`${v}: ${process.env[v] ? 'LOADED' : 'MISSING'}`);
});

try {
  new URL(process.env.AUTH0_BASE_URL || '');
  new URL(process.env.AUTH0_ISSUER_BASE_URL || '');
  console.log('URLs are valid');
} catch (e) {
  console.error('URL Validation Error:', e.message);
}
