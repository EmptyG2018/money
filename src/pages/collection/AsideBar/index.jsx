import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Modal, message } from "antd";
import {
  fetchPropertyCount,
  setCollapses,
  setCollections,
  setSelectedKey,
} from "../../../stores/collectionReducer";
import { useRequest } from "ahooks";
import {
  GetGroups,
  GetCollections,
  UpdateGroupTitle,
  DelGroup,
  CreateCollectionByGroupId,
  UpdateCollectionTitle,
  DelCollection,
} from "../../../services/collection/category";
import {
  ProfilePanel,
  PropertyPanel,
  CreateGroupBtn,
} from "./ProfilePropertyPanel";
import { FavoritePanel } from "./FavoritePanel";
import {
  CollapseEditFormModal,
  CollectionEditFormModal,
} from "./FavoriteFormAction";

export default () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedKey, collapses, collections } = useSelector(
    ({ collection }) => collection
  );

  const [messageApi, contextHolder] = message.useMessage();

  const [collapsedKeys, setCollapsedKeys] = useState([]);

  const [collapseFormModal, setCollapseFormModal] = useState({
    open: false,
    record: null,
  });

  const [collectionFormModal, setCollectionFormModal] = useState({
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

  useEffect(() => {
    dispatch(fetchPropertyCount());
  }, []);

  useEffect(() => {
    dispatch(setSelectedKey(+params.id));
  }, [params.id]);

  useEffect(() => {
    const collection = collections.find((item) => item.id === selectedKey);
    collection && setCollapsedKeys([...collapsedKeys, collection.groupId]);
  }, [collections, selectedKey]);

  const collectionMap = useMemo(() => {
    const map = {};
    collections.forEach((item) => {
      map[item.groupId] = [...(map[item.groupId] || []), item];
    });
    return map;
  }, [collections]);

  return (
    <>
      {contextHolder}
      <Layout.Sider
        width={290}
        style={{ backgroundColor: "#f6f5f4", borderRight: "1px solid #eee" }}
      >
        <ProfilePanel
          extend={<CreateGroupBtn onCreated={() => refreshCollapses()} />}
          onLogouted={() => navigate("/login", { replace: true })}
        />

        <PropertyPanel
          activeKey={selectedKey}
          onSelect={(key) => {
            navigate("../" + key, { relative: "path" });
          }}
        />
        <FavoritePanel
          selectedKey={selectedKey}
          collapsedKeys={collapsedKeys}
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
                    setCollapsedKeys([...collapsedKeys, key]);
                    break;
                  case "UNCOLLAPSED":
                    setCollapsedKeys(
                      collapsedKeys.filter((item) => item !== key)
                    );
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
                }
              },
            },
          }}
          onCollapse={async (collapsed, key) => {
            setCollapsedKeys(
              collapsed
                ? [...collapsedKeys, key]
                : collapsedKeys.filter((item) => item !== key)
            );
          }}
          onSelect={(key) => {
            navigate("../" + key, { relative: "path" });
          }}
        />
      </Layout.Sider>

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
    </>
  );
};
