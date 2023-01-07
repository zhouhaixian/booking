import { request, useRequest } from '@umijs/max';

type Config = {
  booking_successful_message: string;
  forgot_password_message: string;
};

export default () => {
  const path = '/configs';
  // 如果 api 出错，data 为 undefined
  let { data } = useRequest(path) as { data: Config | null | undefined };

  async function setConfig(config: Config) {
    if (data === null || data === undefined) {
      data = (await request(path, { method: 'POST', data: config })).data;
    } else {
      data = (await request(path, { method: 'PATCH', data: config })).data;
    }
  }

  return { config: data, setConfig };
};
