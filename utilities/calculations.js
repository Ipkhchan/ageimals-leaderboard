function calculateRankScore(wins, losses) {
  const score = (wins + 100 * 0.2) / (wins + losses + 100);
  return score;
}

module.exports = calculateRankScore;
