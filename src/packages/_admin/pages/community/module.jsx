import { useRef } from "react";
import { message } from "antd";
import { ProTable } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { GetModules, UpdateModule } from "@services/community/module";
import { PageContainer } from "@components/Container";

const Component = () => {
  const actionRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { runAsync: getModules } = useRequest(GetModules, { manual: true });
  const { runAsync: updateModule } = useRequest(UpdateModule, { manual: true });

  const columns = [
    {
      title: "模块名称",
      dataIndex: "name",
    },
    {
      title: "排序",
      dataIndex: "displayorder",
      width: 120,
      valueType: "digit",
    },
    {
      title: "显示",
      dataIndex: "status",
      width: 72,
      valueType: "select",
      fieldProps: {
        options: [
          {
            label: "开启",
            value: 0,
          },
          {
            label: "关闭",
            value: 1,
          },
        ],
      },
    },
    {
      title: "操作",
      width: 100,
      key: "option",
      valueType: "option",
      render: (_, record, __, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.fid);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const saveModuleField = async (record) => {
    try {
      await updateModule(record);
      messageApi.success("保存成功！");
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
          title: "模块管理",
          style: { background: "#fff" },
        }}
      >
        <ProTable
          actionRef={actionRef}
          columns={columns}
          rowKey="fid"
          headerTitle="模块列表"
          search={false}
          pagination={false}
          request={async () => {
            const res = await getModules();
            return {
              data: res || [],
              success: true,
              total: res?.length || 0,
            };
          }}
          editable={{
            actionRender: (_, __, dom) => [dom.save, dom.cancel],
            onSave: async (_, { children, ...record }) => {
              try {
                await updateModule(record);
                actionRef.current?.reload();
              } catch (err) {
                messageApi.error(err.message);
              }
            },
          }}
        />
      </PageContainer>
    </>
  );
};

export default Component;
