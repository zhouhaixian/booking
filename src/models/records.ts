import { useRequest } from '@/.umi/plugin-request';
import { request } from '@umijs/max';
import { Record } from '../types';

export default () => {
  const path = '/record';
  const { data: schedule } = useRequest(path.concat('/schedule')) as {
    data: Record[] | undefined;
  };

  function createRecord(record: Record) {
    return request(path, { method: 'POST', data: record });
  }

  function deleteRecord(record: Record) {
    return request(path, { method: 'DELETE', data: record });
  }

  return { schedule: schedule ?? [], createRecord, deleteRecord };
};
