const TOTAL_CHAMPIONS = 162

export const getRandomChampion: (notTheSameOne?: number) => number = (notTheSameOne) => {
  const LolChampion = Math.floor(Math.random() * TOTAL_CHAMPIONS) + 1;
  if (LolChampion !== notTheSameOne) return LolChampion;
  return getRandomChampion(notTheSameOne);
}

export const getOptionsForVote = () => {
  const firstId = getRandomChampion();
  const secondId = getRandomChampion();

  return [firstId, secondId];
};