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
import UpdateForm, { FormValueType } from './components/UpdateForm';
const { addUser, queryUserList, deleteUser, modifyUser } =
  services.UserController;

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
      await deleteUser({ nid });
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
      const { state }=await addUser({ ...fields });
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
      title: 'id',
      dataIndex: 'nid',
      search: false,
      key: 'nid',
    },
    {
      title: '名称',
      dataIndex: 'title',
      tip: '名称是唯一的 key',
      key: 'title',
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
      key: 'qylx',
      valueType: 'text',
      valueEnum: {
        种植户: { text: '种植户', status: '种植户' },
        个体工商户: { text: '个体工商户', status: '个体工商户' },
        农民专业合作社: { text: '农民专业合作社', status: '农民专业合作社' },
        企业: { text: '企业', status: '企业' },
        有限责任公司: { text: '有限责任公司', status: '有限责任公司' },
        家庭农场: { text: '家庭农场', status: '家庭农场' },
      },
    },
    {
      title: '企业性质',
      dataIndex: 'qyxz',
      key: 'qyxz',
      valueEnum: {
        种植: { text: '种植', status: '种植' },
        种植和加工: { text: '种植和加工', status: '种植和加工' },
        加工: { text: '加工', status: '加工' },
        销售: { text: '销售', status: '销售' },
      },
    },
    {
      title: '认证',
      dataIndex: 'status',
      hideInForm: true,
      search: false,
      key: 'status',
      valueEnum: {
        0: { text: '否', status: '0' },
        1: { text: '是', status: '1' },
      },
    },
    {
      title: '联系人',
      dataIndex: 'lxr',
      valueType: 'text',
      key: 'lxr',
      search: false,
    },
    {
      title: '联系电话',
      dataIndex: 'lxphone',
      key: 'lxphone',
      valueType: 'text',
    },
    {
      title: '位置',
      dataIndex: 'address',
      key: 'address',
      valueType: 'text',
      search: false,
      render: (data, rowdata) => {
        return <div>{data}</div>;
      },
    },
    {
      title: '排序',
      dataIndex: 'oid',
      key: 'oid',
      valueType: 'text',
      search: false,
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
          console.log('request', { ...params });
          const { data, success, total } = await queryUserList({
            ...params,
          });
          return {
            data: data || [],
            success,
            total: total,
          };
        }}
        columns={columns as any}
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log('selectedRows', selectedRows);
            setSelectedRows(selectedRows);
          },
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
            console.log(value, '--------value');
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              // if (actionRef.current) {
              //   actionRef.current.reload();
              // }
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
