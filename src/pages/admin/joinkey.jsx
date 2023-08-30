import { useEffect, useRef, useState } from "react";
import { Button, message, Popconfirm, Popover } from "antd";
import { HourglassOutlined, ExportOutlined } from "@ant-design/icons";
import {
  PageContainer,
  ProTable,
  ProForm,
  ProFormDigit,
  ProFormSelect,
} from "@ant-design/pro-components";
import {
  GetCodeTypes,
  GetJoinKeyGroups,
  GetJoinKeys,
  GenerateRandJoinKey,
  ExportJoinKey,
  DelJoinkey,
} from "../../services/key";
import useDownload from "../../hooks/download";

const useUserGroupOption = () => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await GetJoinKeyGroups();
      setOptions(
        (res?.result || []).map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    })();
  }, []);
  return { options };
};

const useStateOption = () => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await GetCodeTypes();
      setOptions(
        (res?.result || []).map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    })();
  }, []);
  return { options };
};

const VipKeyFormRender = ({ groupOptions, onFinish }) => {
  return (
    <ProForm size="small" onFinish={(e) => onFinish && onFinish(e)}>
      <ProFormDigit
        name="num"
        placeholder="生成数量"
        rules={[
          {
            required: true,
            message: "请输入生成数量",
          },
        ]}
      />
      <ProFormSelect
        name="groupId"
        fieldProps={{ options: groupOptions }}
        placeholder="请选择用户组"
      />
    </ProForm>
  );
};

const ExportFormRender = ({ stateOptions, groupOptions, onFinish }) => {
  return (
    <ProForm size="small" onFinish={(e) => onFinish && onFinish(e)}>
      <ProFormSelect
        name="codeType"
        fieldProps={{ options: stateOptions }}
        placeholder="请选择状态"
      />
      <ProFormSelect
        name="groupId"
        fieldProps={{ options: groupOptions }}
        placeholder="请选择用户组"
      />
    </ProForm>
  );
};

const Component = () => {
  const actionRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { download } = useDownload();
  const { options: stateOptions } = useStateOption();
  const { options: groupOptions } = useUserGroupOption();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
      search: false,
    },
    {
      title: "卡密",
      dataIndex: "code",
    },
    {
      title: "用户组",
      dataIndex: "groupId",
      valueType: "select",
      fieldProps: {
        options: groupOptions,
      },
    },
    {
      title: "状态",
      dataIndex: "codeType",
      valueType: "select",
      fieldProps: {
        options: stateOptions,
      },
    },
    {
      title: "生成时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      search: false,
    },
    {
      title: "到期时间",
      dataIndex: "endTime",
      valueType: "dateTime",
      search: false,
    },
    {
      title: "使用人",
      dataIndex: "useUserName",
    },
    {
      title: "使用时间",
      dataIndex: "useTiem",
      search: false,
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

  const vipKeySubmit = async (values) => {
    try {
      await GenerateRandJoinKey(values);
      actionRef?.current?.reload();
      messageApi.success("生成成功!");
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const exportSubmit = async (values) => {
    try {
      const result = await ExportJoinKey(values);
      messageApi.success("导出成功!");

      download(result, "会员卡_" + new Date().getTime() + ".xls");
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const deleteRecord = async (record) => {
    try {
      await DelJoinkey({ ids: record.id });
      actionRef?.current?.reload();
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
          title: "加盟卡管理",
          style: { background: "#fff" },
        }}
      >
        <ProTable
          actionRef={actionRef}
          columns={columns}
          rowKey="id"
          headerTitle="加盟卡列表"
          request={async ({ current, pageSize, ...params }) => {
            const res = await GetJoinKeys({
              ...params,
              pageNum: current,
              pageSize,
            });
            const { rows = [], total = 0 } = res?.result || {};
            return {
              data: rows,
              success: true,
              total,
            };
          }}
          toolBarRender={() => [
            <Popover
              trigger="click"
              content={
                <VipKeyFormRender
                  groupOptions={groupOptions}
                  onFinish={vipKeySubmit}
                />
              }
            >
              <Button icon={<HourglassOutlined />} key="vipKey">
                生成加盟卡
              </Button>
            </Popover>,
            <Popover
              trigger="click"
              content={
                <ExportFormRender
                  stateOptions={stateOptions}
                  groupOptions={groupOptions}
                  onFinish={exportSubmit}
                />
              }
            >
              <Button icon={<ExportOutlined />} key="export">
                导出
              </Button>
            </Popover>,
          ]}
        />
      </PageContainer>
    </>
  );
};

export default Component;
