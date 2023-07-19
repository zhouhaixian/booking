import { LoginPayload, RegisterPayload } from '@/types';

export type Action = 'login' | 'register';

export type LoginData = LoginPayload;

export type RegisterData = {
  'password-repeat'?: string;
} & RegisterPayload;
