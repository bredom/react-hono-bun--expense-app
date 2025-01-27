import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
//message for zod schema if title is less than 3 characters

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const postSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: 'Groceries', amount: 100 },
  { id: 2, title: 'Rent', amount: 1200 },
  { id: 3, title: 'Utilities', amount: 200 },
];

export const expensesRoute = new Hono()
  .get('/', (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post(
    '/',
    zValidator('json', postSchema, (result, c) => {
      if (!result.success) {
        console.log(result.error);
        return c.json({ error: result.error.message }, 400);
      }
    }),
    async (c) => {
      const data = await c.req.valid('json');
      const expense = postSchema.parse(data);
      fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });

      return c.json({ expense });
    }
  )
  .get('/total-spent', async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const totalSpent = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ totalSpent });
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number(c.req.param('id'));

    const expense = fakeExpenses.find((expense) => expense.id === id);

    if (!expense) {
      return c.json({ error: 'Expense not found' }, 404);
    }

    return c.json({ expense }, 200);
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const index = fakeExpenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];

    return c.json({ deletedExpense });
  });
