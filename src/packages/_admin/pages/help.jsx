import { useState, useRef, cloneElement, useEffect } from "react";
import { Button, Image, Input, Popover, Typography, message } from "antd";
import {
  RadiusUpleftOutlined,
  BorderLeftOutlined,
  RadiusBottomleftOutlined,
  RadiusUprightOutlined,
  BorderRightOutlined,
  RadiusBottomrightOutlined,
} from "@ant-design/icons";
import {
  ProCard,
  ProForm,
  ProFormRadio,
  EditableProTable,
} from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useRequest } from "ahooks";
import {
  GetAgentHelpSetting,
  GetAgentHelpOption,
  UpdateAgentHelpSetting,
} from "@services/setting";
import { PageContainer } from "@components/Container";

const LocationIconRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const LOCATION_ICON_MAP = {
  左上角: <RadiusUpleftOutlined />,
  右上角: <RadiusUprightOutlined />,
  左中: <BorderLeftOutlined />,
  右中: <BorderRightOutlined />,
  左下角: <RadiusBottomleftOutlined />,
  右下角: <RadiusBottomrightOutlined />,
};

const CoverInput = ({ value, ...props }) => {
  return (
    <Popover
      content={<Input placeholder="封面地址" value={value} {...props} />}
    >
      {value ? (
        <Image src={value} width={56} height={56} preview={false} />
      ) : (
        <Typography.Link>配置封面</Typography.Link>
      )}
    </Popover>
  );
};

const LocationIcon = ({ icon, title, ...props }) => {
  return (
    <LocationIconRoot {...props}>
      <span>{icon}</span>
      <span>{title}</span>
    </LocationIconRoot>
  );
};

const Component = () => {
  const formRef = useRef(null);
  const [editableKeys, setEditableKeys] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: iconOptions } = useRequest(() =>
    GetAgentHelpOption({ pid: 1 })
  );
  const { data: locationOptions } = useRequest(() =>
    GetAgentHelpOption({ pid: 7 })
  );
  const { data: accountTypeOptions } = useRequest(() =>
    GetAgentHelpOption({ pid: 14 })
  );
  const { refresh: refreshHelpSetting, data: helpSetting } =
    useRequest(GetAgentHelpSetting);

  useEffect(() => {
    if (helpSetting) {
      const { info, customer } = helpSetting;
      formRef.current.setFieldsValue({
        state: info?.state,
        iconType: info?.iconType,
        styleType: info?.styleType,
        customer: customer,
      });
    }
  }, [helpSetting]);

  useEffect(() => {
    helpSetting &&
      setEditableKeys(helpSetting?.customer.map((item) => item.id));
  }, [helpSetting]);

  const submit = async (values) => {
    const { customer, ...props } = values;

    const payload = JSON.stringify({
      list: customer.map((item) => {
        const { id, ...props } = item;
        return { ...props };
      }),
      ...props,
    });

    try {
      await UpdateAgentHelpSetting({ json: payload });
      messageApi.success("保存成功");

      refreshHelpSetting();
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const columns = [
    {
      title: "联系方式",
      dataIndex: "accountType",
      valueType: "select",
      fieldProps: {
        options: (accountTypeOptions || []).map((item) => ({
          label: item.name,
          value: item.id,
        })),
      },
    },
    {
      title: "内容",
      dataIndex: "textvalue",
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
    {
      title: "封面",
      dataIndex: "url",
      renderFormItem: () => <CoverInput />,
      width: 140,
    },
    {
      title: "操作",
      valueType: "option",
      width: 64,
    },
  ];
  return (
    <>
      {contextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "配置客服",
          style: { background: "#fff" },
        }}
      >
        <ProCard>
          <ProForm
            formRef={formRef}
            layout="horizontal"
            onFinish={submit}
            submitter={{
              render: (props, dom) => {
                return (
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                );
              },
            }}
          >
            <ProForm.Group title="图标显隐">
              <ProFormRadio.Group
                name="state"
                options={[
                  {
                    label: "开启",
                    value: 1,
                  },
                  {
                    label: "关闭",
                    value: 0,
                  },
                ]}
                rules={[{ required: true, message: "请选择" }]}
              />
            </ProForm.Group>
            <ProForm.Group title="图标风格">
              <ProFormRadio.Group
                name="iconType"
                options={(iconOptions || []).map((item) => ({
                  label: (
                    <Image
                      src={item.value}
                      style={{
                        width: "48px",
                        height: "48px",
                        marginRight: "12px",
                        marginBottom: "12px",
                      }}
                      preview={false}
                    />
                  ),
                  value: item.id,
                }))}
                rules={[{ required: true, message: "请选择" }]}
              />
            </ProForm.Group>
            <ProForm.Group title="显示位置">
              <ProFormRadio.Group
                name="styleType"
                options={(locationOptions || []).map((item) => ({
                  label: (
                    <LocationIcon
                      style={{ marginRight: "16px", marginBottom: "16px" }}
                      icon={cloneElement(LOCATION_ICON_MAP[item.name], {
                        style: { fontSize: "24px" },
                      })}
                      title={item.name}
                    />
                  ),
                  value: item.id,
                }))}
                rules={[{ required: true, message: "请选择" }]}
              />
            </ProForm.Group>
            <ProForm.Group title="填写客服微信、QQ号或手机号等">
              <ProForm.Item name="customer" noStyle>
                <EditableProTable
                  rowKey="id"
                  toolBarRender={false}
                  columns={columns}
                  controlled
                  recordCreatorProps={{
                    newRecordType: "dataSource",
                    position: "bottom",
                    record: () => ({
                      id: Date.now(),
                    }),
                  }}
                  editable={{
                    type: "multiple",
                    editableKeys,
                    onChange: setEditableKeys,
                    actionRender: (row, _, dom) => {
                      return [dom.delete];
                    },
                  }}
                />
              </ProForm.Item>
            </ProForm.Group>
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Component;
