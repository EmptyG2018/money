import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormRadio,
  ProCard,
} from "@ant-design/pro-components";
import { styled } from "styled-components";

const PageInner = styled.div`
  background-color: red;
`;

const Component = () => {
  return (
    <PageContainer title={false}>
      <ProCard title="申请加盟">
        <ProForm
          layout="horizontal"
          onFinish={(values) => {
            console.log(values);
          }}
          initialValues={{
            name: "蚂蚁设计有限公司",
            useMode: "chapter",
          }}
        >
          <ProFormRadio.Group
            name="radio-group"
            label="分站版本"
            radioType="button"
            options={[
              {
                label: "初级站长¥1899",
                value: "a",
              },
              {
                label: "创业合伙人¥1877",
                value: "b",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="name"
            label="分站名称"
            placeholder="请输入网站地址"
          />
          <ProForm.Group title="二级域名">
            <ProFormText width="xs" name="company" label="自定前缀" />
            <ProFormRadio.Group
              name="radio-group"
              label="选择后缀"
              radioType="button"
              options={[
                {
                  label: "aya84.com",
                  value: "a",
                },
                {
                  label: "baidu.com",
                  value: "b",
                },
              ]}
            />
          </ProForm.Group>
          <ProForm.Group title="账号管理">
            <ProFormText width="sm" name="company" label="绑定微信" />
            <ProFormText width="sm" name="company" label="绑定QQ" />
            <ProFormText width="sm" name="company" label="输入卡密" />
          </ProForm.Group>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default Component;
