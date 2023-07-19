export type LoginPayload = {
  phone: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  id: string;
  password: string;
  sex: Sex;
  subjects: string;
};

export enum Sex {
  男 = 'MALE',
  女 = 'FEMALE',
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type UserInfo = {
  id: string;
  name: string;
  sex: Sex;
  subjects: string;
  role: Role;
};

export interface Record {
  name: string;
  grade: string;
  class: string;
  subject: string;
  index: number;
  id: string;
  start_time: Date;
  end_time: Date;
  create_at: Date;
}
