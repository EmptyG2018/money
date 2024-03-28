import { useState, useRef, useEffect } from 'react';
import { Input, Button, Modal, Flex, App } from 'antd';
import {
  PlusOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  GetTeamCategorys,
  AddTeamCategory,
  UpdateTeamCategory,
  DeleteTeamCategory,
} from '@services/collection/team';
import styled from 'styled-components';

// 显示文字最大长度
const MAX_ELLIPSIS_LEN = 16;

const TeamTextInput = styled(Input)`
  width: 120px;
`;

const TeamAddInputTag = ({ onEnter }) => {
  const [cacheValue, setCacheValue] = useState('');
  const [editable, setEditable] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    editable && inputRef.current?.focus();
  }, [editable]);

  return editable ? (
    <TeamTextInput
      size="small"
      ref={inputRef}
      value={cacheValue}
      placeholder="请输入分类"
      onChange={(e) => setCacheValue(e.target.value)}
      onBlur={() => {
        setEditable(false);
        onEnter(cacheValue);
      }}
      onPressEnter={() => {
        setEditable(false);
        onEnter(cacheValue);
      }}
    />
  ) : (
    <Button
      size="small"
      icon={<PlusOutlined style={{ fontSize: 12 }} />}
      onClick={(e) => {
        setEditable(true);
        setCacheValue('');
        e.preventDefault();
      }}
    >
      创建分类
    </Button>
  );
};

const TeamInputTag = ({
  readonly = false,
  showCloseIcon = true,
  selected,
  value,
  onEdit,
  onClose,
  onClick,
}) => {
  const [cacheValue, setCacheValue] = useState('');
  const [editable, setEditable] = useState(false);
  const inputRef = useRef();

  const title =
    value.length > MAX_ELLIPSIS_LEN
      ? `${value.slice(0, MAX_ELLIPSIS_LEN)}...`
      : value;

  useEffect(() => {
    editable && inputRef.current?.focus();
  }, [editable]);

  return editable ? (
    <TeamTextInput
      size="small"
      ref={inputRef}
      value={cacheValue}
      placeholder="请输入分类"
      onChange={(e) => setCacheValue(e.target.value)}
      onBlur={() => {
        setEditable(false);
        onEdit(cacheValue);
      }}
      onPressEnter={() => {
        setEditable(false);
        onEdit(cacheValue);
      }}
    />
  ) : (
    <Button
      size="small"
      type={selected ? 'primary' : 'default'}
      onClick={onClick}
      onDoubleClick={(e) => {
        if (!readonly) {
          setEditable(true);
          setCacheValue(value);
        }
        e.preventDefault();
      }}
    >
      {title}
      {showCloseIcon && (
        <CloseOutlined style={{ fontSize: 12 }} onClick={onClose} />
      )}
    </Button>
  );
};

const TeamCategoryList = ({
  activeKey,
  items,
  onEdit,
  onAdd,
  onClose,
  onActiveChange,
}) => {
  return (
    <Flex gap={4} wrap="wrap">
      <TeamInputTag
        selected={activeKey === ''}
        readonly
        value="全部"
        key=""
        showCloseIcon={false}
        onClick={() => activeKey !== '' && onActiveChange('')}
      />
      {items.map((item) => (
        <TeamInputTag
          selected={item.id === activeKey}
          value={item.title}
          key={item.id}
          onEdit={(newValue) => onEdit(newValue, item.id, item)}
          onClose={() => onClose(item.id, item)}
          onClick={() => activeKey !== item.id && onActiveChange(item.id)}
        />
      ))}
      <TeamAddInputTag onEnter={onAdd} />
    </Flex>
  );
};

const TeamCategoryContainer = ({ teamId, activeKey, onActiveChange }) => {
  const app = App.useApp();

  const { runAsync: addTeamCategory } = useRequest(AddTeamCategory, {
    mutate: true,
    onSuccess() {
      refreshTeamCategorys();
    },
  });

  const { runAsync: deleteTeamCategory } = useRequest(DeleteTeamCategory, {
    manual: true,
    onSuccess() {
      refreshTeamCategorys();
    },
  });

  const { runAsync: updateTeamCategory } = useRequest(UpdateTeamCategory, {
    mutate: true,
    onSuccess() {
      refreshTeamCategorys();
    },
  });

  const { data: teamCategorys, refresh: refreshTeamCategorys } = useRequest(
    () => GetTeamCategorys({ teamId })
  );

  if (!teamCategorys) return null;

  const addRecord = async (newValue) => {
    if (!newValue.trim()) return;

    try {
      await addTeamCategory({ teamId, title: newValue });
    } catch (err) {
      app.message.error(err.message);
    }
  };

  const deleteRecord = (id) => {
    Modal.confirm({
      title: '您确定要删除分类吗？',
      icon: <ExclamationCircleFilled />,
      content: '删除后，无法恢复',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteTeamCategory({ teamId, id });
        } catch (err) {
          app.message.error(err.message);
        }
      },
    });
  };

  const editRecord = async (newValue, _, record) => {
    try {
      await updateTeamCategory({
        teamId: record.teamId,
        title: newValue,
        id: record.id,
      });
    } catch (err) {
      app.message.error(err.message);
    }
  };

  return (
    <TeamCategoryList
      activeKey={activeKey}
      items={teamCategorys}
      onAdd={addRecord}
      onEdit={editRecord}
      onClose={deleteRecord}
      onActiveChange={onActiveChange}
    />
  );
};

export default TeamCategoryContainer;
