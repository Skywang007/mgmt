import {
  FooterToolbar,
  ProForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Layout, message } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
const { Header, Footer, Sider, Content } = Layout;

import services from '@/services/demo';
import { useParams,history } from 'umi';
const {
  addUser,
  queryFactoryList,
  queryDetail,
  queryLand,
  deleteUser,
  updateFactory,
} = services.UserController;

export default () => {
  const URlparams = useParams();
  const [readOnly, setReadOnly] = useState(true);
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();

  const handleSubimt = async () => {
    try {
      const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
      console.log('validateFieldsReturnFormatValue:', val2);
      const id = parseInt(URlparams.id, 10) || 1;
      const params = {
        id,
        ...val2,
      };
      const { state } = await updateFactory(params);
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
  return (
    <>
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
              <Button type="primary" onClick={() => history.push( `/factory/list`)}>
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
          const { data, success } = await queryFactoryList({
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
          label="加工厂面积"
          name="space"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="address"
          label="详细地址"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="lat"
          label="地块经度"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="lng"
          label="地块纬度"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="lxr"
          label="联系人"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="lxphone"
          label="联系电话"
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
      </ProForm>
    </>
  );
};
