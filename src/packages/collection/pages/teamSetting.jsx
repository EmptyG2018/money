import { useState, useEffect, useRef, useContext, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Switch,
  Space,
  Flex,
  Typography,
  Popconfirm,
  Form,
  Modal,
  message,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import {
  ProCard,
  ProForm,
  ProTable,
  ProFormUploadButton,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormRadio,
  ProFormSelect,
} from "@ant-design/pro-components";
import { HeaderPanel } from "@components/collection/HeaderPanel";
import { useRequest } from "ahooks";
import { UploadFile } from "@services/upload";
import {
  GetTeamInfo,
  GetTeamAuths,
  GetTeamUsers,
  GetTeamDelHistorys,
  UpdateTransferTeam,
  UpdateTeamBaseInfo,
  UpdateTeamView,
  UpdateTeamAuth,
  UpdateRecoverTeamDel,
  UpdateDissolveTeam,
  UpdateTeamUserRole,
  CreateTeamUser,
  DeleteTeamUser,
  DelTeamDelHistory,
} from "@services/collection/team";
import EditFormModal from "@components/collection/EditFormModal";
import ToggleCollapsedBtn from "@components/collection/ToggleCollapsedBtn";
import FindUserSelector from "@components/collection/FindUserSelector";
import TeamUserRoleSelector from "@/components/collection/TeamUserRoleSelector";
import styled from "styled-components";

const PAGE_SIZE = 16;

const TeamInfoContext = createContext({});

const TransferTeamFormModal = ({ onSubmit, ...props }) => {
  const formRef = useRef();
  return (
    <Modal
      width={380}
      title="团队转让"
      closeIcon={false}
      destroyOnClose
      onOk={() => {
        formRef.current.validateFields().then((values) => {
          onSubmit(values);
        });
      }}
      {...props}
    >
      <Form ref={formRef} preserve={false}>
        <Form.Item
          name="account"
          rules={[{ required: true, message: "请查询用户" }]}
        >
          <FindUserSelector
            onSearch={(user) => {
              formRef.current.setFieldsValue({
                account: user.id,
              });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CreateTeamUserFormModal = ({ onSubmit, ...props }) => {
  const formRef = useRef();
  return (
    <Modal
      width={380}
      title="添加成员"
      closeIcon={false}
      destroyOnClose
      onOk={() => {
        formRef.current.validateFields().then((values) => {
          onSubmit(values);
        });
      }}
      {...props}
    >
      <Form ref={formRef} preserve={false}>
        <Form.Item
          name="account"
          rules={[{ required: true, message: "请查询用户" }]}
        >
          <FindUserSelector
            onSearch={(user) => {
              formRef.current.setFieldsValue({
                account: user.account,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name="roleId"
          rules={[{ required: true, message: "请选择角色" }]}
        >
          <TeamUserRoleSelector placeholder="角色" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UpdateTeamUserRoleFormModal = ({ ...props }) => {
  return (
    <EditFormModal rowKey="id" width={380} title="成员角色" {...props}>
      <Form.Item
        name="roleId"
        rules={[{ required: true, message: "请选择角色" }]}
      >
        <TeamUserRoleSelector placeholder="角色" />
      </Form.Item>
    </EditFormModal>
  );
};

const BaseView = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const baseFormRef = useRef();
  const viewFormRef = useRef();
  const { teamInfo, mutate } = useContext(TeamInfoContext);
  const [transferTeamFormModalShow, setTransferTeamFormModal] = useState(false);

  const { runAsync: uploadAssets } = useRequest(UploadFile, { manual: true });

  const { runAsync: updateTeamBaseInfo } = useRequest(UpdateTeamBaseInfo, {
    manual: true,
  });
  const { runAsync: updateTeamView } = useRequest(UpdateTeamView, {
    manual: true,
  });
  const { runAsync: updateTransferTeam } = useRequest(UpdateTransferTeam, {
    manual: true,
  });
  const { runAsync: updateDissolveTeam } = useRequest(UpdateDissolveTeam, {
    manual: true,
  });

  useEffect(() => {
    if (teamInfo) {
      baseFormRef.current.setFieldsValue({
        iconUri: [{ uid: "-1", url: teamInfo.iconUri, status: "done" }],
        title: teamInfo.title,
        description: teamInfo.description,
        isJoin: !!teamInfo.isJoin,
        isPublic: teamInfo.isPublic,
      });
      viewFormRef.current.setFieldsValue({
        viewType: teamInfo.viewType,
      });
    }
  }, [teamInfo]);

  const uploadImg = async (e) => {
    const formData = new FormData();
    formData.append("imgType", 0);
    formData.append("myFile", e.file);
    try {
      const res = await uploadAssets(formData);
      baseFormRef.current.setFieldsValue({
        iconUri: [{ uid: "-1", status: "done", url: res?.fullUrl }],
      });
    } catch (err) {
      msgApi.error(err.message);
    }
    return false;
  };

  return (
    <>
      {contextHolder}
      <ProCard ghost direction="column" gutter={[0, 16]}>
        <ProCard bordered>
          <ProForm
            formRef={baseFormRef}
            layout="vertical"
            onFinish={async ({ iconUri, isJoin, ...values }) => {
              const formData = {
                ...values,
                iconUri: iconUri[0].url,
                isJoin: isJoin ? 1 : 0,
              };
              try {
                await updateTeamBaseInfo({ ...formData, id: teamInfo.id });
                mutate({ ...teamInfo, ...formData });

                messageApi.success("保存成功！");
              } catch (err) {
                messageApi.error(err.message);
              }
            }}
            submitter={{
              render: (props, dom) => {
                return (
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                );
              },
            }}
          >
            <ProFormUploadButton
              name="iconUri"
              label="封面"
              max={1}
              extra="支持jpg, png, gif, jpeg类型图片"
              fieldProps={{
                listType: "picture-card",
                multiple: false,
                customRequest: uploadImg,
              }}
              rules={[
                {
                  required: true,
                  message: "请上传封面",
                },
              ]}
            />
            <ProFormText
              width="sm"
              name="title"
              label="团队名称"
              placeholder="团队名称"
              rules={[
                {
                  required: true,
                  message: "请输入团队名称",
                },
              ]}
            />
            <ProFormTextArea
              fieldProps={{ style: { maxWidth: 328 } }}
              name="description"
              label="团队简介"
              placeholder="团队简介"
            />
            <ProForm.Group title="功能设置">
              <ProFormSwitch name="isJoin" label="允许成员加入" />
            </ProForm.Group>
            <ProForm.Group title="可见行范围">
              <ProFormRadio.Group
                name="isPublic"
                options={[
                  {
                    label: "公开任何人都可以查看",
                    value: 1,
                  },
                  {
                    label: " 私有非成员团队无法访问私有团队",
                    value: 0,
                  },
                ]}
                rules={[{ required: true, message: "请选择" }]}
              />
            </ProForm.Group>
          </ProForm>
        </ProCard>

        <ProCard bordered>
          <ProForm
            formRef={viewFormRef}
            layout="vertical"
            onFinish={async (values) => {
              try {
                await updateTeamView({ ...values, teamId: teamInfo.id });
                mutate({ ...teamInfo, ...values });

                messageApi.success("保存成功！");
              } catch (err) {
                messageApi.error(err.message);
              }
            }}
            submitter={{
              render: () => {
                return (
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                );
              },
            }}
          >
            <ProForm.Group title="修改团队展现">
              <ProFormSelect
                width="sm"
                name="viewType"
                label="展现方式"
                request={async () => [
                  { label: "极简", value: 0 },
                  { label: "列表", value: 1 },
                  { label: "标题", value: 2 },
                  { label: "卡片", value: 3 },
                ]}
                rules={[
                  {
                    required: true,
                    message: "请选择展现方式",
                  },
                ]}
              ></ProFormSelect>
            </ProForm.Group>
          </ProForm>
        </ProCard>

        <ProCard title="谨慎操作" bordered>
          <Typography.Text type="danger">转让团队给其他人</Typography.Text>
          <br />
          <br />
          <Button
            type="primary"
            danger
            onClick={() => setTransferTeamFormModal(true)}
          >
            转让
          </Button>
          <br />
          <br />
          <br />
          <Typography.Text>
            解散这个团队
            <Typography.Text type="danger">
              (次操作不可撤销，谨慎操作)
            </Typography.Text>
          </Typography.Text>
          <br />
          <br />
          <Popconfirm
            title="解散团队"
            description="您确定要解散团队吗？"
            onConfirm={async () => {
              try {
                await updateDissolveTeam({ teamId: teamInfo.id });
                navigate(-1);
              } catch (err) {
                messageApi.error(err.message);
              }
            }}
          >
            <Button type="primary" danger>
              解散
            </Button>
          </Popconfirm>
        </ProCard>
      </ProCard>
      <TransferTeamFormModal
        open={transferTeamFormModalShow}
        onCancel={() => setTransferTeamFormModal(false)}
        onSubmit={async ({ account }) => {
          try {
            await updateTransferTeam({
              teamId: teamInfo.id,
              userId: account,
            });
            setTransferTeamFormModal(false);
            navigate(-1);
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />
    </>
  );
};

const TeamView = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const actionRef = useRef();
  const userName = useRef();
  const params = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [createTeamUserFormModalShow, setCreateTeamUserFormModalShow] =
    useState(false);
  const [updateTeamUserRoleFormModal, setUpdateTeamUserRoleFormModal] =
    useState({
      open: false,
      record: null,
    });

  const { refresh: refreshTeamUser, data: teamUser } = useRequest(() =>
    GetTeamUsers({
      teamId: params.teamId,
      userName: userName.current,
      pageNum,
      pageSize: PAGE_SIZE,
    })
  );

  const { runAsync: createTeamUser } = useRequest(CreateTeamUser, {
    manual: true,
  });

  const { runAsync: deleteTeamUser } = useRequest(DeleteTeamUser, {
    manual: true,
  });

  const { runAsync: updateTeamUserRole } = useRequest(UpdateTeamUserRole, {
    manual: true,
  });

  const columns = [
    {
      title: "头像",
      dataIndex: "photoUrl",
      valueType: "avatar",
      width: 48,
    },
    {
      title: "用户名",
      dataIndex: "userName",
    },
    {
      title: "角色",
      dataIndex: "roleName",
      width: 80,
    },
    {
      title: "操作",
      width: 140,
      key: "option",
      valueType: "option",
      render: (_, record) => [
        <Popconfirm
          key="delete"
          title="移除成员"
          description="您确定要移除这成员吗？"
          onConfirm={async () => {
            try {
              await deleteTeamUser({
                teamId: params.teamId,
                userId: record.id,
              });

              refreshTeamUser();
            } catch (err) {
              messageApi.error(err.message);
            }
          }}
        >
          <a key="delete">移除</a>
        </Popconfirm>,
        <a
          key="editAuth"
          onClick={() =>
            setUpdateTeamUserRoleFormModal({
              open: true,
              record: { id: record.id, roleId: record.roleId },
            })
          }
        >
          修改权限
        </a>,
      ],
    },
  ];

  return (
    <>
      {contextHolder}
      <ProTable
        ghost
        bordered
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        headerTitle="成员列表"
        search={false}
        pagination={{
          pageSize: PAGE_SIZE,
          current: pageNum,
          total: teamUser?.total,
          onChange: (current) => {
            setPageNum(current);
            refreshTeamUser();
          },
        }}
        toolbar={{
          search: {
            placeholder: "搜索成员",
            onSearch: (value) => {
              userName.current = value;
              setPageNum(1);
              refreshTeamUser();
            },
          },
          actions: [
            <Button
              key="primary"
              type="primary"
              onClick={() => {
                setCreateTeamUserFormModalShow(true);
              }}
            >
              添加成员
            </Button>,
          ],
        }}
        dataSource={teamUser?.rows || []}
      />
      <CreateTeamUserFormModal
        open={createTeamUserFormModalShow}
        onCancel={() => setCreateTeamUserFormModalShow(false)}
        onSubmit={async (values) => {
          try {
            await createTeamUser({
              teamId: params.teamId,
              ...values,
            });
            setCreateTeamUserFormModalShow(false);

            refreshTeamUser();
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />
      <UpdateTeamUserRoleFormModal
        open={updateTeamUserRoleFormModal.open}
        record={updateTeamUserRoleFormModal.record}
        onCancel={() =>
          setUpdateTeamUserRoleFormModal({
            ...updateTeamUserRoleFormModal,
            open: false,
          })
        }
        onSubmit={async (values, isEdit) => {
          try {
            if (isEdit) {
              await updateTeamUserRole({
                teamId: params.teamId,
                userId: values.id,
                roleId: values.roleId,
              });
              setUpdateTeamUserRoleFormModal({
                ...updateTeamUserRoleFormModal,
                open: false,
              });

              refreshTeamUser();
            }
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />
    </>
  );
};

const AuthConfItem = ({ item }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const params = useParams();
  const { runAsync: updateTeamAuth, loading } = useRequest(UpdateTeamAuth, {
    manual: true,
  });

  return (
    <>
      {contextHolder}
      <Flex align="center" gap={16} key={item.id}>
        <Typography.Text>{item.name}</Typography.Text>
        <Switch
          defaultChecked={item.value === "1"}
          loading={loading}
          onChange={async (checked) => {
            try {
              await updateTeamAuth({
                teamId: params.teamId,
                roleId: item.id,
                valueId: checked ? 1 : 0,
              });
            } catch (err) {
              messageApi.error(err.message);
            }
          }}
        />
      </Flex>
    </>
  );
};

const AuthView = () => {
  const params = useParams();
  const { data: teamAuths } = useRequest(GetTeamAuths, {
    defaultParams: [{ teamId: params.teamId }],
  });

  return (
    <ProCard ghost direction="column" gutter={[0, 16]}>
      <ProCard title="管理员" bordered>
        管理员拥有所有权限
      </ProCard>
      <ProCard title="只读成员" bordered>
        仅拥有只读权限
      </ProCard>
      <ProCard title="谨慎操作" bordered>
        <Space direction="vertical" size={16} style={{ display: "flex" }}>
          {(teamAuths || []).map((item) => (
            <AuthConfItem item={item} key={item.id} />
          ))}
        </Space>
      </ProCard>
    </ProCard>
  );
};

const DeleteView = () => {
  const actionRef = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const params = useParams();

  const { runAsync: updateRecoverTeamDel } = useRequest(UpdateRecoverTeamDel, {
    manual: true,
  });

  const { runAsync: delTeamDelHistory } = useRequest(DelTeamDelHistory, {
    manual: true,
  });

  const columns = [
    {
      title: "头像",
      dataIndex: "photoUrl",
      valueType: "avatar",
      width: 48,
    },
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "网址",
      dataIndex: "domain",
      elips: true,
    },
    {
      title: "用户名",
      dataIndex: "userName",
      width: 120,
    },
    {
      title: "删除时间",
      dataIndex: "delTime",
      width: 200,
    },
    {
      title: "操作",
      width: 140,
      key: "option",
      valueType: "option",
      render: (_, record) => [
        <Popconfirm
          key="delete"
          title="删除网址"
          description="删除后不可恢复，是否继续？"
          onConfirm={async () => {
            try {
              await delTeamDelHistory({
                teamId: params.teamId,
                id: record.id,
              });
              actionRef.current.reloadAndRest();
            } catch (err) {
              messageApi.error(err.message);
            }
          }}
        >
          <a key="delete">删除</a>
        </Popconfirm>,
        <a
          key="editAuth"
          onClick={async () => {
            try {
              await updateRecoverTeamDel({
                teamId: params.teamId,
                id: record.id,
              });
              actionRef.current.reloadAndRest();
            } catch (err) {
              messageApi.error(err.message);
            }
          }}
        >
          恢复
        </a>,
      ],
    },
  ];
  return (
    <>
      {contextHolder}
      <ProTable
        search={false}
        options={false}
        ghost
        actionRef={actionRef}
        headerTitle="回收站"
        bordered
        columns={columns}
        scroll={{ x: true }}
        pagination={{ pageSize: PAGE_SIZE }}
        request={async ({ pageSize, current }) => {
          const res = await GetTeamDelHistorys({
            pageNum: current,
            pageSize,
            teamId: params.teamId,
          });
          const { rows = [], total = 0 } = res || {};
          return {
            data: rows,
            success: true,
            total,
          };
        }}
      />
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  height: 0;
  overflow-y: auto;
`;

export default () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: teamInfo, mutate } = useRequest(GetTeamInfo, {
    defaultParams: [{ teamId: params.teamId }],
  });

  return (
    <Content>
      <HeaderPanel
        title={
          <>
            <ToggleCollapsedBtn />
            <span>
              <Button
                type="text"
                icon={<LeftOutlined />}
                onClick={() => navigate(-1)}
              />
              {teamInfo?.title}
            </span>
          </>
        }
      />
      <Container>
        <TeamInfoContext.Provider value={{ teamInfo, mutate }}>
          <ProCard
            colSpan={{ sm: 24, md: 16, lg: 18 }}
            tabs={{
              items: [
                {
                  label: `基本设置`,
                  key: "base",
                  children: <BaseView />,
                },
                {
                  label: `团队成员`,
                  key: "team",
                  children: <TeamView />,
                },
                {
                  label: `权限配置`,
                  key: "auth",
                  children: <AuthView />,
                },
                {
                  label: `回收站`,
                  key: "delete",
                  children: <DeleteView />,
                },
              ],
              destroyInactiveTabPane: true,
            }}
          />
        </TeamInfoContext.Provider>
      </Container>
    </Content>
  );
};
