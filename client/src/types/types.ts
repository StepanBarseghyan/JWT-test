export interface RegisterFields {
  name: string;
  surname: string;
  gender: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginFields {
  username: string;
  password: string;
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
