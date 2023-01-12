import { Record } from '@booking/types';
import { Button, Typography } from 'antd';
import dayjs from 'dayjs';

interface CellProps {
  booked: boolean;
  data: Record;
  overdue?: boolean;
}

export default function Cell(props: CellProps) {
  return (
    <>
      {props.booked ? (
        <>
          <div>
            <Typography.Text type="success">
              {props.data.subject}
            </Typography.Text>
            <Typography.Text> - </Typography.Text>
            <Typography.Link> {props.data.name}</Typography.Link>
          </div>
          <div>
            <Typography.Text>授课班级: </Typography.Text>
            <Typography.Text code>
              <Typography.Text>{props.data.grade}</Typography.Text>
              <Typography.Text> {props.data.class} 班</Typography.Text>
            </Typography.Text>
          </div>
          <div>
            <Typography.Text>上课时间: </Typography.Text>
            <Typography.Text>
              {dayjs(props.data.start_time).format('HH:mm')}
            </Typography.Text>
            <Typography.Text> - </Typography.Text>
            <Typography.Text>
              {dayjs(props.data.end_time).format('HH:mm')}
            </Typography.Text>
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '95%',
          }}
        >
          <Button
            type="primary"
            style={{ position: 'relative', left: -6 }}
            disabled={props.overdue}
          >
            {props.overdue ? '已过期' : '预约'}
          </Button>
        </div>
      )}
    </>
  );
}
