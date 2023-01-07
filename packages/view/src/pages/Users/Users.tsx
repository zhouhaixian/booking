import { request } from '@umijs/max';
import { Role, Sex, Subject } from '@booking/types';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import _ from 'lodash';
import { Button, message } from 'antd';
import { ExportOutlined, PrinterOutlined } from '@ant-design/icons';
import XLSX from 'xlsx-js-style';
import './Users.less';

type DataSourceType = {
  name: string;
  id: string;
  password?: string;
  sex: Sex;
  role: Role;
  subjects: Subject[];
  create_at: string;
  update_at: string;
};

const columns: ProColumns<DataSourceType>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    tooltip: '用户的姓名',
    copyable: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
        {
          pattern: /^[\s\S]{2,16}$/,
          message: '姓名长度必须在2到16个字符之间',
        },
      ],
    },
  },
  {
    title: '手机号',
    dataIndex: 'id',
    tooltip: '用户的手机号',
    copyable: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
        {
          pattern: /^1\d{10}$/,
          message: '手机号格式错误',
        },
      ],
    },
  },
  {
    title: '密码',
    dataIndex: 'password',
    tooltip: '用户设置的密码',
    valueType: 'password',
    search: false,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
        {
          pattern: /^(([\s\S]{8,25})|([\s\S]{60}))$/,
          message: '密码长度必须在8到25个字符之间',
        },
      ],
    },
  },
  {
    title: '性别',
    dataIndex: 'sex',
    tooltip: '用户的性别',
    valueEnum: Sex,
    filters: true,
    search: false,
  },
  {
    title: '角色',
    dataIndex: 'role',
    tooltip: '用户的身份',
    valueEnum: Role,
    filters: true,
    search: false,
    sorter: (a, b) => a.role.length - b.role.length,
  },
  {
    title: '任教科目',
    dataIndex: 'subjects',
    tooltip: '用户任教的科目',
    valueEnum: Subject,
    valueType: 'checkbox',
    filters: true,
    search: false,
  },
  {
    title: '注册时间',
    dataIndex: 'create_at',
    tooltip: '用户注册的时间',
    valueType: 'dateTime',
    search: false,
    editable: false,
    sorter: (a, b) =>
      new Date(a.create_at).getTime() - new Date(b.create_at).getTime(),
  },
  {
    title: '更新时间',
    dataIndex: 'update_at',
    tooltip: '用户更新用户信息的时间',
    valueType: 'dateTime',
    search: false,
    editable: false,
    sorter: (a, b) =>
      new Date(a.update_at).getTime() - new Date(b.update_at).getTime(),
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default function Users() {
  const actionRef = useRef<ActionType>();
  let data: DataSourceType[] = [];

  function diffAndUpdate(dataSource: DataSourceType[]) {
    if (!_.isEqual(data, dataSource)) {
      const difference = _.xorBy(data, dataSource, (value) =>
        JSON.stringify(value),
      );

      if (data.length > dataSource.length) {
        request(`/users/${difference[0].id}`, { method: 'DELETE' });
      } else {
        if (difference[0].password === difference[1].password) {
          difference[1] = _.clone(difference[1]);
          delete difference[1].password;
        }
        request(`/users/${difference[0].id}`, {
          method: 'PATCH',
          data: difference[1],
        });
      }

      data = dataSource;
    }
  }

  async function fetchData(params = {}, sort: any, filter: any) {
    const response = await request<{
      data: DataSourceType[];
    }>('/users', { params: { ...params, ...filter } });
    data = response.data;
    return response;
  }

  function print() {
    try {
      message.info('正在准备打印中，请稍后');
      if (
        document.querySelector('#root > div > div > section > aside')!
          .clientWidth !== 60
      ) {
        const antProSiderCollapsedButton = document.querySelector(
          '#root > div > div > section > aside > div > div.ant-pro-sider-collapsed-button',
        ) as HTMLElement;
        antProSiderCollapsedButton.click();
      }
      actionRef.current?.setPageInfo!({ pageSize: data.length });
      new Promise((resolve) => {
        setTimeout(resolve, 5000);
      }).then(() => window.print());
    } catch (e: any) {
      message.error(e.message);
    }
  }

  function exportAsXLSX() {
    const outputName = '用户列表';
    const table = data.map((user) => ({
      姓名: user.name,
      手机号: user.id,
      性别: user.sex,
      角色: user.role,
      任教科目: user.subjects.join(', '),
      注册时间: user.create_at,
      更新时间: user.update_at,
    }));

    const worksheet = XLSX.utils.json_to_sheet(table, { origin: 'A2' } as any);
    const workbook = XLSX.utils.book_new();

    worksheet['!merges'] = [
      XLSX.utils.decode_range('A1:G1')
    ]
    worksheet['A1'] = {
      t: 's',
      v: outputName,
      l: {
        Target: window.location.href,
        Tooltip: '点击跳转到用户列表页面',
      },
      s: {
        font: {
          sz: 16,
          underline: true
        },
        border: undefined
      },
    };
    worksheet['!cols'] = [
      { width: 15 },
      { width: 15 },
      { width: 10 },
      { width: 10 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
    ];
    worksheet['!rows'] = [
      { hpx: 30 },
      ...new Array(data.length + 1).fill({ hpx: 20 }),
    ];
    for (const key of Object.keys(worksheet)) {
      if (!key.startsWith('!')) {
        worksheet[key] = {
          ...worksheet[key],
          s: {
            alignment: {
              horizontal: 'center',
              vertical: 'center'
            },
            border: {
              top: { style: 'thin', color: { rgb: '#5c6c75'}},
              bottom: { style: 'thin', color: { rgb: '#5c6c75'}},
              left: { style: 'thin', color: { rgb: '#5c6c75'}},
              right: { style: 'thin', color: { rgb: '#5c6c75'}}
            },
            ...worksheet[key].s
          }
        }
      }
    }
    XLSX.utils.book_append_sheet(workbook, worksheet, outputName);
    XLSX.writeFile(workbook, `${outputName}.xlsx`, { compression: true });
  }

  return (
    <ProTable<DataSourceType>
      columns={columns}
      actionRef={actionRef}
      rowKey="id"
      request={fetchData}
      editable={{
        type: 'multiple',
      }}
      cardBordered
      headerTitle="用户列表"
      onDataSourceChange={diffAndUpdate}
      toolBarRender={() => [
        <Button
          key={'export'}
          icon={<ExportOutlined />}
          type="primary"
          onClick={exportAsXLSX}
        >
          导出
        </Button>,
        <Button key={'print'} icon={<PrinterOutlined />} onClick={print}>
          打印
        </Button>,
      ]}
    />
  );
}
