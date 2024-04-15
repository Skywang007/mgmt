import services from '@/services/demo';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message,Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { history } from 'umi';
const { addFactory, queryUserList,queryFactoryList, deleteFactory, modifyUser } =
  services.UserController;



const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.UserInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserInfo[]>([]);

  const deleteConfirm = async (_: any, record: any) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      const { nid } = record;
      await deleteFactory({ nid });
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
      const { state }=await addFactory({ ...fields });
      hide();
      if (state == 200) {
        message.success('添加成功');
        actionRef.current?.reload();
        return true;
      } else {
        message.error('添加失败请重试！');
        return false
      }
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };

  const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'nid',
      search:false
    },
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '加工厂面积',
      dataIndex: 'space',
      search:false
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      valueType: 'text',
      search: false,
      render: (data, rowdata) => {
        return <div>{data}</div>;
      },
    },
    {
      title: '联系人',
      dataIndex: 'lxr',
      valueType: 'text',
    },
    {
      title: '联系电话',
      dataIndex: 'lxphone',
      valueType: 'text',
      search: false,
    },
    {
      title: '行政村',
      dataIndex: 'admin_village',
      valueType: 'text',
    },
    {
      title: '自然村',
      dataIndex: 'nature_village',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              console.log('data=>', _, record);
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
              history.push(`/table/detail/${record.nid}`);
            }}
          >
            详情
          </a>
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
  const craeteColums: any = columns.slice(1);
  return (
    <PageContainer
      header={{
        title: '加工厂管理',
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
          const { data, success,total } = await queryFactoryList({
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
