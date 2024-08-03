import { Game, Submission } from "~~/types/game/game";

export const getPlayerSubmission = (game: Game, player: string) => {
  const submission = game.rounds[game.activeRoundIndex].submissions.find(submission => submission.player === player);

  return submission?.word || null;
};

export const getRoundWinner = (game: Game, roundIndex: number) => {
    const submissions = game.rounds[game.activeRoundIndex].submissions;
  
    let winningSubmission : Submission | undefined = undefined;

    submissions.forEach(submission => {
      if (submission.word === game.rounds[game.activeRoundIndex].word) {
        if (!winningSubmission) {
          winningSubmission = submission;
        }
        else if (submission.timestamp < winningSubmission.timestamp) {
          winningSubmission = submission;
        }
      }
    });

    if (!winningSubmission) {
        return null
    }

    return winningSubmission.player;
  };