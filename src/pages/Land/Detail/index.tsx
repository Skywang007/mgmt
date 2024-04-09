import { ProDescriptions } from '@ant-design/pro-components';
import type { TabsProps } from 'antd';
import { Button, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import services from '@/services/demo';
import { useParams } from 'umi';
const {
  addUser,
  queryUserList,
  queryDetail,
  queryLand,
  deleteUser,
  modifyUser,
} = services.UserController;

export default () => {
  const URlparams = useParams();
  const landColumns = [
    {
      title: '地块类别',
      key: 'text',
      dataIndex: 'dklb',
    },
    {
      title: '地块经度',
      key: 'text',
      dataIndex: 'lat',
    },
    {
      title: '地块纬度',
      key: 'text',
      dataIndex: 'lng',
    },
    {
      title: '所属镇',
      key: 'text',
      dataIndex: 'county',
    },
    {
      title: '行政村（村委）',
      key: 'text',
      dataIndex: 'admin_village',
    },
    {
      title: '自然村',
      key: 'text',
      dataIndex: 'nature_village',
    },
    {
      title: '详细地址',
      key: 'text',
      dataIndex: 'address',
    },
    {
      title: '地块面积（亩）',
      key: 'text',
      dataIndex: 'space',
    },
    {
      title: '自有面积（亩）',
      key: 'text',
      dataIndex: 'zyspace',
    },
    {
      title: '承包面积（亩）',
      key: 'text',
      dataIndex: 'cbspace',
    },
    {
      title: '承包日期',
      key: 'text',
      dataIndex: 'cbrq',
    },
    {
      title: '承包年数',
      key: 'text',
      dataIndex: 'cbns',
    },
    {
      title: '流转面积（亩）',
      key: 'text',
      dataIndex: 'flowspace',
    },
    {
      title: '流转日期',
      key: 'text',
      dataIndex: 'flowrq',
    },
    {
      title: '流转年数',
      key: 'text',
      dataIndex: 'flows',
    },
    {
      title: '种植品种',
      key: 'text',
      dataIndex: 'breed',
    },
    {
      title: '种植面积（亩）',
      key: 'text',
      dataIndex: 'space',
    },
    {
      title: '种植株数（株）',
      key: 'text',
      dataIndex: 'zzzs',
    },
    {
      title: '种苗来源',
      key: 'text',
      dataIndex: 'zmly',
    },
    {
      title: '种苗属性',
      key: 'text',
      dataIndex: 'zmsx',
    },
    {
      title: '圈枝苗株数',
      key: 'text',
      dataIndex: 'qzmzs',
    },
    {
      title: '定植时间',
      key: 'text',
      dataIndex: 'dzsj',
    },
    {
      title: '树龄',
      key: 'text',
      dataIndex: 'sl',
    },
    {
      title: '种苗价格',
      key: 'text',
      dataIndex: 'zmjg',
    },
    {
      title: '产量2021（吨）',
      key: 'text',
      dataIndex: 'dkcl1',
    },
    {
      title: '产量2022（吨）',
      key: 'text',
      dataIndex: 'dkcl2',
    },
    {
      title: '产量2023（吨）',
      key: 'text',
      dataIndex: 'dkcl3',
    },
    {
      title: '所属地点',
      key: 'text',
      dataIndex: 'address',
    },
    {
      title: '详细地址',
      key: 'text',
      dataIndex: 'address',
    },
    {
      title: '备注',
      key: 'text',
      dataIndex: 'description',
    },
  ];
  return (
    <ProDescriptions
      column={2}
      title="地块详情"
      // tooltip="包含了从服务器请求，columns等功能"
      request={async () => {
        const { data, success } = await queryLand({
          nid: URlparams.id,
        });
        return {
          data: data[0] || {},
          success: success,
        };
      }}
      columns={landColumns}
    />
  );
};
