import { message } from "antd";
import { ProCard, ProTable } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { GetConsumeRecord, GetFlowRecord } from "@services/statistics";
import { PageContainer } from "@components/Container";

const ConsumeRecord = () => {
  const { runAsync: getConsumeRecord } = useRequest(GetConsumeRecord);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
    },
    {
      title: "充值卡号",
      dataIndex: "code",
    },
    {
      title: "金额",
      dataIndex: "money",
      valueType: "money",
    },
    {
      title: "充值前的金额",
      dataIndex: "oldmoney",
      valueType: "money",
    },
    {
      title: "费用项目",
      dataIndex: "projectName",
    },
    {
      title: "支付状态",
      dataIndex: "typeName",
    },
    {
      title: "交易时间",
      dataIndex: "createTime",
    },
    {
      title: "交易备注",
      dataIndex: "remark",
    },
  ];

  return (
    <ProTable
      columns={columns}
      rowKey="id"
      headerTitle={false}
      ghost
      options={false}
      search={false}
      request={async ({ current, pageSize }) => {
        const res = await getConsumeRecord({
          pageNum: current,
          pageSize,
        });
        const { rows = [], total = 0 } = res || {};
        return { data: rows, success: true, total };
      }}
    />
  );
};

const FlowRecord = () => {
  const { runAsync: getFlowRecord } = useRequest(GetFlowRecord);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
    },
    {
      title: "充值卡号",
      dataIndex: "code",
    },
    {
      title: "金额",
      dataIndex: "money",
      valueType: "money",
    },
    {
      title: "充值前的金额",
      dataIndex: "oldmoney",
      valueType: "money",
    },
    {
      title: "费用项目",
      dataIndex: "projectName",
    },
    {
      title: "支付状态",
      dataIndex: "codeTypeName",
    },
    {
      title: "交易时间",
      dataIndex: "createTime",
    },
    {
      title: "交易备注",
      dataIndex: "remark",
    },
  ];

  return (
    <ProTable
      columns={columns}
      rowKey="id"
      headerTitle={false}
      ghost
      options={false}
      search={false}
      request={async ({ current, pageSize }) => {
        const res = await getFlowRecord({
          pageNum: current,
          pageSize,
        });
        const { rows = [], total = 0 } = res || {};
        return { data: rows, success: true, total };
      }}
    />
  );
};

const Component = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "流水账单",
          style: { background: "#fff" },
        }}
      >
        <ProCard
          headerBordered
          tabs={{
            items: [
              {
                key: "tab1",
                label: "消费记录",
                children: <ConsumeRecord />,
              },
              {
                key: "tab2",
                label: "流水记录",
                children: <FlowRecord />,
              },
            ],
          }}
        />
      </PageContainer>
    </>
  );
};

export default Component;
