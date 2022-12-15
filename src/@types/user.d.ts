interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  wins: number;
  winrate: number;
  rounds: number;
  maxStreak: number;
}
