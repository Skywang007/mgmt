import { ProDescriptions } from '@ant-design/pro-components';
import type { TabsProps } from 'antd';
import { Button, Flex, Layout, Tabs } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import services from '@/services/demo';
import { useEffect } from 'react';
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
  const URlparams = useParams()
  useEffect(() => {
    console.log('location=>','---',URlparams);
  }, []);
  
  const columns = [
    {
      title: '名称',
      key: 'text',
      dataIndex: 'title',
    },
    {
      title: '年份',
      key: 'text',
      dataIndex: 'year',
    },
    {
      title: '种植品种',
      key: 'text',
      dataIndex: 'plant_type',
    },
    {
      title: '种植面积',
      key: 'text',
      dataIndex: 'area',
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
      title: '树龄（年）',
      key: 'number',
      dataIndex: 'tree',
    },
    {
      title: '种苗价格（元/株）',
      key: 'money',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'plant_price',
    },
    {
      title: '仓储面积（平方米）',
      key: 'text',
      dataIndex: 'storage_area',
    },
    {
      title: '鲜果年总产量（吨）',
      key: 'number',
      dataIndex: 'fruit_input',
    },
    {
      title: '收购价（元/公斤）',
      key: 'money',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'buy',
    },
    {
      title: '鲜果年销售额（万元）',
      key: 'money',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'fruit_sale',
    },
    {
      title: '干果年总产量（吨）',
      key: 'text',
      dataIndex: 'dryfruit_input',
    },
    {
      title: '销售价（元/公斤）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'sale',
    },
    {
      title: '干果年销售额（万元）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'dryfruit_sale',
    },
    {
      title: '干果年入库量（吨）',
      key: 'text',
      dataIndex: 'dryfruit_put',
    },
    {
      title: '干果年销售量（吨）',
      key: 'text',
      dataIndex: 'dryfruit_volume',
    },
    {
      title: '干果年库存量（吨）',
      key: 'text',
      dataIndex: 'dryfruit_storage',
    },
    {
      title: '初加工率%',
      key: 'text',
      dataIndex: 'begin_process',
    },
    {
      title: '深加工率',
      key: 'text',
      dataIndex: 'deep_process',
    },
    {
      title: '土地租赁费（元/亩）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'land_rent',
    },
    {
      title: '机械作业费（元/年）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'engine_work',
    },
    {
      title: '种苗购买（元/年）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'plant_cost',
    },
    {
      title: '化肥（元/年）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'fertilizer',
    },
    {
      title: '农药费（元/年）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'pesticide',
    },
    {
      title: '抽水灌溉（元/年）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'water',
    },
    {
      title: '雇工人数（人/年）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'employee_number',
    },
    {
      title: '雇工费用（元/年）',
      key: 'text',
      valueType: 'money',
      fieldProps: {
        moneySymbol: '￥',
      },
      dataIndex: 'employee_sale',
    },
    {
      title: '批发市场',
      key: 'text',
      dataIndex: 'wholesale',
    },
    {
      title: '商贩',
      key: 'text',
      dataIndex: 'peddler',
    },
    {
      title: '加工企业',
      key: 'text',
      dataIndex: 'process',
    },
    {
      title: '网络电商',
      key: 'text',
      dataIndex: 'internet',
    },
    {
      title: '其他',
      key: 'text',
      dataIndex: 'other',
    },
    {
      title: '批发市场地点',
      key: 'text',
      dataIndex: 'wholesale_place',
    },
    {
      title: '商贩地点',
      key: 'text',
      dataIndex: 'peddler_place',
    },
    {
      title: '加工企业名称',
      key: 'text',
      dataIndex: 'process_name',
    },

    // {
    //   title: '操作',
    //   valueType: 'option',
    //   render: () => [
    //     <a target="_blank" rel="noopener noreferrer" key="link">
    //       链路
    //     </a>,
    //     <a target="_blank" rel="noopener noreferrer" key="warning">
    //       报警
    //     </a>,
    //     <a target="_blank" rel="noopener noreferrer" key="view">
    //       查看
    //     </a>,
    //   ],
    // },
  ];
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
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '经营情况',
      children: (
        <ProDescriptions
          column={2}
          title="化州市家庭农场"
          // tooltip="包含了从服务器请求，columns等功能"
          request={async () => {
            const { data, success } = await queryDetail({
              id: URlparams.id,
            });
            return {
              data: data[0] || {},
              success: success,
            };
          }}
          columns={columns}
        >
          <ProDescriptions.Item valueType="option">
            <Button key="primary" type="primary" style={{ margin: '0 10px' }}>
              提交
            </Button>
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="option">
            <Button key="primary" type="primary">
              删除
            </Button>
          </ProDescriptions.Item>
        </ProDescriptions>
      ),
    },
    {
      key: '2',
      label: '地块信息',
      children: (
        <ProDescriptions
          column={2}
          title="化州市家庭农场"
          // tooltip="包含了从服务器请求，columns等功能"
          request={async () => {
            const { data, success } = await queryLand({
              id: URlparams.id,
            });
            return {
              data: data[0] || {},
              success: success,
            };
          }}
          columns={landColumns}
        />
      ),
    },
  ];
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    // maxWidth: 'calc(50% - 8px)',
  };
  const siderStyle: React.CSSProperties = {
    height: '600px',
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'lightblue',
    margin: '0 30px 0 0',
  };
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <Sider width="25%" style={siderStyle}>
          <ProDescriptions
            column={1}
            // title="化州市家庭农场"
            // tooltip="包含了从服务器请求，columns等功能"
            request={async (params) => {
              console.log('request', { ...params });
              const { data, success, total } = await queryUserList({
                nid: URlparams.id,
              });
              return {
                data: data[0] || {},
                success,
              };
            }}
            columns={[
              {
                key: 'text',
                dataIndex: 'title',
              },
              {
                title: '成立日期',
                key: 'text',
                dataIndex: 'clrq',
              },
              {
                title: '企业类型',
                key: 'text',
                dataIndex: 'qylx',
              },
              {
                title: '企业性质',
                key: 'text',
                dataIndex: 'qyxz',
              },
              {
                title: '企业荣誉',
                key: 'text',
                dataIndex: 'qyry',
              },
              {
                title: '详细地址',
                key: 'text',
                dataIndex: 'address',
              },
              {
                title: '联系人',
                key: 'text',
                dataIndex: 'lxr',
              },
              {
                title: '联系电话',
                key: 'text',
                dataIndex: 'lxphone',
              },
              {
                title: '微信号',
                key: 'text',
                dataIndex: 'wechat',
              },
              {
                title: '场主姓名',
                key: 'text',
                dataIndex: 'czname',
              },
              {
                title: '场主电话',
                key: 'text',
                dataIndex: 'czphone',
              },
              {
                title: '场主身份证号',
                key: 'text',
                dataIndex: 'idcard',
              },
              {
                title: '从业人数',
                key: 'text',
                dataIndex: 'cyrs',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content>
            <Tabs defaultActiveKey="1" items={items} />
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
};
