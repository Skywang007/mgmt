import services from '@/services/demo';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
const { addUser2, updataUser, queryUser, deleteUser2, modifyUser } =
  services.UserController;

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [modifyModalVisible, handleMmodifyVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const idRef = useRef();
  const [row, setRow] = useState<API.UserInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserInfo[]>([]);

  const deleteConfirm = async (_: any, record: any) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      const { uid } = record;
      await deleteUser2({ uid });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };
  const deleteCancel = (_: any, record: any) => {};

  const handleAdd = async (fields: API.UserInfo) => {
    const hide = message.loading('正在添加');
    try {
      const { state } = await addUser2({ ...fields });
      hide();
      if (state == 200) {
        message.success('添加成功');
        actionRef.current?.reload();
        return true;
      } else {
        message.error('添加失败请重试！');
        return false;
      }
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };
  const handleUpdate = async (fields: any) => {
    const { password, rePassword } = fields;
    // 判断两次输入的密码是否一致
    if (password !== rePassword) {
      message.error('两次输入的密码不一致，请重新输入');
      return false;
    }
    const hide = message.loading('正在修改');
    try {
      const params = { ...fields,uid: idRef.current,isPassword: 1 };
      const { state } = await updataUser(params);
      hide();
      if (state == 200) {
        message.success('修改成功');
        actionRef.current?.reload();
        return true;
      } else {
        message.error('修改失败请重试！');
        return false;
      }
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
      return false;
    }
  };

  const columns: ProDescriptionsItemProps<any>[] = [
    {
      title: 'ID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '手机号码',
      dataIndex: 'phone_number',
      key: 'phone_number',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (_, record) => {
        const data = record.phone_number == 0 ? '-' : record.phone_number;
        return <div>{data}</div>;
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {
            idRef.current = record.uid
            handleMmodifyVisible(true)
          }}>修改密码</a>
          <Divider type="vertical" />
          <Popconfirm
            title="是否确认删除"
            onConfirm={() => deleteConfirm(_, record)}
            onCancel={() => deleteCancel(_, record)}
            okText="是"
            cancelText="否"
          >
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
        </>
      ),
    },
  ];
  const newColoum: any = {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  };
  let craeteColums: any = [...columns];
  craeteColums.splice(0, 1);
  craeteColums.splice(2, 0, newColoum);
  const modifyColums = [
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '确认密码',
      dataIndex: 'rePassword',
      key: 'rePassword',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
  ];
  return (
    <PageContainer
      header={{
        title: '用户管理',
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
        request={async (params) => {
          const { data, success, total } = await queryUser({
            ...params,
          });
          return {
            data: data || [],
            total: total,
            success: success,
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
              // await handleRemove(selectedRowsState);
              // setSelectedRows([]);
              // actionRef.current?.reloadAndRest?.();
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
          columns={craeteColums as any}
        />
      </CreateForm>
      {/* 修改密码 */}
      <CreateForm
        onCancel={() => handleMmodifyVisible(false)}
        modalVisible={modifyModalVisible}
      >
        <ProTable<API.UserInfo, API.UserInfo>
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleMmodifyVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={modifyColums as any}
        />
      </CreateForm>

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            // const success = await handleUpdate(value);
            // if (success) {
            //   handleUpdateModalVisible(false);
            //   setStepFormValues({});
            //   if (actionRef.current) {
            //     actionRef.current.reload();
            //   }
            // }
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
