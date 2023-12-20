import { useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Button, Modal, message } from "antd";
import {
  HighlightOutlined,
  DeleteOutlined,
  DragOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { DELKEY } from "../../../stores/collectionReducer";
import {
  GetMarksByCollectionId,
  CreateMark,
  UpdateMark,
  MoveMarks,
  DelAllMarks,
} from "../../../services/collection/mark";
import { ResourceSearch, HeaderPanel, CreateActionsBtn } from "./HeaderPanel";
import { useAction } from "./ActionPanel";
import {
  LinkEditFormModal,
  ImgEditFormModal,
  WordEditFormModal,
} from "./MarkFormAction";
import { Mark, ImgMark, WordMark } from "../../../components/collection/Mark";
import { MarkDataView } from "./MarkDataView";
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
  const { filters } = useAction();
  const [editKeys, setEditKeys] = useState([]);
  const [previewImg, setPreviewImg] = useState({ show: false, url: "" });
  const [previewWord, setPreviewWord] = useState({
    show: false,
    title: "",
    word: "",
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

  const { refresh: refreshMarks, data: mark } = useRequest(
    () =>
      GetMarksByCollectionId({
        title: keyword.current,
        collectionsId: params.id,
        pageNum: 1,
        pageSize: 20,
        sort: "up",
      }),
    {
      refreshDeps: [params.id],
    }
  );

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

  const isDelPage = collection?.id === DELKEY;

  const moveMarksConfirm = ({
    title,
    content,
    collectionsId,
    ids,
    onSuccess,
  }) => {
    Modal.confirm({
      title,
      content,
      okType: "danger",
      onOk: async (close) => {
        try {
          await moveMarks({ collectionsId, ids });
          close();

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
      <Layout.Content>
        <Content>
          {collection ? (
            <>
              <HeaderPanel
                title={
                  <ResourceSearch
                    placeholder="请输入关键词"
                    onSearch={(value) => {
                      keyword.current = value;
                      refreshMarks();
                    }}
                  />
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
                      }
                    }}
                  />
                }
              />
              <Container>
                <MarkDataView
                  rowKey="id"
                  title={collection.title}
                  items={mark?.rows || []}
                  selectedKeys={editKeys}
                  edit={{
                    editable,
                    actions: [
                      <Button icon={<DragOutlined />}>移动</Button>,
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
                                  refreshMarks();
                                  close();
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
                                refreshMarks();
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
                    items: filters,
                    onChange: () => {},
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
                                      refreshMarks();
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
                                      refreshMarks();
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
                                      refreshMarks();
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
                  hasMore
                  onSelect={(e) => {
                    setEditKeys(
                      e.target.checked
                        ? (mark?.rows || []).map((item) => item.id)
                        : []
                    );
                  }}
                  onScrolled={() => {
                    
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
      </Layout.Content>

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
            !isEdit
              ? await createMark(formData)
              : await updateMark({
                  ...formData,
                  id: record.id,
                  title: values.title,
                  icon: values.icon,
                  imageUrl: values.imageUrl,
                });
            setLinkFormModal({ ...linkFormModal, open: false });

            refreshMarks();
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
            !isEdit &&
              (await createMark({
                domain: values.domain,
                collectionsId: record.collectionsId,
                mediaType: record.mediaType,
              }));
            setImgFormModal({ ...imgFormModal, open: false });

            refreshMarks();
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
            !isEdit
              ? await createMark(formData)
              : await updateMark({ ...formData, id: record.id });
            setWordFormModal({ ...wordFormModal, open: false });

            refreshMarks();
          } catch (err) {
            messageApi.error(err.message);
          }
        }}
      />
    </>
  );
};
