export const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export const attack = ({ attacker, receiver }) => {
  const receivedDamage =
    attacker.attack - (attacker.level - receiver.level) * 1.25;

  const finalDamage = receivedDamage - receiver.defence / 2;

  return finalDamage;
};
export const magic = ({ attacker, receiver }) => {
  const receivedDamage =
    attacker.magic - (attacker.level - receiver.level) * 1.25;

  const finalDamage = receivedDamage - receiver.magicDefence / 2;

  return finalDamage;
};
export const heal = ({ receiver }) => {
  return receiver.magic + receiver.level * 0.25;
};
