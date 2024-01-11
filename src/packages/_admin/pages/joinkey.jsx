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
import { useRequest } from "ahooks";
import {
  GetCodeTypes,
  GetJoinKeyGroups,
  GetJoinKeys,
  GenerateRandJoinKey,
  ExportJoinKey,
  DelJoinkey,
} from "../../../services/key";
import useDownload from "../../../hooks/download";

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
  const { data: codeTypes } = useRequest(GetCodeTypes);
  const { data: joinKeyGroups } = useRequest(GetJoinKeyGroups);
  const { runAsync: getJoinKeys } = useRequest(GetJoinKeys, { manual: true });
  const { runAsync: generateRandJoinKey } = useRequest(GenerateRandJoinKey, {
    manual: true,
  });
  const { runAsync: exportJoinKey } = useRequest(ExportJoinKey, {
    manual: true,
  });
  const { runAsync: delJoinKey } = useRequest(DelJoinkey, { manual: true });

  const stateOptions = (codeTypes || []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const groupOptions = (joinKeyGroups || []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

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
          key="delete"
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
      await generateRandJoinKey(values);
      actionRef?.current?.reload();
      messageApi.success("生成成功!");
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const exportSubmit = async (values) => {
    try {
      const result = await exportJoinKey(values);
      messageApi.success("导出成功!");

      download(result, "会员卡_" + new Date().getTime() + ".xls");
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  const deleteRecord = async ({ id }) => {
    try {
      await delJoinKey({ ids: id });
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
            const res = await getJoinKeys({
              ...params,
              pageNum: current,
              pageSize,
            });
            const { rows = [], total = 0 } = res || {};
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
