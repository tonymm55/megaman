import { PlayerSummary } from 'components';
import { useState } from 'react';
import { opponentStats, playerStats } from '../../shared/characters';
import styles from './styles.module.css';
import { BattleMenu } from '../BattleMenu/BattleMenu';

export const Battle = () => {
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(
    opponentStats.maxHealth
  );

  return (
    <div className={styles.main}>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxHealth={opponentStats.maxHealth}
          />
        </div>
      </div>
      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main
            health={playerHealth}
            name={playerStats.name}
            level={playerStats.level}
            maxHealth={playerStats.maxHealth}
          />
        </div>
      </div>

      <div className={styles.hudChild}>
        <BattleMenu
          onAttack={() => console.log('Attack!')}
          onMagic={() => console.log('Magic!')}
          onHeal={() => console.log('Heal!')}
        />
      </div>
    </div>
  );
};
