import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    fetch('/api/expenses/total-spent')
      .then((res) => res.json())
      .then((data) => setTotalSpent(data.totalSpent));
  }, []);

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total amount you've spent.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{totalSpent}</p>
      </CardContent>
    </Card>
  );
}

export default App;
