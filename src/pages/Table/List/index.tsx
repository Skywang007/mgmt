import services from '@/services/demo';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { history } from 'umi';
const { addUser, queryUserList, deleteUser, modifyUser } =
  services.UserController;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserInfo) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await modifyUser(
      {
        userId: fields.id || '',
      },
      {
        name: fields.name || '',
        nickName: fields.nickName || '',
        email: fields.email || '',
      },
    );
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.UserInfo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteUser({
      userId: selectedRows.find((row) => row.id)?.id || '',
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.UserInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserInfo[]>([]);

  const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
      title: 'id',
      dataIndex: 'nid',
      search:false
    },
    {
      title: '名称',
      dataIndex: 'title',
      tip: '名称是唯一的 key',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '名称为必填项',
      //     },
      //   ],
      // },
    },
    {
      title: '企业类型',
      dataIndex: 'qylx',
      valueType: 'text',
      valueEnum: {
        种植户: { text: '种植户', status: '种植户' },
        个体工商户: { text: '个体工商户', status: '个体工商户' },
        农民专业合作社: { text: '农民专业合作社', status: '农民专业合作社' },
        企业: { text: '企业', status: '企业' },
        有限责任公司: { text: '有限责任公司', status: '有限责任公司' },
      },
    },
    {
      title: '企业性质',
      dataIndex: 'qyxz',
      valueEnum: {
        种植: { text: '种植', status: '种植' },
        种植和加工: { text: '种植和加工', status: '种植和加工' },
      },
    },
    {
      title: '认证',
      dataIndex: 'name',
      hideInForm: true,
      search: false,
      valueEnum: {
        0: { text: '是', status: 'MALE' },
        1: { text: '否', status: 'FEMALE' },
      },
    },
    {
      title: '联系人',
      dataIndex: 'lxr',
      valueType: 'text',
      search: false,
    },
    {
      title: '联系电话',
      dataIndex: 'lxphone',
      valueType: 'text',
    },
    {
      title: '位置',
      dataIndex: 'address',
      valueType: 'text',
      search: false,
      render: (data, rowdata) => {
        return <div>{data}</div>;
      },
    },
    {
      title: '排序',
      dataIndex: 'name',
      valueType: 'text',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              console.log('data=>', _, record);
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
              history.push( `/table/detail/${record.nid}`)
            }}
          >
            详情
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              console.log('data=>', _, record);

              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
            }}
          >
            删除
          </a>
          <Divider type="vertical" />
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '经营主体',
      }}
    >
      <ProTable<API.UserInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          console.log('request', {...params});
          const { data, success,total } = await queryUserList({
            ...params,
          });
          return {
            data: data || [],
            success,
            total:total
          };
        }}
        columns={columns as any}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.UserInfo, API.UserInfo>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns as any}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.UserInfo>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;