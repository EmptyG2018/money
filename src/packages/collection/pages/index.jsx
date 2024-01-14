import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, message } from "antd";
import {
  HighlightOutlined,
  DeleteOutlined,
  DragOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import {
  HistoryOutlined,
  SortDescendingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  DELKEY,
  fetchPropertyCount,
  setSystemCollapseCount,
} from "@stores/collectionReducer";
import {
  GetMarksByCollectionId,
  CreateMark,
  UpdateMark,
  MoveMarks,
  DelAllMarks,
  ImportMarks,
} from "@services/collection/mark";
import {
  ResourceSearch,
  HeaderPanel,
  CreateActionsBtn,
} from "@components/collection/HeaderPanel";
import {
  LinkEditFormModal,
  ImgEditFormModal,
  WordEditFormModal,
} from "@components/collection/MarkFormAction";
import { Mark, ImgMark, WordMark } from "@components/collection/Mark";
import { MarkDataView } from "@components/collection/MarkDataView";
import MoveMarkModal from "@components/collection/MoveMarkModal";
import ToggleCollapsedBtn from "@components/collection/ToggleCollapsedBtn";
import ExportMarksFormModal from "@package_collection/components/ExportMarksFormModal";
import styled from "styled-components";

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

export default () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { selectedKey, systemCollections, collections } = useSelector(
    ({ collection }) => collection
  );

  const [messageApi, contextHolder] = message.useMessage();
  const keyword = useRef();
  const [editKeys, setEditKeys] = useState([]);
  const [previewImg, setPreviewImg] = useState({ show: false, url: "" });
  const [previewWord, setPreviewWord] = useState({
    show: false,
    title: "",
    word: "",
  });

  const [moveMarkMdoal, setMoveMarkModal] = useState({
    open: false,
    defaultKey: "",
  });

  const [linkFormModal, setLinkFormModal] = useState({
    open: false,
    record: null,
  });
  const [imgFormModal, setImgFormModal] = useState({
    open: false,
    record: null,
  });
  const [wordFormModal, setWordFormModal] = useState({
    open: false,
    record: null,
  });

  const [importModalShow, setImportModalShow] = useState(false);

  const [records, setRecords] = useState([]);

  const [sort, setSort] = useState("up");

  const resetRecordActionHistory = () => {
    setRecords([]);
    setEditKeys([]);
  };

  const { refresh: refreshMarks, data: mark } = useRequest(
    () =>
      GetMarksByCollectionId({
        title: keyword.current,
        collectionsId: params.id,
        offset: records.length,
        pageSize: 16,
        sort,
      }),
    {
      debounceWait: 300,
      refreshDeps: [params.id, sort],
      refreshDepsAction: () => {
        resetRecordActionHistory();
        refreshMarks();
      },
      onSuccess(res) {
        setRecords([...records].concat(res.rows || []));
      },
    }
  );

  const hasMore = useMemo(() => {
    return mark?.total > records.length;
  }, [mark]);

  const { runAsync: createMark } = useRequest(CreateMark, { manual: true });

  const { runAsync: updateMark } = useRequest(UpdateMark, { manual: true });

  const { runAsync: moveMarks } = useRequest(MoveMarks, { manual: true });

  const { runAsync: delAllMarks } = useRequest(DelAllMarks, { manual: true });

  const editable = !!editKeys.length;

  const collection = useMemo(
    () =>
      [...systemCollections, ...collections].find(
        (item) => item.id === selectedKey
      ),
    [collections, systemCollections, selectedKey]
  );

  useEffect(() => {
    keyword.current = "";
  }, [params.id]);

  const isDelPage = collection?.id === DELKEY;

  const asyncLoadProperyCount = async () => {
    const propertyCount = await dispatch(fetchPropertyCount());
    dispatch(setSystemCollapseCount(propertyCount.payload));
  };

  const moveMarksConfirm = ({
    title,
    content,
    collectionsId,
    pid,
    ids,
    onSuccess,
  }) => {
    Modal.confirm({
      title,
      content,
      okType: "danger",
      onOk: async (close) => {
        try {
          await moveMarks({ collectionsId, ids, pid });
          close();

          asyncLoadProperyCount();
          onSuccess && onSuccess();
        } catch (err) {
          messageApi.error(err.message);
        }
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Content>
        {collection ? (
          <>
            <HeaderPanel
              title={
                <>
                  <ToggleCollapsedBtn />
                  <ResourceSearch
                    placeholder="请输入关键词"
                    onSearch={(value) => {
                      keyword.current = value;
                      resetRecordActionHistory();
                      refreshMarks();
                    }}
                  />
                </>
              }
              extend={
                <CreateActionsBtn
                  onClick={(e) => {
                    switch (e.key) {
                      case "0":
                        setLinkFormModal({
                          open: true,
                          record: {
                            collectionsId: params.id,
                            mediaType: 0,
                            domain: "",
                          },
                        });
                        break;
                      case "1":
                        setImgFormModal({
                          open: true,
                          record: {
                            collectionsId: params.id,
                            mediaType: 1,
                            domain: "",
                          },
                        });
                        break;
                      case "2":
                        setWordFormModal({
                          open: true,
                          record: {
                            collectionsId: params.id,
                            mediaType: 2,
                            title: "",
                            description: "",
                          },
                        });
                        break;
                      case "3":
                        setImportModalShow(true);
                        break;
                    }
                  }}
                />
              }
            />
            <Container>
              <MarkDataView
                rowKey="id"
                title={collection.title}
                items={records}
                selectedKeys={editKeys}
                edit={{
                  editable,
                  actions: [
                    <Button
                      icon={<DragOutlined />}
                      onClick={() => {
                        setMoveMarkModal({
                          open: true,
                          defaultKey: selectedKey,
                        });
                      }}
                    >
                      移动
                    </Button>,
                    isDelPage ? (
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          Modal.confirm({
                            title: "清空回收站",
                            content: "清空后不可恢复，是否继续？",
                            okType: "danger",
                            onOk: async (close) => {
                              try {
                                await delAllMarks();
                                setRecords([]);
                                setEditKeys([]);
                                close();

                                asyncLoadProperyCount();
                              } catch (err) {
                                messageApi.error(err.message);
                              }
                            },
                          })
                        }
                      >
                        清空回收站
                      </Button>
                    ) : (
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          moveMarksConfirm({
                            ids: editKeys.join(","),
                            collectionsId: -99,
                            title: "批量删除",
                            content: `您确认删除所选中的书签吗？`,
                            onSuccess() {
                              setRecords(
                                records.filter(
                                  (item) => !editKeys.includes(item.id)
                                )
                              );
                              setEditKeys([]);

                              asyncLoadProperyCount();
                            },
                          })
                        }
                      >
                        移至回收站
                      </Button>
                    ),
                  ],
                  onEdit: () => setEditKeys([]),
                }}
                filter={{
                  items: {
                    sort: {
                      key: sort,
                      items: [
                        {
                          key: "up",
                          icon: <HistoryOutlined />,
                          label: "按最新",
                        },
                        {
                          key: "down",
                          icon: <HistoryOutlined />,
                          label: "按最早",
                        },
                        {
                          key: "count",
                          icon: <SortDescendingOutlined />,
                          label: "按浏览量",
                        },
                      ],
                    },
                    view: {
                      key: "card",
                      items: [
                        {
                          key: "card",
                          icon: <AppstoreOutlined />,
                          label: "卡片",
                        },
                        // {
                        //   key: "list",
                        //   icon: <BarsOutlined />,
                        //   label: "列表",
                        // },
                        // {
                        //   key: "title",
                        //   icon: <AlignLeftOutlined />,
                        //   label: "标题",
                        // },
                      ],
                    },
                  },
                  onChange: (key, value) => {
                    key === "sort" && setSort(value);
                  },
                }}
                layoutRender={<MarkLayoutCard />}
                itemRender={(key, item, checked) => (
                  <>
                    {item.mediaType === 0 && (
                      <Mark
                        editable={editable}
                        checked={checked}
                        title={item.title}
                        icon={item.icon}
                        thumb={item.imageUrl}
                        location={item.collectionsTitle}
                        date={item.createTime}
                        watch={item.count}
                        actions={
                          !isDelPage && [
                            <Button
                              icon={<HighlightOutlined />}
                              onClick={() =>
                                setLinkFormModal({
                                  open: true,
                                  record: item,
                                })
                              }
                            />,
                            <Button
                              icon={<DeleteOutlined />}
                              onClick={() =>
                                moveMarksConfirm({
                                  ids: key,
                                  collectionsId: -99,
                                  title: "删除链接",
                                  content: `您确认删除名为 “${item.title}” 的链接吗`,
                                  onSuccess() {
                                    setRecords(
                                      records.filter((item) => item.id !== key)
                                    );
                                  },
                                })
                              }
                            />,
                          ]
                        }
                        onCheckChange={(e) => {
                          setEditKeys(
                            e.target.checked
                              ? [...editKeys, key]
                              : editKeys.filter((editKey) => editKey !== key)
                          );
                        }}
                        onClick={() => {
                          !editable && open(item.domain);
                        }}
                      />
                    )}
                    {item.mediaType === 1 && (
                      <ImgMark
                        editable={editable}
                        checked={checked}
                        thumb={item.domain}
                        location={item.collectionsTitle}
                        date={item.createTime}
                        watch={item.count}
                        actions={
                          !isDelPage && [
                            <Button
                              icon={<DeleteOutlined />}
                              onClick={() =>
                                moveMarksConfirm({
                                  ids: item.id,
                                  collectionsId: -99,
                                  title: "删除图片",
                                  content: `您确认删除图片吗`,
                                  onSuccess() {
                                    setRecords(
                                      records.filter((item) => item.id !== key)
                                    );
                                  },
                                })
                              }
                            />,
                          ]
                        }
                        onCheckChange={(e) => {
                          setEditKeys(
                            e.target.checked
                              ? [...editKeys, key]
                              : editKeys.filter((editKey) => editKey !== key)
                          );
                        }}
                        onClick={() => {
                          !editable &&
                            setPreviewImg({ show: true, url: item.domain });
                        }}
                      />
                    )}
                    {item.mediaType === 2 && (
                      <WordMark
                        editable={editable}
                        checked={checked}
                        title={item.title}
                        word={item.description}
                        location={item.collectionsTitle}
                        date={item.createTime}
                        watch={item.count}
                        actions={
                          !isDelPage && [
                            <Button
                              icon={<HighlightOutlined />}
                              onClick={() =>
                                setWordFormModal({ open: true, record: item })
                              }
                            />,
                            <Button
                              icon={<DeleteOutlined />}
                              onClick={() =>
                                moveMarksConfirm({
                                  ids: item.id,
                                  collectionsId: -99,
                                  title: "删除文本",
                                  content: `您确认删除名为 “${item.title}” 的文本吗`,
                                  onSuccess() {
                                    setRecords(
                                      records.filter((item) => item.id !== key)
                                    );
                                  },
                                })
                              }
                            />,
                          ]
                        }
                        onCheckChange={(e) => {
                          setEditKeys(
                            e.target.checked
                              ? [...editKeys, key]
                              : editKeys.filter((editKey) => editKey !== key)
                          );
                        }}
                        onClick={() => {
                          !editable &&
                            setPreviewWord({
                              show: true,
                              title: item.title,
                              word: item.description,
                            });
                        }}
                      />
                    )}
                  </>
                )}
                onSelect={(e) => {
                  setEditKeys(
                    e.target.checked ? records.map((item) => item.id) : []
                  );
                }}
                hasMore={hasMore}
                loadMore={() => {
                  refreshMarks();
                }}
              />
            </Container>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#787878",
            }}
          >
            <FrownOutlined style={{ fontSize: 68 }} />
            <p style={{ fontSize: 18 }}>收藏集不存在！</p>
          </div>
        )}
      </Content>

      <ImgMark.Preview
        visible={previewImg.show}
        src={previewImg.url}
        onVisibleChange={() => {
          setPreviewImg({ show: false, url: "" });
        }}
      />

      <WordMark.Preview
        open={previewWord.show}
        title={previewWord.title}
        word={previewWord.word}
        onCancel={() => setPreviewWord({ show: false, title: "", word: "" })}
      />

      <LinkEditFormModal
        open={linkFormModal.open}
        record={linkFormModal.record}
        onCancel={() => setLinkFormModal({ ...linkFormModal, open: false })}
        onSubmit={async (values, isEdit, record) => {
          try {
            const formData = {
              domain: values.domain,
              collectionsId: record.collectionsId,
              mediaType: record.mediaType,
            };
            if (!isEdit) {
              const newRecord = await createMark(formData);
              setRecords([newRecord, ...records]);

              asyncLoadProperyCount();
            } else {
              const newRecord = await updateMark({
                ...formData,
                id: record.id,
                title: values.title,
                icon: values.icon,
                imageUrl: values.imageUrl,
              });
              setRecords(
                records.map((item) =>
                  item.id === newRecord.id ? newRecord : item
                )
              );
            }
            setLinkFormModal({ ...linkFormModal, open: false });
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />

      <ImgEditFormModal
        open={imgFormModal.open}
        record={imgFormModal.record}
        onCancel={() => setImgFormModal({ ...imgFormModal, open: false })}
        onSubmit={async (values, isEdit, record) => {
          try {
            if (!isEdit) {
              const newRecord = await createMark({
                domain: values.domain,
                collectionsId: record.collectionsId,
                mediaType: record.mediaType,
              });
              setRecords([newRecord, ...records]);

              asyncLoadProperyCount();
            }

            setImgFormModal({ ...imgFormModal, open: false });
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />

      <WordEditFormModal
        open={wordFormModal.open}
        record={wordFormModal.record}
        onCancel={() => setWordFormModal({ ...wordFormModal, open: false })}
        onSubmit={async (values, isEdit, record) => {
          try {
            const formData = {
              title: values.title,
              description: values.description,
              collectionsId: record.collectionsId,
              mediaType: record.mediaType,
            };
            if (!isEdit) {
              const newRecord = await createMark(formData);
              setRecords([newRecord, ...records]);

              asyncLoadProperyCount();
            } else {
              const newRecord = await updateMark({
                ...formData,
                id: record.id,
              });
              const index = records.findIndex(
                (item) => item.id === newRecord.id
              );
              setRecords(records.toSpliced(index, 1, newRecord));
            }
            setWordFormModal({ ...wordFormModal, open: false });
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />

      <MoveMarkModal
        open={moveMarkMdoal.open}
        defaultKey={moveMarkMdoal.defaultKey}
        onCancel={() => setMoveMarkModal({ open: false, defaultKey: "" })}
        onConfirm={(key) => {
          moveMarksConfirm({
            ids: editKeys.join(","),
            collectionsId: key,
            pid: isDelPage ? -99 : undefined,
            title: "批量移动",
            content: `您确认移动所选中的书签吗？`,
            onSuccess() {
              setRecords(records.filter((item) => !editKeys.includes(item.id)));
              setEditKeys([]);
              setMoveMarkModal({ open: false, defaultKey: "" });

              asyncLoadProperyCount();
            },
          });
        }}
      />

      <ExportMarksFormModal
        open={importModalShow}
        onSubmit={async ({ groupName, file }) => {
          const formData = new FormData();
          formData.append("groupName", groupName);
          formData.append("file", file.file);
          try {
            await ImportMarks(formData);
            messageApi.success("书签导入成功！");

            setTimeout(() => {
              location.reload();
            }, 2000);
          } catch (err) {
            messageApi.error(err.message);
          } finally {
            setImportModalShow(false);
          }
        }}
      />
    </>
  );
};
