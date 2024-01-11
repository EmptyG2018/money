import { cloneElement, useEffect, useState, useMemo } from "react";
import { message } from "antd";
import {
  MoneyCollectOutlined,
  PayCircleOutlined,
  PoweroffOutlined,
  TransactionOutlined,
  AccountBookOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { PageContainer, StatisticCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { GetStatistics } from "../../../services/statistics";

const Component = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { data: stats } = useRequest(GetStatistics);

  const statsRender = useMemo(() => {
    const items = [
      {
        title: "可抵扣余额(元)",
        prefix: "¥",
        icon: <MoneyCollectOutlined />,
        color: "#4096ff",
        value: stats?.money,
      },
      {
        title: "累计收益",
        prefix: "¥",
        icon: <PayCircleOutlined />,
        color: "red",
        value: stats?.moneyCount,
      },
      {
        title: "累计注册用户",
        suffix: "个",
        icon: <PoweroffOutlined />,
        color: "#31b831",
        value: stats?.userCount,
      },
      {
        title: "累计成交",
        prefix: "¥",
        icon: <TransactionOutlined />,
        color: "orange",
        value: stats?.singularCount,
      },
      {
        title: "今日收入",
        prefix: "¥",
        icon: <AccountBookOutlined />,
        color: "#ff5de7",
        value: stats?.todayMoney,
      },
      {
        title: "今日成交单数",
        suffix: "个",
        icon: <FileDoneOutlined />,
        color: "#1677ff",
        value: stats?.todayCount,
      },
      {
        title: "昨日收入",
        prefix: "¥",
        icon: <AccountBookOutlined />,
        color: "#32cb96",
        value: stats?.yesdayMoney,
      },
      {
        title: "昨日成交单数",
        suffix: "个",
        icon: <FileDoneOutlined />,
        color: "#9b4dff",
        value: stats?.yesdayCount,
      },
    ];

    return items.map((item, index) => {
      return (
        <StatisticCard
          colSpan={{ xs: 24, sm: 12, md: 8, xl: 6 }}
          bordered
          statistic={{
            ...item,
            icon:
              item.icon &&
              cloneElement(item.icon, {
                style: { fontSize: "28px", color: item.color },
              }),
            color: undefined,
          }}
          key={index}
        />
      );
    });
  }, [stats]);

  return (
    <>
      {contextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "数据统计",
          style: { background: "#fff" },
        }}
      >
        <StatisticCard.Group wrap ghost gutter={[16, 16]}>
          {statsRender}
        </StatisticCard.Group>
      </PageContainer>
    </>
  );
};

export default Component;
