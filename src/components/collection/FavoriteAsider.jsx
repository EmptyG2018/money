import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Modal, Drawer, message } from "antd";
import {
  fetchPropertyCount,
  setCollapses,
  setCollections,
  setSelectedKey,
  setCollapsed,
  setSystemCollapseCount,
  setOpenKeys,
  opend,
  unOpend,
  openCollapsed,
  closeCollapsed,
} from "@stores/collectionReducer";
import { useRequest, useResponsive } from "ahooks";
import {
  GetGroups,
  GetCollections,
  UpdateGroupTitle,
  DelGroup,
  CreateCollectionByGroupId,
  UpdateCollectionTitle,
  DelCollection,
} from "@services/collection/category";
import { JoinCollectPlaza } from "@services/collection/plaza";
import {
  ProfilePanel,
  PropertyPanel,
  CreateGroupBtn,
} from "./ProfilePropertyPanel";
import { FavoritePanel } from "./FavoritePanel";
import {
  CollapseEditFormModal,
  CollectionEditFormModal,
  PlazaFormModal,
} from "./FavoriteFormAction";
import { arrayToTree, findHierarchyById } from "../../utils/helper";
import FixedAsiderLink from "./FixedAsiderLink";
import styled from "styled-components";

const FavoriteAsiderRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const FlexFullContent = styled.div`
  flex: 1 0 0;
  height: 0;
  overflow-y: auto;
`;

