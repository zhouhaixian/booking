import dayjs from 'dayjs';
import { ScheduleSource } from '../types';
import Cell from './Cell';

interface ScheduleProps {
  data: ScheduleSource;
}

export default function Schedule(props: ScheduleProps) {
  const days = [...Array(7)].map((_, index) =>
    dayjs().startOf('date').add(index, 'day'),
  );
  const dayList = days.map((day, index) => {
    return (
      <th key={index}>
        <div>{day.format('YYYY年MM月DD日')}</div>
        <div>{day.format('dddd')}</div>
      </th>
    );
  });

  const start_times = Array.from(new Array(8), (_, index) =>
    // eslint-disable-next-line array-callback-return
    days.map((day) => {
      switch (index) {
        case 0:
          return day.set('hour', 8).set('minute', 0).set('second', 0);
        case 1:
          return day.set('hour', 8).set('minute', 50).set('second', 0);
        case 2:
          return day.set('hour', 10).set('minute', 0).set('second', 0);
        case 3:
          return day.set('hour', 10).set('minute', 50).set('second', 0);
        case 4:
          return day.set('hour', 14).set('minute', 10).set('second', 0);
        case 5:
          return day.set('hour', 15).set('minute', 5).set('second', 0);
        case 6:
          return day.set('hour', 15).set('minute', 55).set('second', 0);
        case 7:
          return day.set('hour', 16).set('minute', 45).set('second', 0);
      }
    }),
  );

  const rows = props.data.map((rowSource, index) => {
    const row = rowSource.map((record, index_) => (
      <td className="ant-picker-cell" key={`${index}, ${index_}`}>
        <div className="ant-picker-cell-inner ant-picker-calendar-date">
          <div className="ant-picker-calendar-date-value">
            第 {index + 1} 节
          </div>
          <div className="ant-picker-calendar-date-content">
            <Cell
              booked={record !== null}
              data={record}
              overdue={dayjs().isAfter(start_times[index][index_])}
            />
          </div>
        </div>
      </td>
    ));

    return <tr key={index}>{row}</tr>;
  });

  return (
    <div className="ant-picker-calendar ant-picker-calendar-full">
      <div tabIndex={0} className="ant-picker-panel">
        <div className="ant-picker-date-panel">
          <div className="ant-picker-body">
            <table className="ant-picker-content">
              <thead>
                <tr>{dayList}</tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
