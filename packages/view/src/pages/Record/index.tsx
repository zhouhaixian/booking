import { Access, useAccess } from '@umijs/max';
import React from 'react';
import AdminRecordPane from './components/AdminRecordPane';
import RecordPane from './components/RecordPane';
import './index.less';

export default function Page() {
  const { isAdmin } = useAccess();
  return (
    <Access accessible={isAdmin} fallback={<RecordPane />}>
      <AdminRecordPane />
    </Access>
  );
}
