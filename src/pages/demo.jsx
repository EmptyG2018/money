import { Dropdown, Button } from "antd";
import { useRequest } from "ahooks";
import { GetAgentProperty } from "../services/property";
import { useEffect, useState } from "react";
import { ProForm, ProFormMoney } from "@ant-design/pro-components";

const Component = () => {
  const [win, setWin] = useState(1);

  return (
    <>
      {win === 1 ? (
        <p onClick={() => setWin(2)}>www</p>
      ) : (
        <ProForm>
          <ProForm.Item>
            <ProFormMoney customSymbol="💰" />
          </ProForm.Item>
        </ProForm>
      )}
    </>
  );
};

export default Component;
