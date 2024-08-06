import { Game, Submission } from "~~/types/game/game";

export const getPlayerSubmission = (game: Game, player: string, roundIndex: number = game.activeRoundIndex) => {
  const submission = game.rounds[roundIndex].submissions.find(submission => submission.player === player);

  return submission?.word || null;
};

export const getRoundWinner = (game: Game, roundIndex: number = game.activeRoundIndex) => {
  const submissions = game.rounds[roundIndex].submissions;

  let winningSubmission: Submission | undefined = undefined;

  submissions.forEach(submission => {
    if (submission.word === game.rounds[roundIndex].word) {
      if (!winningSubmission) {
        winningSubmission = submission;
      } else if (submission.timestamp < winningSubmission.timestamp) {
        winningSubmission = submission;
      }
    }
  });

  if (!winningSubmission) {
    return null;
  }

  return (winningSubmission as Submission).player;
};

export const getGameWinner = (game: Game) => {
  const playerWins: { [key: string]: number } = {};

  game.rounds.forEach((_, roundIndex) => {
    const roundWinner = getRoundWinner(game, roundIndex);
    if (roundWinner) {
      if (!playerWins[roundWinner]) {
        playerWins[roundWinner] = 0;
      }
      playerWins[roundWinner]++;
    }
  });

  let gameWinner: string | null = null;
  let maxWins = 0;

  for (const player in playerWins) {
    if (playerWins[player] > maxWins) {
      maxWins = playerWins[player];
      gameWinner = player;
    }
  }

  return gameWinner;
};
