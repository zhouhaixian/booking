import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Schedule from './components/Schedule';
import './index.less';
import { ScheduleSource } from './types';

dayjs.locale('zh-cn');

export default function BookingPage() {
  const schedule = Array.from(new Array(8), () =>
    new Array(7).fill(null),
  ) as ScheduleSource;

  const { record } = useModel('records');
  record.forEach((record) => {
    const start_time = dayjs(record.start_time).startOf('date');
    const difference = start_time.diff(dayjs().startOf('date'), 'day');
    schedule[record.index][difference] = record;
  });

  return (
    <ProCard
      title="录播室预约时间登记表 (近七天) "
      headStyle={{ justifyContent: 'center' }}
    >
      <Schedule data={schedule} />
    </ProCard>
  );
}
