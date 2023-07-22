export type LoginPayload = {
  phone: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  phone: string;
  password: string;
  sex: Gender;
  subjects: string;
};

export enum Gender {
  MALE = '男',
  FEMALE = '女',
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type UserInfo = {
  id: string;
  name: string;
  sex: Gender;
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
