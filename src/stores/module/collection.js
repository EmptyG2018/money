import { atom, selector, useSetRecoilState, useRecoilValue } from "recoil";
import { useRequest } from "ahooks";
import {
  GetCollections,
  CreateCollectionByGroupId,
  DelCollection,
} from "../../services/collection/category";
import { GetCategoryMarkCount } from "../../services/collection/mark";
import {   } from "../../utils/constants";

const systemCollectionCountAtom = atom({
  key: "systemCollectionCount",
  default: {
    allCounr: 0,
    unclassCount: 0,
    delCount: 0,
  },
});

const collectionsAtom = atom({
  key: "collections",
  default: [],
});

const selectedKeyAtom = atom({
  key: "selectedKey",
  default: [],
});

const currentCollectionSelector = selector({
  key: "currentCollection",
  get({ get }) {
    const collections = get(collectionsAtom);
    const selectedKey = get(selectedKeyAtom);
    return [...COLLECTION_SYSTEM_COLLECTIONS, ...collections].find(
      (item) => item.id === selectedKey
    );
  },
});

export const useSystemCollectionCount = () =>
  useRecoilValue(systemCollectionCountAtom);

export const useFetchSystemCollectionCount = () => {
  const setSystemCollectionCount = useSetRecoilState(systemCollectionCountAtom);

  const { refresh } = useRequest(GetCategoryMarkCount, {
    manual: true,
    onSuccess(config) {
      setSystemCollectionCount(config);
    },
  });
  return { fetch: refresh };
};

export const useCollections = () => useRecoilValue(collectionsAtom);

export const useFetchCollections = () => {
  const setCollections = useSetRecoilState(collectionsAtom);

  const { refresh } = useRequest(GetCollections, {
    manual: true,
    onSuccess(rows) {
      setCollections(rows);
    },
  });
  return { fetch: refresh };
};

export const useCollectionAction = () => {
  const { fetch: refreshCollections } = useFetchCollections();

  const addCollection = async ({ title, groupId, parentId }) => {
    await CreateCollectionByGroupId({ title, groupId, parentId });
    refreshCollections();
  };

  const updateCollection = async ({ id, title, groupId, parentId }) => {
    // await UpdateCollection({ id, title, groupId, parentId });
    // refreshCollections();
  };

  const deleteCollection = async ({ id }) => {
    await DelCollection({ id });
    refreshCollections();
  };

  return { addCollection, updateCollection, deleteCollection };
};

export const currentCollection = () =>
  useRecoilValue(currentCollectionSelector);
