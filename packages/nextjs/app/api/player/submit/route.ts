import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import doodleConfig from "~~/doodle.config";
import Game from "~~/lib/models/Game";
import { ablyRealtime } from "~~/lib/socket";
import { time } from "console";

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { id, playerAddress, roundIndex, word } = body;
    const game = await Game.findById(id);

    if (!game || id.length == 0) {
      return new NextResponse(JSON.stringify({ error: "Game doesn't existtttt", id }), { status: 403 });
    }

    if (playerAddress == null) {
      return new NextResponse(JSON.stringify({ error: "Player address is null " }), { status: 403 });
    }

    game.rounds[roundIndex].submissions.push({ player: playerAddress, word, timestamp: new Date() });

    const savedGame = await game.save();

    const channel = ablyRealtime.channels.get(`gameUpdate`);
    channel.publish(`gameUpdate`, savedGame);
    return new NextResponse(JSON.stringify({ message: "Word submitted successfully", game: savedGame }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Error Joining Game " + (error as Error).message,
      }),
      {
        status: 500,
      },
    );
  }
};