const FavoriteAsider = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { collapsedKeys, openKeys, selectedKey, collapses, collections } =
    useSelector(({ collection }) => collection);

  const [messageApi, contextHolder] = message.useMessage();

  const [collapseFormModal, setCollapseFormModal] = useState({
    open: false,
    record: null,
  });

  const [collectionFormModal, setCollectionFormModal] = useState({
    open: false,
    record: null,
  });

  const [plazaFormModal, setPlazaFormModal] = useState({
    open: false,
    record: null,
  });

  const { refresh: refreshCollapses } = useRequest(GetGroups, {
    onSuccess(res) {
      dispatch(setCollapses(res || []));
    },
  });

  const { runAsync: updateGroupTitle, loading: updateGroupTitleLoading } =
    useRequest(UpdateGroupTitle, { manual: true });

  const { runAsync: deleteGroup } = useRequest(DelGroup, { manual: true });

  const { runAsync: createCollection, loading: createCollectionLoading } =
    useRequest(CreateCollectionByGroupId, {
      manual: true,
    });

  const {
    runAsync: updateCollectionTitle,
    loading: updateCollectionTitleLoading,
  } = useRequest(UpdateCollectionTitle, { manual: true });

  const { runAsync: deleteCollection } = useRequest(DelCollection, {
    manual: true,
  });

  const { refresh: refreshCollections } = useRequest(GetCollections, {
    defaultParams: [{ groupId: undefined }],
    onSuccess(res) {
      dispatch(setCollections(res || []));
    },
  });

  const { runAsync: joinPlaza } = useRequest(JoinCollectPlaza, {
    manual: true,
  });

  useEffect(() => {
    (async () => {
      const propertyCount = await dispatch(fetchPropertyCount());
      dispatch(setSystemCollapseCount(propertyCount.payload));
    })();
  }, []);

  useEffect(() => {
    dispatch(setSelectedKey(+params.id));
  }, [params.id]);

  useEffect(() => {
    const collection = collections.find((item) => item.id === selectedKey);
    collection && dispatch(openCollapsed(collection.groupId));
  }, [collections, selectedKey]);

  const collectionMap = useMemo(() => {
    const map = {};
    collections.forEach((item) => {
      map[item.groupId] = [...(map[item.groupId] || []), item];
    });
    return map;
  }, [collections]);

  useEffect(() => {
    let keys = [];
    const treeList = Object.values(collectionMap);
    treeList.forEach((item) => {
      const tree = arrayToTree({
        rowKey: "id",
        items: item,
        parentId: 0,
        level: 1,
      });
      const openKeys = findHierarchyById({
        targetId: selectedKey,
        tree,
      }).filter((key) => key !== selectedKey);
      keys = [...keys, ...openKeys];
    });
    dispatch(setOpenKeys(keys));
  }, [selectedKey, collectionMap]);

  return (
    <>
      {contextHolder}
      <FavoriteAsiderRoot>
        <ProfilePanel
          extend={<CreateGroupBtn onCreated={() => refreshCollapses()} />}
          onLogouted={() => navigate("/login", { replace: true })}
        />
        <FlexFullContent>
          <PropertyPanel
            activeKey={selectedKey}
            onSelect={(key) => {
              navigate("./" + key);
            }}
          />
          <FavoritePanel
            selectedKey={selectedKey}
            collapsedKeys={collapsedKeys}
            openKeys={openKeys}
            collapses={collapses}
            collections={collectionMap}
            conextMenu={{
              collapse: {
                items: (key) => [
                  collapsedKeys.includes(key) ? "UNCOLLAPSED" : "COLLAPSED",
                  "CREATECOLLECTION",
                  "DIVIDER",
                  "RENAMECOLLAPSE",
                  "DELETECOLLAPSE",
                ],
                onClick: (key, item, menuKey) => {
                  switch (menuKey) {
                    case "COLLAPSED":
                      dispatch(openCollapsed(key));
                      break;
                    case "UNCOLLAPSED":
                      dispatch(closeCollapsed(key));
                      break;
                    case "CREATECOLLECTION":
                      setCollectionFormModal({
                        open: true,
                        record: { groupId: item.id, parentId: 0, title: "" },
                      });
                      break;
                    case "RENAMECOLLAPSE":
                      setCollapseFormModal({ open: true, record: item });
                      break;
                    case "DELETECOLLAPSE":
                      Modal.confirm({
                        title: "删除群组",
                        content: `您确认删除名为 “${item.title}” 的群组吗`,
                        okType: "danger",
                        onOk: async (close) => {
                          try {
                            await deleteGroup({ id: item.id });
                            close();

                            refreshCollapses();
                          } catch (err) {
                            messageApi.error(err.message);
                          }
                        },
                      });
                      break;
                  }
                },
              },
              collection: {
                items: () => [
                  "CREATECOLLECTION",
                  "RENAMECOLLECTION",
                  "DELETECOLLECTION",
                  "DIVIDER",
                  "APPLYJOINPLAZA",
                ],
                onClick: (_, item, menuKey) => {
                  switch (menuKey) {
                    case "CREATECOLLECTION":
                      setCollectionFormModal({
                        open: true,
                        record: { parentId: item.id, title: "" },
                      });
                      break;
                    case "RENAMECOLLECTION":
                      setCollectionFormModal({
                        open: true,
                        record: item,
                      });
                      break;
                    case "DELETECOLLECTION":
                      Modal.confirm({
                        title: "删除收藏集",
                        content: `您确认删除名为 “${item.title}” 的收藏集吗`,
                        okType: "danger",
                        onOk: async (close) => {
                          try {
                            await deleteCollection({ id: item.id });
                            close();

                            refreshCollections();
                          } catch (err) {
                            messageApi.error(err.message);
                          }
                        },
                      });
                      break;
                    case "APPLYJOINPLAZA":
                      setPlazaFormModal({
                        open: true,
                        record: { id: item.id },
                      });
                      break;
                  }
                },
              },
            }}
            onCollapse={async (collapsed, key) => {
              dispatch(collapsed ? openCollapsed(key) : closeCollapsed(key));
            }}
            onSelect={(key) => {
              navigate("./" + key);
            }}
            onOpen={(openState, item) => {
              dispatch(openState ? opend(item.id) : unOpend(item.id));
            }}
          />
        </FlexFullContent>
        <FixedAsiderLink />
      </FavoriteAsiderRoot>

      <CollapseEditFormModal
        open={collapseFormModal.open}
        record={collapseFormModal.record}
        confirmLoading={(isEdit) => isEdit && updateGroupTitleLoading}
        onCancel={() =>
          setCollapseFormModal({ ...collapseFormModal, open: false })
        }
        onSubmit={async (values, isEdit) => {
          try {
            isEdit && (await updateGroupTitle(values));
            setCollapseFormModal({ ...setCollapseFormModal, open: false });

            refreshCollapses();
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />

      <CollectionEditFormModal
        open={collectionFormModal.open}
        record={collectionFormModal.record}
        confirmLoading={(isEdit) =>
          !isEdit ? createCollectionLoading : updateCollectionTitleLoading
        }
        onCancel={() =>
          setCollectionFormModal({ ...collectionFormModal, open: false })
        }
        onSubmit={async (values, isEdit, record) => {
          try {
            !isEdit
              ? await createCollection({ ...record, ...values })
              : await updateCollectionTitle(values);
            setCollectionFormModal({ ...collectionFormModal, open: false });

            refreshCollections();
          } catch (err) {
            messageApi.error(err.message);
          }
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

const FavoriteSider = styled(Layout.Sider)`
  display: ${({ display }) => display || "none"};
  background-color: #f6f5f4 !important;
  border-right: 1px solid #eee;
  & > .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;

const FixedAsiderDrawer = styled(Drawer)`
  .ant-drawer-body {
    background-color: #f6f5f4;
    padding: 0;
    margin: 0;
  }
`;

export default () => {
  const responsive = useResponsive();
  const { collapsed } = useSelector(({ collection }) => collection);
  const dispatch = useDispatch();

  return (
    <>
      <FavoriteSider
        width={290}
        display={!collapsed && responsive.sm ? "block" : "none"}
      >
        <FavoriteAsider />
      </FavoriteSider>
      <FixedAsiderDrawer
        open={!collapsed && !responsive.sm}
        autoFocus={false}
        placement="left"
        width={290}
        closeIcon={false}
        onClose={() => dispatch(setCollapsed(true))}
      >
        <FavoriteAsider />
      </FixedAsiderDrawer>
    </>
  );
};
