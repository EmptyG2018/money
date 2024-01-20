import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Flex, App, Input, Button, Card, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  GetVipUserGroupsByProject,
  BuyVipUserGroupCardKey,
} from "../services/vip";
import { useUser } from "@hooks/user";
import { Container } from "@components/Container";
import AuthNavigator from "@components/AuthNavigator";
import styled, { css } from "styled-components";

const BuySelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin-block-end: 16px;
  user-select: none;
`;
const BuyOption = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ $color }) => $color};
  padding: 16px;
  gap: 8px;
  border-radius: 6px;
  color: ${({ $color }) => $color};

  ${({ checked }) =>
    checked &&
    css`
      color: #fff;
      background-color: ${({ $color }) => $color};
    `}
`;

const BuyMoney = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const BuyOptions = ({ buyKey, options, onChange }) => {
  return (
    <BuySelect>
      {options.map((item) => (
        <BuyOption
          $color={item.color}
          key={item.id}
          checked={buyKey === item.id}
          onClick={() => onChange && onChange(item.id)}
        >
          {item.groupTitle}・{item.dayTime}天
          <BuyMoney>{item.defaultSellPrice}元</BuyMoney>
        </BuyOption>
      ))}
    </BuySelect>
  );
};

const VipGroupTabbar = ({ items, buyKey, onBuyKeyChange, onChange }) => {
  const [activeKey, setActiveKey] = useState("");

  useEffect(() => {
    items.length && setActiveKey("" + items[0].id);
  }, [items]);

  return (
    <Tabs
      centered
      activeKey={activeKey}
      items={items.map((item) => ({
        key: "" + item.id,
        label: item.name,
        children: (
          <BuyOptions
            buyKey={buyKey}
            options={item.list}
            onChange={onBuyKeyChange}
          />
        ),
      }))}
      onChange={(key) => {
        setActiveKey(key);
        onChange && onChange(key);
      }}
    />
  );
};

const Tips = styled.div`
  margin-top: -12px;
  margin-bottom: 24px;
`;

const VipUserForm = () => {
  const app = App.useApp();
  const [searchParams] = useSearchParams();
  const [buyKey, setBuyKey] = useState("");
  const [key, setKey] = useState("");

  const { data: vipUserKeyProject } = useRequest(GetVipUserGroupsByProject, {
    defaultParams: [{ projectId: searchParams.get("id") }],
  });

  const { run: buyVipUserGroupCardKey } = useRequest(
    () => BuyVipUserGroupCardKey({ groupId: buyKey, code: key }),
    {
      manual: true,
      onError(err) {
        app.message.error(err.message);
      },
    }
  );

  const checkedOption = useMemo(() => {
    if (!vipUserKeyProject?.result) return false;
    if (!buyKey) return false;
    return []
      .concat(...vipUserKeyProject.result.map((item) => item.list))
      .find((item) => item.id === buyKey);
  }, [vipUserKeyProject, buyKey]);

  const submit = () => {
    if (!buyKey) return app.message.warning("请选择会员级别");
    if (!key) return app.message.warning("请输入卡密");
    buyVipUserGroupCardKey();
  };

  return (
    <>
      <VipGroupTabbar
        items={vipUserKeyProject?.result || []}
        buyKey={buyKey}
        onBuyKeyChange={setBuyKey}
        onChange={() => setBuyKey("")}
      />
      <Input.Password
        value={key}
        size="large"
        placeholder="卡密"
        style={{ marginBlockEnd: "24px" }}
        onChange={(e) => setKey(e.target.value)}
      />
      {checkedOption && (
        <Tips>
          <a target="_blank" href={checkedOption.urlLink}>
            {checkedOption.remark}
          </a>
        </Tips>
      )}
      <AuthNavigator>
        <Button
          disabled={!buyKey || !key}
          type="primary"
          size="large"
          block
          onClick={submit}
        >
          确认购买
        </Button>
      </AuthNavigator>
    </>
  );
};

const VipFormSide = styled.div`
  display: flex;
  flex: 1 0 0;
  width: 0;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const VipFormCard = styled(Card)`
  max-width: 340px;
  @media (min-width: 601px) {
    & {
      max-width: 375px;
    }
  }
`;

const CardTop = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const Description = styled.div`
  margin-block-start: 12px;
  margin-block-end: 16px;
  font-size: 15px;
`;

const UserInfo = styled.span`
  display: inline-block;
  font-size: 12px;
  color: #555;
  background-color: #ddd;
  padding: 4px 12px;
  border-radius: 999px;
  margin-block-end: 16px;
`;

const VipUserGroup = () => {
  const { user } = useUser();

  return (
    <VipFormSide>
      <VipFormCard bordered={false}>
        <CardTop>
          <Title>开通VIP会员组</Title>
          <Description>
            享受独家特权、优质内容和个性化服务，加入会员社区，探索无限可能！
          </Description>
          {!!user && (
            <UserInfo>
              <UserOutlined /> {user.username}・{user.groupTitle}
            </UserInfo>
          )}
        </CardTop>
        <VipUserForm />
      </VipFormCard>
    </VipFormSide>
  );
};

const ComponentRoot = styled.div`
  height: 100vh;
  background-color: #1677ff;
`;

const BgAnimated = styled(VipFormSide)`
  display: none;
  @media (min-width: 801px) {
    & {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: 12px;
      font-size: 32px;
      line-height: 1.7;
      color: #83b7ff;
    }
  }
`;

const Component = () => {
  return (
    <ComponentRoot>
      <Container>
        <Flex>
          <BgAnimated>
            <p>
              :)
              享受独家特权、优质内容和个性化服务，加入会员社区，探索无限可能！
            </p>
          </BgAnimated>
          <VipUserGroup />
        </Flex>
      </Container>
    </ComponentRoot>
  );
};

export default Component;
