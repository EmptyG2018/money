import { useState, useEffect, useMemo } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { PropertyPanel } from "./ProfilePropertyPanel";
import { FavoritePanel } from "./FavoritePanel";
import { arrayToTree, findHierarchyById } from "../../utils/helper";

const MoveMarkModal = ({ defaultKey, onConfirm, ...props }) => {
  const { collapses, collections } = useSelector(
    ({ collection }) => collection
  );

  const [selectedKey, setSelectedKey] = useState("");
  const [collapsedKeys, setCollapsedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  const isDefaultSelect = useMemo(() => {
    return selectedKey === defaultKey;
  }, [selectedKey, defaultKey]);

  useEffect(() => {
    setSelectedKey(defaultKey);
  }, [defaultKey]);

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
    setOpenKeys(keys);
  }, [selectedKey, collectionMap]);

  return (
    <Modal
      width={360}
      destroyOnClose
      title="移动至"
      okButtonProps={{ disabled: isDefaultSelect }}
      onOk={() => {
        onConfirm && onConfirm(selectedKey);
      }}
      {...props}
    >
      <div style={{ maxHeight: 480, overflowY: "auto" }}>
        <PropertyPanel
          showAll={false}
          activeKey={selectedKey}
          onSelect={setSelectedKey}
        />
        <FavoritePanel
          selectedKey={selectedKey}
          collapsedKeys={collapsedKeys}
          openKeys={openKeys}
          collapses={collapses}
          collections={collectionMap}
          conextMenu={{
            collapse: {
              items: () => [],
            },
            collection: {
              items: () => [],
            },
          }}
          onCollapse={async (collapsed, key) => {
            setCollapsedKeys(
              collapsed
                ? [...collapsedKeys, key]
                : collapsedKeys.filter((item) => item !== key)
            );
          }}
          onSelect={setSelectedKey}
          onOpen={(opend, item) => {
            setOpenKeys(
              opend ? [...openKeys, item.id] : openKeys.filter(key !== item.id)
            );
          }}
        />
      </div>
    </Modal>
  );
};

export default MoveMarkModal;
