import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProCard
} from "@ant-design/pro-components";
import { styled } from "styled-components";

const PageInner = styled.div`
  background-color: red;
`;

const Component = () => {
  return (
    <PageContainer title={false}>
      <ProCard>
        <ProForm
          labelAlign="top"
          labelWidth="auto"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建表单
            </Button>
          }
          onFinish={(values) => {
            console.log(values);
          }}
          initialValues={{
            name: "蚂蚁设计有限公司",
            useMode: "chapter",
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label="分站名称"
              placeholder="请输入网站地址"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText width="md" name="company" label="自定前缀" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label="分站名称"
              placeholder="请输入网站地址"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText width="md" name="company" label="自定前缀" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label="分站名称"
              placeholder="请输入网站地址"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText width="md" name="company" label="自定前缀" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label="分站名称"
              placeholder="请输入网站地址"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText width="md" name="company" label="自定前缀" />
          </ProForm.Group>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default Component;
