import { QuestionCircleOutlined } from '@ant-design/icons';
import { Record } from '../../../types';
import { useAccess, useModel } from '@umijs/max';
import { Button, Popconfirm, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import BookForm from './BookForm';

interface CellProps {
  booked: boolean;
  data: Record;
  overdue?: boolean;
  index: number;
  day: Dayjs;
  onFinish: (formData: any, day: Dayjs) => Promise<boolean>;
}

export default function Cell(props: CellProps) {
  const { user } = useModel(
    '@@initialState',
    (model) => model.initialState,
  ) as any;
  const { isAdmin } = useAccess();
  const canCancel = isAdmin || user.id === props.data?.id;
  const deleteRecord = useModel('records', (model) => model.deleteRecord);
  function cancel() {
    deleteRecord(props.data);
    setTimeout(() => window.location.reload(), 200);
  }

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
          {canCancel && !props.overdue && (
            <Popconfirm
              title="确定要取消预约吗?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={cancel}
            >
              <Button
                size="small"
                type="primary"
                style={{ position: 'absolute', right: '5px', bottom: '0.5px' }}
                danger
              >
                取消
              </Button>
            </Popconfirm>
          )}
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
          <BookForm
            index={props.index}
            overdue={props.overdue}
            onFinish={props.onFinish}
            day={props.day}
          />
        </div>
      )}
    </>
  );
}
