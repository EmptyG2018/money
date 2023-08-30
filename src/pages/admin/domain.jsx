import { useEffect, useRef } from "react";
import { Button, Alert, message, Popconfirm } from "antd";
import {
  ProCard,
  PageContainer,
  ProTable,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useUpdateSiteCardKey } from "../../hooks/cardKey";
import { useYuMing, useAddYuMing, useDelYuMing } from "../../hooks/yuming";

const Component = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
    },
    {
      title: "域名",
      dataIndex: "domain",
    },
    {
      title: "二级域名",
      dataIndex: "secondName",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "dateTime",
    },
    {
      title: "操作",
      width: 100,
      key: "option",
      valueType: "option",
      render: (text, record, _, action) => [
        <Popconfirm
          title="删除记录"
          description="您确定要删除此记录吗？"
          onConfirm={() => deleteRecord(record)}
        >
          <a key="delete">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const formRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { data: yuming, mutate } = useYuMing();
  const { create: createDomain } = useAddYuMing();
  const { delete: deleteDomain } = useDelYuMing();
  const domains = yuming?.result || [];

  const submit = async (values) => {
    try {
      await createDomain({ ...values });
      mutate();
      formRef.current?.resetFields();
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const deleteRecord = async (record) => {
    try {
      await deleteDomain({ id: record.id });
      mutate();
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "域名管理",
          style: { background: "#fff" },
        }}
      >
        <ProCard headerBordered>
          <Alert
            message="绑定前请在域名DNS 设置中添加一条CNAME记录指向别名8376e98599001ac1.kanclouds.cn"
            type="info"
            showIcon
          />
          <br />
          <ProForm
            formRef={formRef}
            onFinish={submit}
            submitter={{
              render: (props, dom) => {
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
          columns={columns}
          rowKey="id"
          headerTitle="域名列表"
          cardBordered
          search={false}
          pagination={false}
          dataSource={domains}
        />
      </PageContainer>
    </>
  );
};

export default Component;
