import { saveGameState } from "../game";
import { notification } from "~~/utils/scaffold-eth";

export const joinGame = async (invite: string, address: string) => {
  console.log("joinGame", invite, address);

  const response = await fetch("/api/player/join", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inviteCode: invite, playerAddress: address }),
  });

  const updatedGame = await response.json();
  console.log("updatedGame", updatedGame);

  if (updatedGame.error) {
    notification.error(updatedGame.error);
    return { success: false };
  }

  saveGameState(JSON.stringify(updatedGame));
  return { success: true };
};

export const submitWord = async (id: string, playerAddress: string, roundIndex: number, word: string) => {
  const response = await fetch("/api/player/submit", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, playerAddress, roundIndex, word }),
  });

  const updatedGame = await response.json();
  console.log("updatedGame", updatedGame);

  if (updatedGame.error) {
    notification.error(updatedGame.error);
    return { success: false };
  }

  saveGameState(JSON.stringify(updatedGame));
  return { success: true };
};

export const updateGameStatus = async (id: string, newStatus: string, token: string) => {
  const response = await fetch("/api/host/updategamestatus", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, newStatus: newStatus }),
  });

  const updatedGame = await response.json();

  if (updatedGame.error) {
    notification.error(updatedGame.error);
    return;
  }

  notification.success(`Game ${newStatus}`);
};

export const updateGameRound = async (id: string, token: string) => {
  const response = await fetch("/api/host/updateround", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });

  const updatedGame = await response.json();

  if (updatedGame.error) {
    notification.error(updatedGame.error);
    return;
  }

  notification.success("Next Round Started");
};
