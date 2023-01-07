import { ProFormText } from '@ant-design/pro-components';

export default function ConfigPane() {
  return (
    <>
      <ProFormText
        name={'booking_successful_message'}
        label={'预约成功提示信息'}
        tooltip={'用户预约成功后弹窗提示的信息'}
        rules={[
          {
            required: true,
            message: '此项为必填项',
          },
          {
            pattern: /^[\s\S]{2,256}$/,
            message: '信息长度必须在2到256个字符之间',
          },
        ]}
        allowClear={false}
      />
      <ProFormText
        name={'forgot_password_message'}
        label={'忘记密码提示信息'}
        tooltip={'用户点击登录界面"忘记密码"后弹窗提示的信息'}
        rules={[
          {
            required: true,
            message: '此项为必填项',
          },
          {
            pattern: /^[\s\S]{2,256}$/,
            message: '信息长度必须在2到256个字符之间',
          },
        ]}
        allowClear={false}
      />
    </>
  );
}
