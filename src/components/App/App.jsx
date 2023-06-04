import { useState } from 'react';
import styles from './styles.module.css';

export const App = () => {
  const [count, setCount] = useState(10);

  return (
    <>
      <div className={styles.main}></div>
      <h1>Megaman vs Samus</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>{/* Edit <code>src/App.jsx</code> */}</p>
      </div>
      <p className="read-the-docs">
        {/* Click on the Vite and React logos to learn more */}
      </p>
    </>
  );
};

// export default App;
