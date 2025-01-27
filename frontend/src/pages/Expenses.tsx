import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import TradingViewChart from '@/components/TradingViewChart';

async function getTotalSpent() {
  const res = await api.expenses['total-spent'].$get();

  if (!res.ok) {
    throw new Error('Failed to fetch total spent');
  }
  const data = await res.json();
  return data;
}

function Expenses() {
  const { isPending, data, error } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  });

  if (error) return error.message;

  if (isPending) return '...';

  return (
    <>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Total amount you've spent.</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? '...' : data.totalSpent}</CardContent>
      </Card>
      <TradingViewChart />
    </>
  );
}

export default Expenses;
