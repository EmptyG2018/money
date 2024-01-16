import { useState, useEffect, useRef } from "react";
import { App, Button, Drawer } from "antd";
import {
  ProCard,
  ProTable,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import {
  GetVipUserGroupProjects,
  GetAdminVipUserGroups,
  GetVipUserGroupCarKeyInfo,
  UpdateAdminVipUserGroup,
  UpdateVipUserGroupCardKeyLink,
} from "@services/vip";
import { PageContainer } from "@components/Container";

const ConfigBuyKeyLink = ({ groupId, open, onClose, ...props }) => {
  const app = App.useApp();
  const formRef = useRef();

  const { refresh: refreshVipUserGroupCarKeyInfo } = useRequest(
    () => GetVipUserGroupCarKeyInfo({ groupId }),
    {
      manual: true,
      onSuccess(groupInfo) {
        const { urlLink, remark } = groupInfo;
        formRef.current.setFieldsValue({
          urlLink,
          remark,
        });
      },
    }
  );

  const { runAsync: updateVipUserGroupCardKeyLink } = useRequest(
    UpdateVipUserGroupCardKeyLink,
    {
      manual: true,
    }
  );

  const submit = async (values) => {
    try {
      await updateVipUserGroupCardKeyLink({ groupId, ...values });
      app.message.success("保存成功！");

      onClose && onClose();
    } catch (err) {
      app.message.error(err.message);
    }
  };

  useEffect(() => {
    open && refreshVipUserGroupCarKeyInfo();
  }, [open]);

  return (
    <Drawer
      width={480}
      placement="right"
      title="配置购买卡密链接"
      open={open}
      destroyOnClose
      onClose={onClose}
      {...props}
    >
      <ProCard headerBordered>
        <ProForm
          formRef={formRef}
          onFinish={submit}
          submitter={{
            render: (_, __) => {
              return (
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              );
            },
          }}
        >
          <ProFormText
            label="卡密地址"
            width="lg"
            name="urlLink"
            rules={[
              {
                required: true,
                message: "请输入卡密地址",
              },
            ]}
          />
          <ProFormTextArea
            label="提示信息"
            width="lg"
            name="remark"
            rules={[
              {
                required: true,
                message: "请输入提示信息",
              },
            ]}
          />
        </ProForm>
      </ProCard>
    </Drawer>
  );
};

const VipUserGroupList = ({ projects }) => {
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "会员组",
      dataIndex: "groupTitle",
      editable: false,
    },
    {
      title: "时长",
      dataIndex: "dayTime",
      editable: false,
    },
    {
      title: "成本价",
      dataIndex: "defaultCost",
      valueType: "money",
      editable: false,
    },
    {
      title: "售卖价格",
      dataIndex: "defaultSellPrice",
      valueType: "money",
    },
    {
      title: "操作",
      width: 100,
      key: "option",
      valueType: "option",
      render: (_, record, __, action) => [
        <a
          key="configBuyKeyLink"
          onClick={() =>
            setConfigBuyKeyAction({ show: true, groupId: record.id })
          }
        >
          配置
        </a>,
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const app = App.useApp();
  const actionRef = useRef();
  const tabKey = useRef(projects[0].id);
  const [configBuyKeyAction, setConfigBuyKeyAction] = useState({
    show: false,
    groupId: null,
  });

  const { runAsync: getVipUserGroups } = useRequest(GetAdminVipUserGroups, {
    manual: true,
  });

  const { runAsync: updateAdminVipUserGroup } = useRequest(
    UpdateAdminVipUserGroup,
    { manual: true }
  );

  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        headerTitle="会员组列表"
        toolbar={{
          menu: {
            type: "tab",
            defaultActiveKey: tabKey.current,
            items: projects.map((item) => ({
              key: "" + item.id,
              label: item.name,
            })),
            onChange: (key) => {
              tabKey.current = key;
              actionRef.current?.reload();
            },
          },
        }}
        cardBordered
        search={false}
        pagination={false}
        request={async () => {
          const res = await getVipUserGroups({ projectId: tabKey.current });
          return { data: res, success: true };
        }}
        editable={{
          actionRender: (_, __, dom) => [dom.save, dom.cancel],
          onSave: async (rowKey, { defaultSellPrice }) => {
            try {
              await updateAdminVipUserGroup({
                groupId: rowKey,
                sellPrice: defaultSellPrice,
              });
              actionRef.current?.reload();
            } catch (err) {
              app.message.error(err.message);
            }
          },
        }}
      />
      <ConfigBuyKeyLink
        open={configBuyKeyAction.show}
        groupId={configBuyKeyAction.groupId}
        onClose={() =>
          setConfigBuyKeyAction({ ...configBuyKeyAction, show: false })
        }
      />
    </>
  );
};

const Component = () => {
  const { data: vipUserGroupProjects } = useRequest(GetVipUserGroupProjects);

  return (
    <PageContainer
      fixedHeader
      header={{
        title: "会员管理",
        style: { background: "#fff" },
      }}
    >
      {!!vipUserGroupProjects?.length && (
        <VipUserGroupList projects={vipUserGroupProjects} />
      )}
    </PageContainer>
  );
};

export default Component;
