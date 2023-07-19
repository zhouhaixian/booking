import { useModel } from '@/.umi/plugin-model';
import { request } from '@umijs/max';
import { ExportOutlined, PrinterOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Record } from '../../../../types';
import { message, Button } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import XLSX from 'xlsx-js-style';

export default function RecordPane() {
  const { id } = useModel(
    '@@initialState',
    (model) => model.initialState!.user,
  ) as any;
  let data: Record[] = [];
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Record>[] = [
    {
      title: '授课教师',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      tooltip: '用户的手机号',
      copyable: true,
    },
    {
      title: '年级',
      dataIndex: 'grade',
      copyable: true,
    },
    {
      title: '授课班级',
      dataIndex: 'class',
      valueType: 'digit',
    },
    {
      title: '科目',
      dataIndex: 'subject',
      copyable: true,
      filters: false,
    },
    {
      title: '课节',
      dataIndex: 'index',
      valueEnum: {
        0: '第一节',
        1: '第二节',
        2: '第三节',
        3: '第四节',
        4: '第五节',
        5: '第六节',
        6: '第七节',
        7: '第八节',
      },
      tooltip: '第几节课',
      search: false,
      filters: true,
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      search: false,
      valueType: 'dateTime',
      tooltip: '用户填写的开始上课的时间',
      copyable: true,
      sorter: (a, b) => dayjs(a.start_time).diff(dayjs(b.start_time)),
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      search: false,
      valueType: 'dateTime',
      tooltip: '用户填写的结束上课的时间',
      copyable: true,
      sorter: (a, b) => dayjs(a.end_time).diff(dayjs(b.end_time)),
    },
    {
      title: '预约时间',
      dataIndex: 'create_at',
      search: false,
      valueType: 'dateTime',
      tooltip: '用户提交预约表单的时间',
      copyable: true,
      sorter: (a, b) => dayjs(a.create_at).diff(dayjs(b.create_at)),
    },
  ];

  async function fetchData(params = {}, sort: any, filter: any) {
    const result = await request('/record/'.concat(id), {
      params: { ...params, ...filter },
    });
    return {
      ...result,
      data: result.data.map((record: any) => ({
        ...record,
        start_time: dayjs(record.start_time).format('YYYY-MM-DD HH:mm:ss'),
        end_time: dayjs(record.end_time).format('YYYY-MM-DD HH:mm:ss'),
        create_at: dayjs(record.create_at).format('YYYY-MM-DD HH:mm:ss'),
      })),
    };
  }

  function exportAsXLSX() {
    const outputName = '预约记录';
    const table = data.map((record) => ({
      授课教师: record.name,
      手机号: record.id,
      年级: record.grade,
      授课班级: record.class,
      科目: record.subject,
      开始时间: record.start_time,
      结束时间: record.end_time,
      预约时间: record.create_at,
    }));

    const worksheet = XLSX.utils.json_to_sheet(table, { origin: 'A2' } as any);
    const workbook = XLSX.utils.book_new();

    worksheet['!merges'] = [XLSX.utils.decode_range('A1:H1')];
    worksheet['A1'] = {
      t: 's',
      v: outputName,
      l: {
        Target: window.location.href,
        Tooltip: `点击跳转到${outputName}页面`,
      },
      s: {
        font: {
          sz: 16,
          underline: true,
        },
        border: undefined,
      },
    };
    worksheet['!cols'] = [
      { width: 15 },
      { width: 15 },
      { width: 10 },
      { width: 10 },
      { width: 15 },
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
              vertical: 'center',
            },
            border: {
              top: { style: 'thin', color: { rgb: '#5c6c75' } },
              bottom: { style: 'thin', color: { rgb: '#5c6c75' } },
              left: { style: 'thin', color: { rgb: '#5c6c75' } },
              right: { style: 'thin', color: { rgb: '#5c6c75' } },
            },
            ...worksheet[key].s,
          },
        };
      }
    }
    XLSX.utils.book_append_sheet(workbook, worksheet, outputName);
    XLSX.writeFile(workbook, `${outputName}.xlsx`, { compression: true });
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

  function handleLoad(dataSource: Record[]) {
    return (data = dataSource);
  }

  return (
    <ProTable<Record>
      columns={columns}
      request={fetchData}
      rowKey="start_time"
      headerTitle="预约记录"
      onLoad={handleLoad}
      actionRef={actionRef}
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
      cardBordered
    />
  );
}
