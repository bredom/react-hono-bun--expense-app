import { Link, Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <header className='shadow-sm'>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16 items-center'>
            <div className='flex space-x-8'>
              <Link
                to='/'
                className='text-gray-400 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium'
              >
                Home
              </Link>
              <Link
                to='/about'
                className='text-gray-400 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium'
              >
                About
              </Link>
              <Link
                to='/expenses'
                className='text-gray-400 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium'
              >
                Expenses
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
