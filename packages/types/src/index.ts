export enum Subject {
  语文 = '语文',
  数学 = '数学',
  英语 = '英语',
  物理 = '物理',
  历史 = '历史',
  化学 = '化学',
  政治 = '政治',
  生物 = '生物',
  地理 = '地理',
  信息技术 = '信息技术',
  体育 = '体育',
  美术 = '美术',
  音乐 = '音乐',
  日语 = '日语',
  通用技术 = '通用技术',
  综合实践 = '综合实践',
  心理健康 = '心理健康',
  书法 = '书法',
  会议 = '会议',
  其他 = '其他',
}

export enum Sex {
  男 = '男',
  女 = '女',
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export type UserInfo = {
  id: string;
  name: string;
  sex: Sex;
  subjects: Subject[];
  role: Role;
};

export interface Record {
  name: string;
  grade: string;
  class: string;
  subject: Subject;
  index: number;
  id: string;
  start_time: Date;
  end_time: Date;
  create_at: Date;
}
