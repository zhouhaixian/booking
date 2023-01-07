import { Sex, Subject } from '@booking/types'

export type LoginPayload = {
  id: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  id: string;
  password: string;
  sex: Sex;
  subjects: Subject[];
};
