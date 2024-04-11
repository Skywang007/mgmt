import type { ProFormInstance } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ProForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormList,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { TreeSelect, message } from 'antd';
import moment from 'dayjs';
import { useRef } from 'react';
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
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        const val1 = await formRef.current?.validateFields();
        console.log('validateFields:', val1);
        const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
        console.log('validateFieldsReturnFormatValue:', val2);
        message.success('提交成功');
      }}
      formRef={formRef}
      params={{ id: '100' }}
      formKey="base-form-use-demo"
      dateFormatter={(value, valueType) => {
        console.log('---->', value, valueType);
        return value.format('YYYY/MM/DD HH:mm:ss');
      }}
      request={async () => {
        await waitTime(100);
        return {
          name: '蚂蚁设计有限公司',
          useMode: 'chapter',
        };
      }}
      autoFocusFirstInput
      submitter={{
        render: (_, dom) => {
          console.log('submitter--->', dom, _);
          return (
            <FooterToolbar>
              <text>编辑</text>
              <text>删除</text>
            </FooterToolbar>
          );
        },
      }}
    >
      <ProForm.Group>
        <ProFormText
          // width="md"
          name="name"
          required
          dependencies={[['contract', 'name']]}
          // addonBefore={<a>客户名称应该怎么获得？</a>}
          // addonAfter={<a>点击查看更多</a>}
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{ required: true, message: '这是必填项' }]}
          disabled
        />
        <ProFormText
          width="md"
          name="company"
          label="我方公司名称"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit name="count" label="人数" width="lg" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name={['contract', 'name']}
          width="md"
          label="合同名称"
          placeholder="请输入名称"
        />
        <ProFormDateRangePicker
          width="md"
          name={['contract', 'createTime']}
          label="合同生效时间"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          readonly
          width="xs"
          cacheForSwr
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect.SearchSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '履行完终止',
              type: 'time',
              options: [
                {
                  value: 'time1',
                  label: '履行完终止1',
                },
                {
                  value: 'time2',
                  label: '履行完终止2',
                },
              ],
            },
          ]}
          name="unusedMode"
          label="合同约定失效方式"
        />
        <ProFormMoney
          width="md"
          name="money"
          label="合同约定金额"
          fieldProps={{
            numberPopoverRender: true,
          }}
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProFormText
        name="project"
        width="md"
        disabled
        label="项目名称"
        initialValue="xxxx项目"
      />
      <ProFormTextArea
        colProps={{ span: 24 }}
        name="address"
        label="详细的工作地址或家庭住址"
      />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="商务经理"
        initialValue="启途"
      />
      <ProFormCascader
        width="md"
        request={async () => [
          {
            value: 'zhejiang',
            label: '浙江',
            children: [
              {
                value: 'hangzhou',
                label: '杭州',
                children: [
                  {
                    value: 'xihu',
                    label: '西湖',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ]}
        name="areaList"
        label="区域"
        initialValue={['zhejiang', 'hangzhou', 'xihu']}
        addonAfter={'qixian'}
      />
      <ProFormTreeSelect
        initialValue={['0-0-0']}
        label="树形下拉选择器"
        width={600}
        fieldProps={{
          fieldNames: {
            label: 'title',
          },
          treeData,
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          placeholder: 'Please select',
        }}
      />
      <ProFormDatePicker
        name="date"
        transform={(value) => {
          return {
            date: moment(value).unix(),
          };
        }}
      />
      <ProFormList name="datas">
        {() => {
          return (
            <>
              <ProFormDatePicker
                name="date"
                transform={(value) => {
                  return {
                    date: moment(value).unix(),
                  };
                }}
              />

              <ProFormList name="innerDatas">
                {() => {
                  return (
                    <>
                      <ProFormDatePicker
                        name="date"
                        transform={(value) => {
                          return {
                            date: moment(value).unix(),
                          };
                        }}
                      />
                      <ProFormList name="innerDatas">
                        {() => {
                          return (
                            <>
                              <ProFormDatePicker
                                name="date"
                                transform={(value) => {
                                  return {
                                    date: moment(value).unix(),
                                  };
                                }}
                              />
                              <ProFormList name="innerDatas">
                                {() => {
                                  return (
                                    <>
                                      <ProFormDatePicker
                                        name="date"
                                        transform={(value) => {
                                          return {
                                            date: moment(value).unix(),
                                          };
                                        }}
                                      />
                                    </>
                                  );
                                }}
                              </ProFormList>
                            </>
                          );
                        }}
                      </ProFormList>
                    </>
                  );
                }}
              </ProFormList>
            </>
          );
        }}
      </ProFormList>
    </ProForm>
  );
};
