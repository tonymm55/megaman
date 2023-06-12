import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { BattleAnnouncer, BattleMenu, PlayerSummary } from 'components';
import { opponentStats, playerStats } from '../../shared';

export const Battle = () => {
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(
    opponentStats.maxHealth
  );
  const [announcerMessage, setAnnouncerMessage] = useState('');

  return (
    <>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxHealth={opponentStats.maxHealth}
          />
        </div>

        <div className={styles.characters}>
          <div className={styles.gameHeader}>
            {playerStats.name} vs {opponentStats.name}
          </div>

          <div className={styles.gameImages}>
            <div className={styles.playerSprite}></div>
            <img alt={playerStats.name} src={playerStats.img} />

            <div className={styles.opponentSprite}></div>
            <img alt={opponentStats.name} src={opponentStats.img} />
          </div>
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

        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleAnnouncer
              message={
                announcerMessage || `What will ${playerStats.name} do?`
              }
            />
          </div>

          <div className={styles.hudChild}>
            <BattleMenu
              onAttack={() => console.log('Attack!')}
              onMagic={() => console.log('Magic!')}
              onHeal={() => console.log('Heal!')}
            />
          </div>
        </div>
      </div>
    </>
  );
};
