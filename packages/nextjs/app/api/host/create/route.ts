import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import doodleConfig from "~~/doodle.config";
import connectdb from "~~/lib/db";
import Game from "~~/lib/models/Game";
import Invites from "~~/lib/models/Invites";
import { getWord } from "~~/app/getWord";

const ROUND_COUNT = 5;

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || doodleConfig.jwt_secret);

async function generateUniqueInvite(length: number) {
  let invites = await Invites.findOne();

  if (!invites) {
    const newInvites = new Invites({
      codes: [],
    });
    invites = await newInvites.save();
  }

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let invite = "";
  const existingCodes = invites?.codes || [];

  while (true) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      invite += characters.charAt(randomIndex);
    }

    if (!existingCodes.includes(invite)) {
      existingCodes.push(invite);
      await Invites.findByIdAndUpdate(invites?.id, {
        codes: existingCodes,
      });
      return invite;
    }

    invite = "";
  }
}

export const GET = async () => {
  try {
    await connectdb();
    const games = await Game.find();
    return new NextResponse(JSON.stringify(games), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching game " + error, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    console.log("yooooo");

    const body = await request.json();
    const { hostAddress } = body;

    await connectdb();

    const rounds = [];
    for (let i = 0; i < ROUND_COUNT; i++) {
      const word = (await getWord()).success;
      rounds.push({ word });
    }

    const newGame = new Game({
      hostAddress,
      status: "lobby",
      inviteCode: await generateUniqueInvite(8),
      rounds,
    });

    await newGame.save();

    let token;

    if (JWT_SECRET) {
      token = await new SignJWT({ address: hostAddress }).setProtectedHeader({ alg: "HS256" }).sign(JWT_SECRET);
    }

    return new NextResponse(JSON.stringify({ message: "New game created", token, game: newGame }), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Error Creating Game " + (error as Error).message,
      }),
      {
        status: 500,
      },
    );
  }
};
