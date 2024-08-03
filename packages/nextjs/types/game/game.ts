export interface Submission {
  player: string;
  word: string;
  timestamp: Date;
}

export interface Round {
  word: string;
  submissions: Submission[];
  winner?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Game {
  _id: string;
  hostAddress: string;
  status: "lobby" | "ongoing" | "paused" | "finished";
  inviteCode: string;
  players: string[];
  winner?: string;
  rounds: Round[];
  activeRoundIndex: number;
}
