import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Root from './Root.tsx';
import About from './pages/About.tsx';
import Expenses from './pages/Expenses.tsx';
import Home from './pages/Home.tsx';
import SingleExpense from './pages/SingleExpense.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='expenses' element={<Expenses />} />
        <Route path='expenses/:id' element={<SingleExpense />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
