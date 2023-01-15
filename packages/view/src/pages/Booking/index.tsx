import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useState } from 'react';
import Schedule from './components/Schedule';
import './index.less';
import { ScheduleSource } from './types';

dayjs.locale('zh-cn');

export default function BookingPage() {
  const bookLimitMessage = useModel(
    'configs',
    (model) => model.config?.book_limit_message,
  );
  const bookingSuccessfulMessage = useModel(
    'configs',
    (model) => model.config?.booking_successful_message,
  );
  const [schedule, setSchedule] = useState(
    Array.from(new Array(8), () => new Array(7).fill(null)) as ScheduleSource,
  );

  const { schedule: record, createRecord } = useModel('records');
  record.forEach((record) => {
    const start_time = dayjs(record.start_time).startOf('date');
    const difference = start_time.diff(dayjs().startOf('date'), 'day');
    schedule[record.index][difference] = record;
  });

  async function submit(formData: any, day: Dayjs) {
    const payload = {
      ...formData,
      index: parseInt(formData.index),
      start_time: day
        .set('hour', formData.time[0].split(':')[0])
        .set('minute', formData.time[0].split(':')[1])
        .set('second', 0)
        .toDate(),
      end_time: day
        .set('hour', formData.time[1].split(':')[0])
        .set('minute', formData.time[1].split(':')[1])
        .set('second', 0)
        .toDate(),
    };

    try {
      const result = await createRecord(payload);
      if (result.code === 200) {
        setSchedule((schedule) => {
          const newSchedule = JSON.parse(JSON.stringify(schedule));
          newSchedule[payload.index][
            day.startOf('date').diff(dayjs().startOf('date'), 'day')
          ] = payload;
          return newSchedule;
        });
        message.success(bookingSuccessfulMessage);
      }
      return result.code === 200;
    } catch (error: any) {
      if (
        error.response.data.message === 'You can only book two lessons a week'
      ) {
        message.error(bookLimitMessage);
      }
      return false;
    }
  }

  return (
    <ProCard
      title="录播室预约时间登记表 (近七天) "
      headStyle={{ justifyContent: 'center' }}
    >
      <Schedule data={schedule} onFinish={submit} />
    </ProCard>
  );
}
