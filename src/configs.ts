import { Sex } from './types';

export const TITLE = '录播室预约管理系统';
export const SCHOOL = '海丰县实验中学';
export const SEXS = Object.values(Sex);

export const API_PORT = 8080;
export const API_DOMAIN = `http://localhost:${API_PORT}/api`;
export const SWAGGER_PATH = 'swagger';
export const DATABASE_URL = 'mongodb://127.0.0.1:27017/booking';
export const JWT_SECRET = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsgDq4O';
