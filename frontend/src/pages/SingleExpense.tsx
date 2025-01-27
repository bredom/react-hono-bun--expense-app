import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { useParams } from 'react-router-dom';
import Spinner from '@/components/Spinner';

async function getSingleExpense(id: string) {
  const res = await api.expenses[':id{[0-9]+}'].$get({
    param: { id },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch expense');
  }

  // const data = (await res.json()) as { expense: ExpenseData };
  const data = await res.json();
  return data.expense;
}

function SingleExpense() {
  const { id } = useParams<{ id: string }>();

  const { isPending, data, error } = useQuery({
    queryKey: ['singleExpense', id],
    queryFn: () => getSingleExpense(id!),
    enabled: !!id,
  });

  if (error) return error.message;

  return (
    <Card className='w-[350px]'>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <CardHeader>
            <CardTitle>Expense: {data?.title}</CardTitle>
            <CardDescription>Total amount you've spent.</CardDescription>
          </CardHeader>
          <CardContent>{data?.amount}</CardContent>
        </>
      )}
    </Card>
  );
}

export default SingleExpense;

/* export const singleExpenseLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Error('Expense ID is required');
  }

  const res = await api.expenses[':id{[0-9]+}'].$get({
    param: { id: params.id },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch total spent');
  }
  const data = await res.json();
  return data;
}; */

/*   const { expense: { title, amount }} = useLoaderData() as { expense: ExpenseData }; */
