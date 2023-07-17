import {
  wait,
  magic,
  heal,
  attack,
  playerStats,
  opponentStats,
} from '../shared';
import { useEffect, useState } from 'react';

export const useBattleSequence = sequence => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);

  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(
    opponentStats.maxHealth
  );

  const [announcerMessage, setAnnouncerMessage] = useState('');

  const [playerAnimation, setPlayerAnimation] = useState('static');
  const [opponentAnimation, setOpponentAnimation] = useState('static');

  useEffect(() => {
    const { mode, turn } = sequence;

    if (mode) {
      const attacker = turn === 0 ? playerStats : opponentStats;
      const receiver = turn === 0 ? opponentStats : playerStats;

      switch (mode) {
        case 'attack': {
          const damage = attack({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('attack')
              : setOpponentAnimation('attack');
            await wait(100); // This is the animation delay for attack animations

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(1000);

            turn === 0
              ? setOpponentAnimation('damage')
              : setPlayerAnimation('damage');
            await wait(1000);

            turn === 0
              ? setOpponentAnimation('static')
              : setPlayerAnimation('static');
            setAnnouncerMessage(`${receiver.name} felt that!`);

            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(2000);

            setAnnouncerMessage(`Now it's the turn of ${receiver.name}!`);
            await wait(2500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'magic': {
          const damage = magic({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has cast a spell!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('magic')
              : setOpponentAnimation('magic');
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(1000);

            turn === 0
              ? setOpponentAnimation('damage')
              : setPlayerAnimation('damage');
            await wait(1000);

            turn === 0
              ? setOpponentAnimation('static')
              : setPlayerAnimation('static');
            setAnnouncerMessage(`${receiver.name} is dazed & confused!`);
            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(2500);

            setAnnouncerMessage(`Now it's the turn of ${receiver.name}!`);
            await wait(2500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'heal': {
          const recovered = heal({ receiver: attacker });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('magic')
              : setOpponentAnimation('magic');
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('static')
              : setOpponentAnimation('static');
            await wait(1000);

            setAnnouncerMessage(`${attacker.name} has recovered health!`);
            turn === 0
              ? setPlayerHealth(h =>
                  h + recovered <= attacker.maxHealth
                    ? h + recovered
                    : attacker.maxHealth
                )
              : setOpponentHealth(h =>
                  h + recovered <= attacker.maxHealth
                    ? h + recovered
                    : attacker.maxHealth
                ); // We don't want to set HP more than the max
            await wait(2500);

            setAnnouncerMessage(`Now it's the turn of ${receiver.name}!`);
            await wait(2500);

            setTurn(turn === 0 ? 1 : 0); //different in video
            setInSequence(false);
          })();

          break;
        }

        default:
          break;
      }
    }
  }, [sequence]);

  return {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
  };
};

/*

import {
  wait,
  magic,
  heal,
  attack,
  playerStats,
  opponentStats,
} from '../shared';
import { useEffect, useState, useCallback } from 'react';

const executeTurn = async (mode, attacker, receiver) => {
  switch (mode) {
    case 'attack':
      return attack({ attacker, receiver });

    case 'magic':
      return magic({ attacker, receiver });

    case 'heal':
      return heal({ receiver: attacker });

    default:
      return 0;
  }
};

export const useBattleSequence = sequence => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [choiceMade, setChoiceMade] = useState(false);
  const [sequenceEnded, setSequenceEnded] = useState(false);

  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(
    opponentStats.maxHealth
  );

  const [announcerMessage, setAnnouncerMessage] = useState('');
  const [playerAnimation, setPlayerAnimation] = useState('static');
  const [opponentAnimation, setOpponentAnimation] = useState('static');

  const handleBattleAction = useCallback(async () => {
    const attacker = turn === 0 ? playerStats : opponentStats;
    const receiver = turn === 0 ? opponentStats : playerStats;

    const mode =
      turn === 0 ? sequence.playerAction : sequence.opponentAction;

    setInSequence(true);
    setChoiceMade(false);

    setAnnouncerMessage(`${attacker.name} is choosing...`);
    await wait(1500);

    const damage = await executeTurn(mode, attacker, receiver);

    if (mode === 'heal') {
      setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
      setPlayerAnimation('magic');
      await wait(1000);
      setPlayerAnimation('static');
      await wait(500);
      setAnnouncerMessage(`${attacker.name} has recovered health!`);
      setPlayerHealth(h => Math.min(h + damage, attacker.maxHealth));
    } else {
      setAnnouncerMessage(`${attacker.name} has chosen to ${mode}!`);
      setPlayerAnimation(mode);
      await wait(1000);
      setPlayerAnimation('static');
      await wait(500);
      setOpponentAnimation('damage');
      await wait(750);
      setOpponentAnimation('static');
      setAnnouncerMessage(`${receiver.name} is dazed & confused!`);
      setOpponentHealth(h => Math.max(h - damage, 0));
    }

    await wait(1500);

    if (playerHealth === 0 || opponentHealth === 0) {
      setSequenceEnded(true);
    } else {
      setTurn(turn === 0 ? 1 : 0);
      setInSequence(false);
      setChoiceMade(true);
    }
  }, [sequence, turn, playerHealth, opponentHealth]);

  useEffect(() => {
    if (!inSequence && !sequenceEnded && choiceMade) {
      handleBattleAction();
    }
  }, [choiceMade, handleBattleAction, inSequence, sequenceEnded]);

  useEffect(() => {
    if (sequenceEnded) {
      setTurn(0);
      setInSequence(false);
      setChoiceMade(false);
      setSequenceEnded(false);
      setPlayerHealth(playerStats.maxHealth);
      setOpponentHealth(opponentStats.maxHealth);
      setAnnouncerMessage('');
      setPlayerAnimation('static');
      setOpponentAnimation('static');
    }
  }, [sequenceEnded]);

  return {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
    makeChoice: () => setChoiceMade(true),
  };
};
*/
