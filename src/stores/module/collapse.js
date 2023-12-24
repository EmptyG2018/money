import {
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import { useRequest } from "ahooks";
import {
  GetGroups,
  CreateGroup,
  UpdateGroupTitle,
  DelGroup,
} from "../../services/collection/category";

const collapsesAtom = atom({
  key: "collapses",
  default: [],
});

const collapsedKeysAtom = atom({
  key: "collapsedKeys",
  default: [],
});

export const useCollapses = () => useRecoilValue(collapsesAtom);

export const useFetchCollapses = () => {
  const setCollapses = useSetRecoilState(collapsesAtom);

  const { refresh } = useRequest(GetGroups, {
    manual: true,
    onSuccess(rows) {
      setCollapses(rows);
    },
  });
  return { fetch: refresh };
};

export const useCollapseAction = () => {
  const { fetch: refreshCollapses } = useFetchCollapses();

  const addCollapse = async ({ title }) => {
    await CreateGroup({ title });
    refreshCollapses();
  };

  const updateCollapse = async ({ id, title }) => {
    await UpdateGroupTitle({ id, title });
    refreshCollapses();
  };

  const deleteCollapse = async ({ id }) => {
    await DelGroup({ id });
    refreshCollapses();
  };

  return { addCollapse, updateCollapse, deleteCollapse };
};

export const useCollapsedKey = () => {
  const [collapsedKeys, setCollapsedKeys] = useRecoilState(collapsedKeysAtom);

  const collapsed = (key) => setCollapsedKeys([...collapsedKeys, key]);

  const unCollapsed = (key) =>
    setCollapsedKeys(collapsedKeys.filter((item) => item !== key));

  return { collapsedKeys, collapsed, unCollapsed };
};
