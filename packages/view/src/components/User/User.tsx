import { useAccess } from '@umijs/max';
import { Avatar, Badge, Typography } from 'antd';
import React from 'react';
import './User.less'

export default function User(props: { name: string; logout: () => any }) {
  const access = useAccess();

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Badge dot={access.isAdmin} offset={[-5, 10]}>
          <Avatar style={{ backgroundColor: '#1890ff', margin: '0.4rem' }}>
            {props.name.substring(0, 1)}
          </Avatar>
        </Badge>
        <Typography.Text
          style={{
            fontSize: '1rem',
          }}
        >
          {props.name}
        </Typography.Text>
      </div>
      <Typography.Link style={{ margin: '0.4rem' }} onClick={props.logout}>
        退出登录
      </Typography.Link>
    </>
  );
}
