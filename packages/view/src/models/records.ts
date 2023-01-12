import { useRequest } from '@/.umi/plugin-request';
import { request } from '@umijs/max';
import { Record } from '@booking/types';

export default () => {
  const path = '/records/schedule';
  const { data } = useRequest(path) as { data: Record[] | undefined };

  function createRecord(record: Record) {
    return request(path, { method: 'POST', data: record });
  }

  return { record: data ?? [], createRecord };
};
