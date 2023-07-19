import { Sex } from '../../types';
import {
  MobileOutlined,
  LockOutlined,
  UserOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';

export default function RegisterPane() {
  return (
    <>
      <ProFormText
        name={'name'}
        placeholder={'姓名'}
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className="prefixIcon" />,
        }}
        rules={[
          {
            required: true,
            message: '姓名不能为空！',
          },
          {
            pattern: /^[\s\S]{2,16}$/,
            message: '姓名长度必须在2到16个字符之间',
          },
        ]}
      />
      <ProFormText
        name={'id'}
        placeholder={'手机号'}
        fieldProps={{
          size: 'large',
          prefix: <MobileOutlined className="prefixIcon" />,
        }}
        rules={[
          {
            required: true,
            message: '手机号不能为空！',
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式错误！',
          },
        ]}
      />
      <ProFormText.Password
        name={'password'}
        placeholder={'密码'}
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className="prefixIcon" />,
        }}
        rules={[
          {
            required: true,
            message: '密码不能为空！',
          },
          {
            pattern: /^[\s\S]{8,25}$/,
            message: '密码长度必须在8到25个字符之间',
          },
        ]}
      />
      <ProFormText.Password
        name={'password-repeat'}
        placeholder={'确认密码'}
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className="prefixIcon" />,
        }}
        rules={[
          {
            required: true,
            message: '请再次输入密码！',
          },
        ]}
      />
      <ProFormSelect
        name={'sex'}
        valueEnum={Sex}
        placeholder="性别"
        rules={[{ required: true, message: '请选择您的性别!' }]}
      />
      <ProFormText
        name={'subject'}
        placeholder={'姓名'}
        fieldProps={{
          size: 'large',
          prefix: <SolutionOutlined className="prefixIcon" />,
        }}
        rules={[
          {
            required: true,
            message: '任教科目不能为空！',
          },
          {
            pattern: /^[\s\S]{2,16}$/,
            message: '科目长度必须在2到16个字符之间',
          },
        ]}
      />
    </>
  );
}
