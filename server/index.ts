import app from './app';

Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log('Listening on http://localhost:3000');
