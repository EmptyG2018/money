import { Dropdown, Button } from "antd";

const Component = () => {
  return (
    <>
      <Dropdown
        trigger="click"
        menu={{
          items: [
            {
              key: "1",
              label: "wthis",
            },
          ],
        }}
      >
        <Button type="primary">this is demo.</Button>
      </Dropdown>
    </>
  );
};

export default Component;
