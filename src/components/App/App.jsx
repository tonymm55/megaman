import { useState } from 'react';
import styles from './styles.module.css';
import { StartMenu } from 'components';
import { Battle } from 'components';
// import { GameOver } from 'components';

export const App = () => {
  const [mode, setMode] = useState('start'); // on init we want to be in the start state

  return (
    <>
      <div className={styles.main}>
        {mode === 'start' && (
          <StartMenu onStartClick={() => setMode('battle')} />
        )}

        {mode === 'battle' && <Battle />}

        {mode === 'gameOver' && <>Game Over </>}
      </div>
      {/* <h1>Megaman vs Samus</h1> */}
      <div className="reserved"></div>
    </>
  );
};

// export default App;
// mode is the game state for battle, start and game over
