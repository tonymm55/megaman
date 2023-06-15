import styles from './styles.module.css';

export const EndMenu = ({ winner, onStartClick }) => {
  return (
    <div className={styles.main}>
      <h1>{winner.name} is the Winner!!!</h1>
      <button className={styles.startButton} onClick={onStartClick}>
        Play Again
      </button>
    </div>
  );
};
