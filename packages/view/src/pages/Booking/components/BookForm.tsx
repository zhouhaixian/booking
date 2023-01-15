import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { Subject, UserInfo } from '@booking/types';
import { AutoComplete, Button, Form, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import _ from 'lodash';
import { useModel } from '@umijs/max';

interface BookFormProps {
  overdue?: boolean;
  index: number;
  day: Dayjs;
  onFinish: (formData: any, day: Dayjs) => Promise<boolean>;
}

dayjs.extend(customParseFormat);

export default function BookForm(props: BookFormProps) {
  const { name } = useModel('@@initialState', (model) => {
    if (model.initialState !== undefined && model.initialState.user !== null) {
      return model.initialState.user as UserInfo;
    }
  }) as UserInfo;
  const [form] = Form.useForm();
  const format = 'HH:mm';
  const classSection = _.pickBy(
    {
      0: '第一节',
      1: '第二节',
      2: '第三节',
      3: '第四节',
      4: '第五节',
      5: '第六节',
      6: '第七节',
      7: '第八节',
    },
    (_, key) => parseInt(key) >= props.index,
  );
  const [indexValue, setIndexValue] = useState(undefined);
  const isValueNotEqualUndefined = useMemo(
    () => indexValue !== undefined,
    [indexValue],
  );
  const hours = Array.from(new Array(24), (_, index) => index);
  const miniutes = Array.from(new Array(12), (_, index) => index * 5);

  function handleFinish(formData: any) {
    return props.onFinish(formData, props.day);
  }

  useEffect(() => {
    let time = [] as any as [Dayjs, Dayjs];
    switch (props.index) {
      case 0:
        time = [dayjs('08:00', format), dayjs('08:40', format)];
        break;
      case 1:
        time = [dayjs('08:50', format), dayjs('09:30', format)];
        break;
      case 2:
        time = [dayjs('10:00', format), dayjs('10:40', format)];
        break;
      case 3:
        time = [dayjs('10:50', format), dayjs('11:30', format)];
        break;
      case 4:
        time = [dayjs('14:10', format), dayjs('14:50', format)];
        break;
      case 5:
        time = [dayjs('15:05', format), dayjs('15:45', format)];
        break;
      case 6:
        time = [dayjs('15:55', format), dayjs('16:35', format)];
        break;
      case 7:
        time = [dayjs('16:45', format), dayjs('17:25', format)];
        break;
    }

    form.setFieldsValue({ index: props.index.toString(), time });
    setIndexValue(form.getFieldValue('index'));
  });

  return (
    <ModalForm
      title="预约"
      form={form}
      trigger={
        <Button
          type="primary"
          style={{ position: 'relative', left: -6 }}
          disabled={props.overdue}
        >
          {props.overdue ? '已过期' : '预约'}
        </Button>
      }
      submitTimeout={5000}
      onFinish={handleFinish}
    >
      <ProForm.Group>
        <ProForm.Item
          name={'name'}
          rules={[
            {
              required: true,
              message: '授课教师不能为空！',
            },
            {
              pattern: /^[\s\S]{2,16}$/,
              message: '授课教师长度必须在2到16个字符之间',
            },
          ]}
          label="授课教师"
        >
          <AutoComplete
            options={[{ value: name }]}
            placeholder={'授课教师'}
            style={{ width: 100 }}
          />
        </ProForm.Item>
        <Input.Group compact>
          <ProForm.Item
            label="年级"
            name="grade"
            rules={[
              {
                required: true,
                message: '年级不能为空！',
              },
              {
                pattern: /^[\s\S]{2,16}$/,
                message: '年级长度必须在2到16个字符之间',
              },
            ]}
          >
            <AutoComplete
              options={[
                { value: '初一' },
                { value: '初二' },
                { value: '初三' },
                { value: '高一' },
                { value: '高二' },
                { value: '高三' },
              ]}
              style={{ width: 80 }}
              placeholder="年级"
            />
          </ProForm.Item>
          <ProFormDigit
            addonAfter="班"
            label="班级"
            name="class"
            rules={[
              {
                required: true,
                message: '班级不能为空！',
              },
            ]}
            min={1}
            fieldProps={{ precision: 0 }}
            placeholder="班级"
          />
        </Input.Group>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name={'subject'}
          valueEnum={Subject}
          placeholder="科目"
          rules={[{ required: true, message: '科目不能为空' }]}
          label="科目"
        />
        <ProFormTimePicker.RangePicker
          name="time"
          label="上课时间"
          tooltip="开始上课的时间: '时:分' -> 结束上课的时间: '时:分'"
          rules={[
            {
              required: true,
              message: '上课时间不能为空！',
            },
          ]}
          fieldProps={
            {
              minuteStep: 5,
              format,
              disabledTime: (now: Dayjs) => ({
                disabledHours: () =>
                  hours.filter((hour) =>
                    props.day
                      .set('hour', hour)
                      .set('minute', 59)
                      .set('second', 59)
                      .isBefore(now),
                  ),
                disabledMinutes: (hour: number) =>
                  miniutes.filter((minute) =>
                    props.day
                      .set('hour', hour)
                      .set('minute', minute)
                      .set('second', 59)
                      .isBefore(now),
                  ),
              }),
            } as any
          }
        />
        <ProFormSelect
          name="index"
          label="课节"
          tooltip="第几节课, 正常情况下不需要手动选择"
          valueEnum={classSection}
          placeholder="请选择课节"
          rules={[
            {
              required: true,
              message: '课节不能为空！',
            },
          ]}
          disabled={isValueNotEqualUndefined}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
