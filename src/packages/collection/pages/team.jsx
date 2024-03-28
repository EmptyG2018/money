import {
  Fragment,
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext,
  createContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Space,
  Avatar,
  Button,
  Checkbox,
  Pagination,
  Popconfirm,
  Modal,
  message,
} from 'antd';
import {
  SettingOutlined,
  FlagOutlined,
  LogoutOutlined,
  HighlightOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import {
  GetTeamWebsites,
  DelTeamWebsites,
  UpdateTeamWebsite,
} from '@services/website';
import {
  CreateTeam,
  GetMyTeams,
  UpdateLogoutTeam,
} from '@services/collection/team';
import { JoinTeamPlaza } from '@services/collection/plaza';
import { HeaderPanel } from '@components/collection/HeaderPanel';
import { Mark } from '@components/collection/Mark';
import {
  CreateTeamFormModal,
  WebsiteEditFormModal,
} from '@components/collection/TeamFormAction';
import { PlazaFormModal } from '@components/collection/FavoriteFormAction';
import ToggleCollapsedBtn from '@components/collection/ToggleCollapsedBtn';
import TeamCategory from '@package_collection/components/team/TeamCategory';
import styled from 'styled-components';

const PAGE_SIZE = 16;

const TeamConext = createContext({});

const ActionPanelRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.06);
`;

const ActionExtra = styled.div`
  display: flex;
  flex: 1 0 0;
  justify-content: flex-end;
  margin-inline-start: 16px;
`;

const ActionPanel = ({
  title,
  checkAll,
  indeterminate,
  onSelect,
  actions = [],
}) => (
  <ActionPanelRoot>
    <span>
      <Checkbox
        style={{ marginInlineEnd: 6 }}
        checked={checkAll}
        indeterminate={indeterminate}
        onChange={onSelect}
      />
      {title}
    </span>
    <ActionExtra>
      <Space>
        {(actions || []).map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </Space>
    </ActionExtra>
  </ActionPanelRoot>
);

const MarkMain = styled.div`
  height: calc(100vh - 258px);
  overflow-y: auto;
`;

const MarkLayoutCard = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(calc(50% - 32px), 254px), 1fr)
  );
  grid-template-rows: 1fr;
  padding: 16px;
`;

