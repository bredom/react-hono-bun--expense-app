import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRoute } from './routes/expenses';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.text('Hello, World!');
});

app.get('/posts', (c) => {
  return c.json({
    posts: 'post',
  });
});

app.route('/api/expenses', expensesRoute);

export default app;
