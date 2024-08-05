import React from "react";
import { Game } from "~~/types/game/game";

const Results = ({ game }: { game: Game }) => {
  return (
    <div className="p-6">
      <h1 className="flex justify-center text-2xl">Results</h1>

      {game.players.map(player => {
        return <h1 key={player}>{player}</h1>;
      })}
    </div>
  );
};

export default Results;