const MarkView = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { currentTeam } = useContext(TeamConext);
  const [editKeys, setEditKeys] = useState([]);
  const [categoryKey, setCategoryKey] = useState('');
  const [websiteFormModal, setWebsiteFormModal] = useState({
    open: false,
    record: null,
  });
  const [pageNum, setPageNum] = useState(1);

  const { refresh: refreshWebsites, data: website } = useRequest(
    () =>
      GetTeamWebsites({ teamId: currentTeam.id, pageNum, pageSize: PAGE_SIZE }),
    {
      refreshDeps: [currentTeam, pageNum],
    }
  );

  const { runAsync: updateWebsite } = useRequest(UpdateTeamWebsite, {
    manual: true,
  });

  const { runAsync: delWebsites } = useRequest(DelTeamWebsites, {
    manual: true,
  });

  const isEdit = !!editKeys.length;

  const selectionState = useMemo(() => {
    let checkAll, indeterminate;
    let checkCount = 0;

    if (!website?.rows.length || !editKeys.length)
      return { checkAll: false, indeterminate: false };

    for (let i = 0, j = website.rows.length; i < j; i++) {
      if (editKeys.includes(website.rows[i].id)) checkCount++;
    }
    const isAll = checkCount === website.rows.length;

    checkAll = isAll;
    indeterminate = !isAll && checkCount !== 0;

    return { checkAll, indeterminate };
  }, [website, editKeys]);

  return (
    <>
      {contextHolder}
      <ActionPanel
        checkAll={selectionState.checkAll}
        indeterminate={selectionState.indeterminate}
        title={
          <>
            <span>{`已选中(${editKeys.length})`}</span>
            <TeamCategory
              activeKey={categoryKey}
              teamId={currentTeam.id}
              onActiveChange={setCategoryKey}
            />
          </>
        }
        actions={[
          <Button
            disabled={!editKeys.length}
            onClick={() => {
              Modal.confirm({
                title: '删除网址',
                content: '您确认删除所选中的书签吗？',
                okType: 'danger',
                onOk: async (close) => {
                  try {
                    await delWebsites({
                      teamId: currentTeam.id,
                      ids: editKeys.join(','),
                    });
                    close();

                    refreshWebsites();
                    setEditKeys([]);
                  } catch (err) {
                    messageApi.error(err.message);
                  }
                },
              });
            }}
          >
            删除网址
          </Button>,
          <Button
            disabled={!editKeys.length}
            onClick={() => {
              Modal.confirm({
                title: '删除网址',
                content: '您确认删除所选中的书签吗？',
                okType: 'danger',
                onOk: async (close) => {
                  try {
                    await delWebsites({
                      teamId: currentTeam.id,
                      ids: editKeys.join(','),
                    });
                    close();

                    refreshWebsites();
                    setEditKeys([]);
                  } catch (err) {
                    messageApi.error(err.message);
                  }
                },
              });
            }}
          >
            删除网址
          </Button>,
        ]}
        onSelect={(e) => {
          setEditKeys(
            e.target.checked
              ? [
                  ...new Set([
                    ...editKeys,
                    ...(website?.rows || []).map((item) => item.id),
                  ]),
                ]
              : editKeys.filter(
                  (key) =>
                    !(website?.rows || []).find((item) => item.id === key)
                )
          );
        }}
      />
      <MarkMain>
        <MarkLayoutCard>
          {(website?.rows || []).map((item) => (
            <Mark
              editable={isEdit}
              checked={editKeys.includes(item.id)}
              title={item.title}
              location={item.userName}
              key={item.id}
              watch={item.count}
              actions={[
                <Button
                  key="edit"
                  icon={<HighlightOutlined />}
                  onClick={() =>
                    setWebsiteFormModal({
                      open: true,
                      record: item,
                    })
                  }
                />,
                <Button
                  key="delete"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    Modal.confirm({
                      title: '删除网址',
                      content: `您确认删除名为 “${item.title}” 的网址吗`,
                      okType: 'danger',
                      onOk: async (close) => {
                        try {
                          await delWebsites({
                            teamId: currentTeam.id,
                            ids: item.id,
                          });
                          close();

                          refreshWebsites();
                        } catch (err) {
                          messageApi.error(err.message);
                        }
                      },
                    });
                  }}
                />,
              ]}
              onCheckChange={(e) => {
                setEditKeys(
                  e.target.checked
                    ? [...editKeys, item.id]
                    : editKeys.filter((editKey) => editKey !== item.id)
                );
              }}
            />
          ))}
        </MarkLayoutCard>
      </MarkMain>
      <Pagination
        style={{
          textAlign: 'center',
          paddingBlockStart: 8,
          borderTop: '1px solid #eee',
        }}
        current={pageNum}
        pageSize={PAGE_SIZE}
        total={website?.total}
        onChange={setPageNum}
      />

      <WebsiteEditFormModal
        open={websiteFormModal.open}
        record={websiteFormModal.record}
        onCancel={() =>
          setWebsiteFormModal({
            ...websiteFormModal,
            open: false,
          })
        }
        onSubmit={async (values, isEdit, reocrd) => {
          try {
            if (isEdit) {
              await updateWebsite({
                id: values.id,
                teamId: currentTeam.id,
                classId: values.classId,
                title: values.title,
                domain: reocrd.domain,
                description: reocrd.description,
              });
              setWebsiteFormModal({
                ...websiteFormModal,
                open: false,
              });

              refreshWebsites();
            }
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />
    </>
  );
};

const TeamItemMain = styled(ProCard)`
  .ant-pro-card-body {
    padding-block: 0;
  }
`;

const TeamItem = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { currentTeam, refreshTeams } = useContext(TeamConext);
  const navigate = useNavigate();

  const [plazaFormModal, setPlazaFormModal] = useState({
    open: false,
    record: null,
  });

  const { runAsync: joinPlaza } = useRequest(JoinTeamPlaza, { manual: true });

  return (
    <>
      {contextHolder}
      <TeamItemMain
        tabs={{
          type: 'card',
          tabBarGutter: 8,
          tabBarExtraContent: {
            right: (
              <Space>
                <Button
                  icon={<FlagOutlined />}
                  onClick={() =>
                    setPlazaFormModal({
                      open: true,
                      record: { id: currentTeam.id },
                    })
                  }
                >
                  加入广场
                </Button>
                <Popconfirm
                  key="delete"
                  title="退出团队"
                  description="您确定退出团队吗？"
                  onConfirm={async () => {
                    try {
                      await UpdateLogoutTeam({ teamId: currentTeam.id });
                      messageApi.success('退出成功！');

                      refreshTeams();
                    } catch (err) {
                      messageApi.error(err.message);
                    }
                  }}
                >
                  <Button danger icon={<LogoutOutlined />}>
                    退出
                  </Button>
                </Popconfirm>
                <Button
                  style={{ marginInlineEnd: 16 }}
                  icon={<SettingOutlined />}
                  onClick={() => navigate(`../team/${currentTeam.id}`)}
                />
              </Space>
            ),
          },
          items: [{ key: 'www', label: '团队网址', children: <MarkView /> }],
        }}
      />

      <PlazaFormModal
        open={plazaFormModal.open}
        record={plazaFormModal.record}
        onCancel={() => setPlazaFormModal({ ...plazaFormModal, open: false })}
        onSubmit={async (values) => {
          try {
            const result = await joinPlaza(values);
            setPlazaFormModal({ ...plazaFormModal, open: false });

            messageApi.success(result);
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />
    </>
  );
};

const TeamAvatarRoot = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const TeamAvatar = ({ avatar, title }) => {
  return (
    <TeamAvatarRoot>
      <Avatar src={avatar} size="small" />
      <span>{title}</span>
    </TeamAvatarRoot>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  height: 0;
`;

const TeamMain = styled(ProCard)`
  .ant-tabs-top > .ant-tabs-nav .ant-tabs-nav-list {
    margin-block-start: 0;
  }
  .ant-pro-card-body {
    padding-inline: 0;
  }
`;

export default () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState('');
  const [createTeamModalShow, setCreateTeamModalShow] = useState(false);
  const {
    refresh: refreshTeams,
    data: teams,
    mutate,
  } = useRequest(GetMyTeams, {
    onSuccess(res) {
      res?.length && setActiveKey(res[0].id);
    },
  });

  const currentTeam = useMemo(() => {
    if (teams?.length) {
      return teams.find((item) => item.id === activeKey);
    }
  }, [teams, activeKey]);

  return (
    <>
      {contextHolder}
      <Content>
        <HeaderPanel
          title={
            <>
              <ToggleCollapsedBtn />
              我的团队
            </>
          }
          extend={
            <Space>
              <Button
                type="primary"
                onClick={() => setCreateTeamModalShow(true)}
              >
                创建团队
              </Button>
            </Space>
          }
        />
        <Container>
          <TeamConext.Provider
            value={{ currentTeam, teams, mutate, refreshTeams }}
          >
            {!!currentTeam && (
              <TeamMain
                tabs={{
                  activeKey,
                  items: teams
                    ? teams.map((item) => ({
                        key: item.id,
                        label: (
                          <TeamAvatar
                            avatar={item.iconUri}
                            title={item.title}
                          />
                        ),
                        children: <TeamItem teamId={item.id} />,
                      }))
                    : [],
                  destroyInactiveTabPane: true,
                  onChange: (key) => setActiveKey(+key),
                }}
              />
            )}
          </TeamConext.Provider>
        </Container>
      </Content>
      <CreateTeamFormModal
        open={createTeamModalShow}
        onCancel={() => setCreateTeamModalShow(false)}
        onSubmit={async ({ iconUri, ...values }) => {
          try {
            await CreateTeam({ iconUri: iconUri[0].url, ...values });
            setCreateTeamModalShow(false);

            refreshTeams();
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />
    </>
  );
};
