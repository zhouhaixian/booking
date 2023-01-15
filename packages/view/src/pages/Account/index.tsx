import { useModel } from '@umijs/max';
import { UserOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';
import {
  ProFormText,
  ProFormSelect,
  ProCard,
  ProForm,
  ModalForm,
} from '@ant-design/pro-components';
import { Sex, Subject } from '@booking/types';
import React from 'react';
import { Button, Divider, message, Space, Typography } from 'antd';

export default function AccountPage() {
  const user = useModel(
    '@@initialState',
    (model) => model.initialState?.user,
  ) as any;
  const update = useModel(
    '@@initialState',
    (model) => model.initialState?.update,
  ) as any;
  const logout = useModel(
    '@@initialState',
    (model) => model.initialState?.logout,
  ) as any;
  const deleteAccount = useModel(
    '@@initialState',
    (model) => model.initialState?.deleteAccount,
  ) as any;

  async function submit(values: any) {
    update(user.id, values);
    setTimeout(() => {
      window.location.reload();
    }, 200);
    return true;
  }

  function reset(values: any) {
    return update(user.id, values);
  }

  return (
    <ProCard title="账号信息">
      <ProForm
        initialValues={user as any}
        onFinish={submit}
        onReset={reset}
        submitter={{
          searchConfig: {
            submitText: '修改',
          },
        }}
      >
        <ProForm.Group>
          <ProFormText
            name={'name'}
            placeholder={'姓名'}
            label={'姓名'}
            fieldProps={{
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
            allowClear={false}
          />
          <ProFormSelect
            name={'sex'}
            valueEnum={Sex}
            placeholder="性别"
            rules={[{ required: true, message: '请选择您的性别!' }]}
            allowClear={false}
            label={'性别'}
          />
          <ProFormSelect
            name={'subjects'}
            valueEnum={Subject}
            fieldProps={{
              mode: 'multiple',
            }}
            placeholder="任教科目"
            rules={[{ required: true, message: '请选择您任教的科目!' }]}
            allowClear={false}
            label={'任教科目'}
          />
        </ProForm.Group>
      </ProForm>
      <Divider />
      <Space wrap>
        <ModalForm
          title="修改密码"
          trigger={
            <Button type="primary" danger>
              修改密码
            </Button>
          }
          modalProps={{
            destroyOnClose: true,
          }}
          onFinish={async (values) => {
            if (values.password !== values['password-repeat']) {
              message.error('两次输入的密码不一致！');
              return false;
            }
            update(user.id, {
              password: values.password,
            });
            message.success('修改成功！请重新登录！');
            logout();
            setTimeout(() => {
              window.location.reload();
            }, 200);
          }}
        >
          <ProFormText.Password
            name={'password'}
            placeholder={'新密码'}
            label={'新密码'}
            fieldProps={{
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
            label={'确认密码'}
            fieldProps={{
              prefix: <LockOutlined className="prefixIcon" />,
            }}
            rules={[
              {
                required: true,
                message: '请再次输入密码！',
              },
            ]}
          />
        </ModalForm>
        <ModalForm
          title="修改手机号"
          trigger={
            <Button type="primary" danger>
              修改手机号
            </Button>
          }
          modalProps={{
            destroyOnClose: true,
          }}
          onFinish={async (values) => {
            if (values.id !== values['id-repeat']) {
              message.error('两次输入的手机号不一致！');
              return false;
            }
            update(user.id, {
              id: values.id,
            });
            message.success('修改成功！请重新登录！');
            logout();
            setTimeout(() => {
              window.location.reload();
            }, 200);
          }}
        >
          <ProFormText
            name={'id'}
            placeholder={'新手机号'}
            label={'新手机号'}
            fieldProps={{
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            rules={[
              {
                required: true,
                message: '手机号不能为空！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
            allowClear={false}
          />
          <ProFormText
            name={'id-repeat'}
            placeholder={'确认新手机号'}
            label={'确认新手机号'}
            fieldProps={{
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            rules={[
              {
                required: true,
                message: '手机号不能为空！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
            allowClear={false}
          />
        </ModalForm>
        <ModalForm
          title="注销账号"
          trigger={
            <Button type="primary" danger>
              注销账号
            </Button>
          }
          modalProps={{
            destroyOnClose: true,
          }}
          onFinish={async (values) => {
            if (values.id !== user.id) {
              message.error('手机号错误！');
              return false;
            }
            deleteAccount(user.id);
            message.success('注销成功！');
            logout();
            setTimeout(() => {
              window.location.reload();
            }, 200);
          }}
        >
          <div>
            <Typography.Text type="danger" strong>
              <div>确定注销账号吗？</div>
              注销账号
              <Typography.Text type="danger" strong mark>
                并不会
              </Typography.Text>
              删除与您有关的预约记录，但您将无法再使用该账号登录。
            </Typography.Text>
          </div>
          <Typography.Text type="danger" strong>
            如果确定的话，请在下方输入您的手机号，并点击“确定“按钮
          </Typography.Text>
          <ProFormText
            name={'id'}
            rules={[
              {
                required: true,
                message: '手机号不能为空！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
            allowClear={false}
          />
        </ModalForm>
      </Space>
    </ProCard>
  );
}
