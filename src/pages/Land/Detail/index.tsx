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
  queryUserList,
  queryDetail,
  queryLand,
  deleteUser,
  updateLand,
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
      let { cbrq, flowrq } = val2;
      // 假设 cbrq 和 flowrq 是从某个地方获取的 dayjs 对象
      cbrq = dayjs(cbrq);
      flowrq = dayjs(flowrq);
      cbrq = cbrq.format('YYYY-MM-DD');
      flowrq = flowrq.format('YYYY-MM-DD');
      const id = parseInt(URlparams.id, 10) || 1;
      const params = {
        id,
        ...val2,
        cbrq,
        flowrq,
      };
      const { state } = await updateLand(params);
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
              <Button type="primary" onClick={() => history.push( `/land/list`)}>
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
          const { data, success } = await queryLand({
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
        <ProFormSelect
          colProps={{ md: 12, xl: 10 }}
          label="用地来源"
          name="ydly"
          valueEnum={{
            自有: '自有',
            自有和承包: '自有和承包',
          }}
        />
        <ProFormSelect
          colProps={{ md: 12, xl: 10 }}
          label="地块类别"
          name="dklb"
          valueEnum={{
            山坡地: '山坡地',
            平地: '平地',
            草原地: '草原地',
          }}
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
          name="space"
          label="地块面积（亩）"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="zyspace"
          label="自有面积（亩）"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="cbspace"
          label="承包面积（亩）"
        />
        <ProFormDatePicker
          colProps={{ md: 12, xl: 10 }}
          name="cbrq"
          label="承包日期"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="cbns"
          label="承包年数"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="flowspace"
          label="流转面积（亩）"
        />
        <ProFormDatePicker
          colProps={{ md: 12, xl: 10 }}
          name="flowrq"
          label="流转日期"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="flowns"
          label="流转年数"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="breed"
          label="种植品种"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="space"
          label="种植面积（亩）"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="zzzs"
          label="种植株数（株）"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="zmly"
          label="种苗来源"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="zmsx"
          label="种苗属性"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="qzmzs"
          label="圈枝苗株数"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="dzsj"
          label="定植时间"
        />
        <ProFormText colProps={{ md: 12, xl: 10 }} name="sl" label="树龄" />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="zmjg"
          label="种苗价格"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="dkcl1"
          label="产量2021（吨）"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="dkcl2"
          label="产量2022（吨）"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="dkcl3"
          label="产量2023（吨）"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="address"
          label="所属地点"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="address"
          label="详细地址"
        />
        <ProFormText
          colProps={{ md: 12, xl: 10 }}
          name="description"
          label="备注"
        />
      </ProForm>
    </>
  );
};
