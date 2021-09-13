export interface User {
  id: number | null;
  email: string | null;
  nickname: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Room {
  id: number | null;
  name: string | null;
  members: Array<User> | null;
}

export interface Rooms {
  rooms: Array<Room>;
}

export interface UserState {
  user: User;
  room: Array<Room>;
}
