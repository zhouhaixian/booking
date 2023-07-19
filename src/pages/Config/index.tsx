import React from 'react';
import { ProCard, ProForm } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import ConfigPane from '../../components/ConfigPane';

export default function Page() {
  const { config, setConfig } = useModel('configs');

  return (
    <ProCard title="配置中心">
      <ProForm
        initialValues={config as any}
        onFinish={setConfig}
        onReset={setConfig as any}
      >
        <ConfigPane />
      </ProForm>
    </ProCard>
  );
}
