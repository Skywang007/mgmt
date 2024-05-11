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
import { history } from 'umi';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
const { addLand, queryUserList, queryLand, deleteLand, modifyUser } =
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
      await deleteLand({ nid });
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
      const { state } = await addLand({ ...fields });
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

  const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'nid',
      search: false,
      key: 'nid',
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '地块面积',
      dataIndex: 'space',
      search: false,
      key: 'space',
    },
    {
      title: '用地来源',
      key: 'ydly',
      dataIndex: 'ydly',
      valueEnum: {
        自有: { text: '自有', status: '自有' },
        自有和承包: { text: '自有和承包', status: '自有和承包' },
      },
    },
    {
      title: '地块类别',
      dataIndex: 'dklb',
      key: 'dklb',
      valueEnum: {
        山坡地: { text: '山坡地', status: '山坡地' },
      },
    },
    {
      title: '行政村',
      dataIndex: 'admin_village',
      valueType: 'text',
      key: 'admin_village',
    },
    {
      title: '自然村',
      dataIndex: 'nature_village',
      valueType: 'text',
      key: 'nature_village',
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
              history.push(`/land/detail/${record.nid}`);
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
        title: '地块管理',
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
          const { data, success, total } = await queryLand({
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
