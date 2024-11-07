import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <button
          className='bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded-lg'
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p></p>
      </div>
    </>
  );
}

export default App;
