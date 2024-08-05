import React from "react";
import { Game } from "~~/types/game/game";

const Results = ({ game }: { game: Game }) => {
  return (
    <div className="p-6">
      <div className="flex flex-col justify-center">
        <h1 className="mx-auto text-2xl">Results</h1>

        {game?.winners &&
          game?.winners.map((winner, index) => {
            return (
              <h1 key={`${winner}_${index}`} className="mx-auto">
                The Round {index + 1} winner is {winner}
              </h1>
            );
          })}
      </div>
    </div>
  );
};

export default Results;
