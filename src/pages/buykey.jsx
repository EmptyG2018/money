import { useState } from "react";
import { Input, Button, Card, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useUser } from "../hooks/user";
import { GetVipUserGroups, BuyVipUserGroupCardKey } from "../services/vip";
import styled, { css } from "styled-components";

const ComponentRoot = styled.div`
  height: 100vh;
  background-color: #1677ff;
`;

const Container = styled.div`
  max-width: 1152px;
  margin: 0 auto;
`;

const Main = styled.div`
  display: flex;
`;

const Side = styled.div`
  display: flex;
  flex: 1 0 0;
  width: 0;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const BgAnimated = styled(Side)`
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

const FormCard = styled(Card)`
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

const BuySelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin-block-end: 16px;
  user-select: none;
`;
const BuyOption = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #c1c1c1;
  padding: 16px;
  gap: 8px;
  border-radius: 6px;
  color: #333;

  ${({ checked }) =>
    checked &&
    css`
      border-color: #1677ff;
      color: #1677ff;
      background-color: #d5e6fd;
    `}
`;

const BuyLabel = styled.span``;

const BuyMoney = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const Component = () => {
  const [key, setKey] = useState("");
  const [checkedBuy, setCheckedBuy] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useUser();
  const { data: vipUserGroups } = useRequest(GetVipUserGroups);
  const { runAsync: buyVipUserGroupCardKey } = useRequest(
    BuyVipUserGroupCardKey,
    {
      manual: true,
    }
  );

  const submit = async () => {
    if (!checkedBuy) return messageApi.warning("请选择会员级别");
    if (!key) return messageApi.warning("请输入卡密");
    try {
      await buyVipUserGroupCardKey({ groupId: checkedBuy.id, code: key });
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <ComponentRoot>
        <Container>
          <Main>
            <BgAnimated>
              <p>
                :)
                享受独家特权、优质内容和个性化服务，加入会员社区，探索无限可能！
              </p>
            </BgAnimated>
            <Side>
              <FormCard bordered={false}>
                <CardTop>
                  <Title>开通VIP会员组</Title>
                  <Description>
                    享受独家特权、优质内容和个性化服务，加入会员社区，探索无限可能！
                  </Description>
                  {user && (
                    <UserInfo>
                      <UserOutlined /> {user.username}・{user.groupTitle}
                    </UserInfo>
                  )}
                </CardTop>
                <BuySelect>
                  {(vipUserGroups?.groupList || []).map((item) => (
                    <BuyOption
                      key={item.id}
                      checked={checkedBuy?.id === item.id}
                      onClick={() => setCheckedBuy(item)}
                    >
                      <BuyLabel>
                        {item.groupTitle}・{item.dayTime}天
                      </BuyLabel>
                      <BuyMoney>{item.defaultSellPrice}元</BuyMoney>
                    </BuyOption>
                  ))}
                </BuySelect>
                <Input.Password
                  value={key}
                  size="large"
                  placeholder="卡密"
                  style={{ marginBlockEnd: "24px" }}
                  onChange={(e) => setKey(e.target.value)}
                />
                <Button type="primary" size="large" block onClick={submit}>
                  确认购买
                </Button>
              </FormCard>
            </Side>
          </Main>
        </Container>
      </ComponentRoot>
    </>
  );
};

export default Component;
