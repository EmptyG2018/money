import { useRef } from "react";
import { App, Button, Alert, Popconfirm } from "antd";
import {
  ProCard,
  ProTable,
  ProForm,
  ProFormText,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import {
  GetDomains,
  DelDomain,
  CreateDomain,
  GetDomainNavigateLinks,
  UpdateDomainNavigateLink,
} from "@services/agent";
import { PageContainer } from "@components/Container";

const Component = () => {
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "域名",
      dataIndex: "domain",
      editable: false,
    },
    {
      title: "落地页",
      dataIndex: "goPathId",
      valueType: "select",
      renderText: (text) => text || "未配置",
      request: async () => {
        const navigateLinks = await getDomainNavigateLinks();
        return navigateLinks.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      },
      width: 140,
    },
    {
      title: "二级域名",
      dataIndex: "secondName",
      editable: false,
      width: 280,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      width: 220,
      editable: false,
    },
    {
      title: "操作",
      width: 120,
      key: "option",
      valueType: "option",
      render: (_, record, __, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="删除记录"
          description="您确定要删除此记录吗？"
          onConfirm={() => deleteRecord(record)}
        >
          <a key="delete">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const formRef = useRef();
  const actionRef = useRef();
  const app = App.useApp();
  const { runAsync: getDomains } = useRequest(GetDomains, { manual: true });
  const { runAsync: getDomainNavigateLinks } = useRequest(
    GetDomainNavigateLinks,
    { manual: true }
  );
  const { runAsync: updateDomainNavigateLink } = useRequest(
    UpdateDomainNavigateLink,
    { manual: true }
  );
  const { runAsync: createDomain } = useRequest(CreateDomain, { manual: true });
  const { runAsync: deleteDomain } = useRequest(DelDomain, { manual: true });

  const submit = async (values) => {
    try {
      await createDomain(values);
      actionRef.current?.reload();
    } catch (err) {
      app.message.error(err.message);
    }
  };

  const deleteRecord = async ({ id }) => {
    try {
      await deleteDomain({ id });
      actionRef.current?.reload();
    } catch (err) {
      app.message.error(err.message);
    }
  };

  return (
    <PageContainer
      fixedHeader
      header={{
        title: "域名管理",
        style: { background: "#fff" },
      }}
    >
      <ProCard headerBordered>
        <Alert
          message="绑定前请在域名DNS 设置中添加一条CNAME记录指向别名123pt.5zyyy.com"
          type="info"
          showIcon
        />
        <br />
        <ProForm
          formRef={formRef}
          onFinish={submit}
          submitter={{
            render: (_, __) => {
              return (
                <Button type="primary" htmlType="submit">
                  检测并保存
                </Button>
              );
            },
          }}
        >
          <ProFormText
            width="lg"
            name="domain"
            rules={[
              {
                required: true,
                message: "请输入域名",
              },
            ]}
            placeholder="自定义域名"
          />
        </ProForm>
      </ProCard>
      <br />
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        headerTitle="域名列表"
        cardBordered
        editable={{
          type: "single",
          actionRender: (_, __, dom) => [dom.save, dom.cancel],
          onSave: async (rowKey, { goPathId }) => {
            try {
              await updateDomainNavigateLink({ id: rowKey, goPathId });
              actionRef.current?.reload();
            } catch (err) {
              app.message.error(err.message);
            }
          },
        }}
        search={false}
        pagination={false}
        request={async () => {
          const domains = await getDomains();
          return { data: domains, success: true };
        }}
      />
    </PageContainer>
  );
};

export default Component;
