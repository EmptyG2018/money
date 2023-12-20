import { cloneElement, memo, useState } from "react";
import { Button, Dropdown, Tooltip } from "antd";

const Child = ({ key }) => {
  const [text, setText] = useState("moren");

  console.log(key);

  return (
    <>
      <button onClick={() => setText("child")}>{text}</button>
    </>
  );
};

const SS = memo(Child);

const Component = () => {
  const [text, setText] = useState("xt1");

  return (
    <>
      <button onClick={() => setText(Math.random())}>{text}</button>
      <SS keys={text} />
    </>
  );
};

export default Component;
