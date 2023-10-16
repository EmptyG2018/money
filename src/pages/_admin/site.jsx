import { useEffect, useRef } from "react";
import { Button, message } from "antd";
import {
  ProCard,
  PageContainer,
  ProTable,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { BindSiteCardKey } from "../../services/vip";
import { GetAdminSites, UpdateAdminSite } from "../../services/agent";

const Component = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
      editable: false,
    },
    {
      title: "名称",
      dataIndex: "name",
      editable: false,
    },
    {
      title: "成本价",
      dataIndex: "defaultCost",
      valueType: "money",
      editable: false,
    },
    {
      title: "售卖价格",
      dataIndex: "defaultSellPrice",
      valueType: "money",
    },
    {
      title: "操作",
      width: 100,
      key: "option",
      valueType: "option",
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const formRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { refresh: refreshAdminSite, data: site } = useRequest(GetAdminSites);
  const { runAsync: updateAdminSite } = useRequest(UpdateAdminSite, {
    manual: true,
  });
  const { runAsync: bindSiteCardKey } = useRequest(BindSiteCardKey, {
    manual: true,
  });

  useEffect(() => {
    const { urlLink, remark } = site?.domainInfo || {};
    formRef.current.setFieldsValue({
      urlLink,
      remark,
    });
  }, [site]);

  const submit = async (values) => {
    try {
      await bindSiteCardKey(values);
      messageApi.success("绑定成功！");
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
          title: "分站管理",
          style: { background: "#fff" },
        }}
      >
        <ProTable
          columns={columns}
          rowKey="id"
          headerTitle="分站列表"
          cardBordered
          search={false}
          pagination={false}
          editable={{
            actionRender: (row, config, dom) => [dom.save, dom.cancel],
            onSave: async (rowKey, data) => {
              try {
                await updateAdminSite({
                  id: rowKey,
                  sellPrice: data.defaultSellPrice,
                });
                refreshAdminSite();
              } catch (err) {
                messageApi.error(err.message);
              }
            },
          }}
          dataSource={site?.domainList || []}
        />
        <br />
        <ProCard headerBordered>
          <ProForm
            formRef={formRef}
            onFinish={submit}
            submitter={{
              render: (props, dom) => {
                return (
                  <Button type="primary" htmlType="submit">
                    确认绑定
                  </Button>
                );
              },
            }}
          >
            <ProFormText
              label="卡密地址"
              width="lg"
              name="urlLink"
              rules={[
                {
                  required: true,
                  message: "请输入卡密地址",
                },
              ]}
            />
            <ProFormTextArea label="提示信息" width="lg" name="remark" />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Component;
