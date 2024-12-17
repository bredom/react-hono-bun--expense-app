import app from './app';

Bun.serve({
  port: process.env.PORT || 3000,
  fetch: app.fetch,
});

console.log('Listening on http://localhost:3000');
