import { useEffect, useRef } from "react";
import { Button, message } from "antd";
import {
  ProCard,
  ProTable,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import {
  GetAdminVipUserGroups,
  UpdateAdminVipUserGroup,
  BindVipUserGroupCardKey,
} from "@services/vip";
import { PageContainer } from "@components/Container";

const Component = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
      editable: false,
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
      render: (text, record, _, action) => [
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

  const formRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { refresh: refreshVipGroup, data: vipGroup } = useRequest(
    GetAdminVipUserGroups
  );
  const { runAsync: updateAdminVipUserGroup } = useRequest(
    UpdateAdminVipUserGroup,
    { manual: true }
  );
  const { runAsync: bindVipUserGroupCardKey } = useRequest(
    BindVipUserGroupCardKey,
    {
      manual: true,
    }
  );

  useEffect(() => {
    const { urlLink, remark } = vipGroup?.groupInfo || {};
    formRef.current.setFieldsValue({
      urlLink,
      remark,
    });
  }, [vipGroup]);

  const submit = async (values) => {
    try {
      await bindVipUserGroupCardKey(values);
      messageApi.success("绑定成功！");
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "会员管理",
          style: { background: "#fff" },
        }}
      >
        <ProTable
          columns={columns}
          rowKey="id"
          headerTitle="会员组列表"
          cardBordered
          search={false}
          pagination={false}
          editable={{
            actionRender: (row, config, dom) => [dom.save, dom.cancel],
            onSave: async (rowKey, data) => {
              try {
                await updateAdminVipUserGroup({
                  groupId: rowKey,
                  sellPrice: data.defaultSellPrice,
                });
                refreshVipGroup();
              } catch (err) {
                messageApi.error(err.message);
              }
            },
          }}
          dataSource={vipGroup?.groupList || []}
        />
        <br />
        <ProCard headerBordered>
          <ProForm
            formRef={formRef}
            onFinish={submit}
            submitter={{
              render: (props, dom) => {
                return (
                  <Button type="primary" htmlType="submit">
                    确认绑定
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
      </PageContainer>
    </>
  );
};

export default Component;
