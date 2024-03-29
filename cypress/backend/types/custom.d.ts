export type Movie = {
  id: string;
  name: string;
  score: number;
  poster?: string;
  createdBy: string;
};

export type UpdateMovie = {
  id: string;
  name?: string;
  score?: number;
  poster?: string;
  createdBy?: string;
};

export type User = {
  id: string;
  username: string;
  pass: string;
};
