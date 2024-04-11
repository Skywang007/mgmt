import {
  FooterToolbar,
  ProDescriptions,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Flex, Layout, message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import services from '@/services/demo';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'umi';
const { updateCirculate, queryUserList, queryDetail, deleteUser, modifyUser } =
  services.UserController;

export default () => {
  const URlparams = useParams();
  useEffect(() => {
    console.log('location=>', '---', URlparams);
  }, []);
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  const [readOnly, setReadOnly] = useState(true);

  

  const handleSubimt = async () => {
    try {
      const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
      console.log('validateFieldsReturnFormatValue:', val2);
      const id = parseInt(URlparams.id, 10) || 1;
      const params = {
        id,
        ...val2,
      };
      const { state } = await updateCirculate(params);
      if (state === 200) {
        setReadOnly(true);
        message.success('修改成功');
      } else {
        message.error('修改失败');
      }
    } catch (error) {
      message.error('修改失败');
    }
  };

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
            <ProForm<{
              name: string;
              company?: string;
              useMode?: string;
            }>
              layout="horizontal"
              grid={true}
              rowProps={{
                gutter: [100, 0],
              }}
              submitter={{
                render: (_, dom) => (
                  <FooterToolbar>
                    <Button
                      type="primary"
                      onClick={() => history.push(`/table/list`)}
                    >
                      返回
                    </Button>
                    {readOnly ? (
                      <Button type="primary" onClick={() => setReadOnly(false)}>
                        编辑
                      </Button>
                    ) : (
                      <Button type="primary" onClick={() => setReadOnly(true)}>
                        取消
                      </Button>
                    )}
                    {!readOnly && (
                      <Button type="primary" onClick={() => handleSubimt()}>
                        提交
                      </Button>
                    )}
                  </FooterToolbar>
                ),
              }}
              onFinish={async (values) => {
                console.log(values);
                const val1 = await formRef.current?.validateFields();
                console.log('validateFields:', val1);
                const val2 =
                  await formRef.current?.validateFieldsReturnFormatValue?.();
                console.log('validateFieldsReturnFormatValue:', val2);
                message.success('提交成功');
              }}
              formRef={formRef}
              params={{ id: '100' }}
              formKey="base-form-use-demo"
              readonly={readOnly}
              request={async () => {
                const { data, success } = await queryDetail({
                  nid: URlparams.id,
                });
                return data[0] || {};
              }}

              // autoFocusFirstInput
            >
              <ProFormText
                name="title"
                label="名称"
                placeholder="请输入名称"
                width={'md'}
                rules={[{ required: true, message: '请输入名称' }]}
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                label="年份"
                name="year"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="plant_type"
                label="种植品种"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="area"
                label="种植面积"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="county"
                label="所属镇"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="admin_village"
                label="行政村（村委）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="nature_village"
                label="自然村"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="address"
                label="详细地址"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="tree"
                label="树龄（年）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="plant_price"
                label="种苗价格（元/株）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="storage_area"
                label="仓储面积（平方米）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="fruit_input"
                label="鲜果年总产量（吨）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="buy"
                label="收购价（元/公斤）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="fruit_sale"
                label="鲜果年销售额（万元）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="dryfruit_input"
                label="干果年总产量（吨）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="sale"
                label="销售价（元/公斤）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="dryfruit_sale"
                label="干果年销售额（万元）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="dryfruit_put"
                label="干果年入库量（吨）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="dryfruit_volume"
                label="干果年销售量（吨）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="dryfruit_storage"
                label="干果年库存量（吨）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="begin_process"
                label="初加工率%"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="deep_process"
                label="深加工率"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="land_rent"
                label="土地租赁费（元/亩）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="engine_work"
                label="机械作业费（元/年）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="plant_cost"
                label="种苗购买（元/年）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="fertilizer"
                label="化肥（元/年）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="pesticide"
                label="农药费（元/年）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="water"
                label="抽水灌溉（元/年）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="employee_number"
                label="雇工人数（人/年）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="employee_sale"
                label="雇工费用（元/年）"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="deep_process"
                label="批发市场"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="wholesale"
                label="深加工率"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="peddler"
                label="商贩"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="process"
                label="加工企业"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="internet"
                label="网络电商"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="other"
                label="其他"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="wholesale_place"
                label="批发市场地点"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="peddler_place"
                label="商贩地点"
              />
              <ProFormText
                colProps={{ md: 12, xl: 10 }}
                name="process_name"
                label="加工企业名称"
              />
            </ProForm>
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
};
