import { useEffect, useRef, useState } from "react";
import { Button, message, Popconfirm, Popover } from "antd";
import { HourglassOutlined, ExportOutlined } from "@ant-design/icons";
import {
 
  ProTable,
  ProForm,
  ProFormDigit,
  ProFormSelect,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import {
  GetCodeTypes,
  GetJoinKeyGroups,
  GetDlidUserList,
  GenerateRandJoinKey,
  ExportJoinKey,
  DelJoinkey,
} from "@services/key";
import useDownload from "@hooks/download";
import { PageContainer } from "@components/Container";

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
  const { runAsync: getDlidUserList } = useRequest(GetDlidUserList, { manual: true });
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
      title: "加盟商",
      dataIndex: "userName",
    },
    {
      title: "站点名称",
      dataIndex: "webname",
    },
    {
      title: "加盟时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      search: false,
    },


  ];



  return (
    <>
      {contextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "加盟商管理",
          style: { background: "#fff" },
        }}
      >
        <ProTable
          actionRef={actionRef}
          columns={columns}
          rowKey="id"
          headerTitle="加盟商管理"
          request={async ({ current, pageSize, ...params }) => {
            const res = await getDlidUserList({
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

        />
      </PageContainer>
    </>
  );
};

export default Component;
