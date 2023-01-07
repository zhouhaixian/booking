import { Sex, Subject } from "@booking/types";

export const TITLE = "录播室预约管理系统";
export const SCHOOL = "海丰县实验中学";
export const SEXS = Object.values(Sex);
export const SUBJECTS = Object.values(Subject);

export const API_PORT = 3000;
export const API_DOMAIN = `http://localhost:${API_PORT}`;
export const SWAGGER_PATH = "swagger";
export const DATABASE_URL = "mongodb://127.0.0.1:27017/recording-studio";
export const JWT_SECRET = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsgDq4O";