import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCategoryMarkCount } from "../services/collection/mark";

export const DELKEY = -99;

export const fetchPropertyCount = createAsyncThunk(
  "collection/fetchPropertyCount",
  async () => {
    return await GetCategoryMarkCount();
  }
);

const initialState = {
  collapsed: false,
  selectedKey: "",
  openKeys: [],
  systemCollections: [
    {
      id: -1,
      title: "所有书签",
      count: 0,
      viewType: 0,
    },
    {
      id: -10,
      title: "未分类",
      count: 0,
      viewType: 0,
    },
    {
      id: DELKEY,
      title: "回收站",
      count: 0,
      viewType: 0,
    },
  ],
  collapsedKeys: [],
  collapses: [],
  collections: [],
};

const slice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollapsed: (state, { payload }) => {
      state.collapsed = payload;
    },
    setSelectedKey: (state, { payload }) => {
      state.selectedKey = payload;
    },
    setOpenKeys: (state, { payload }) => {
      state.openKeys = payload;
    },
    opend: (state, { payload }) => {
      state.openKeys = [...state.openKeys, payload];
    },
    unOpend: (state, { payload }) => {
      state.openKeys = state.openKeys.filter((key) => key !== payload);
    },
    setSystemCollapseCount: (state, { payload }) => {
      state.systemCollections = [
        {
          ...state.systemCollections[0],
          count: payload.allCounr,
        },
        {
          ...state.systemCollections[1],
          count: payload.unclassCount,
        },
        {
          ...state.systemCollections[2],
          count: payload.delCount,
        },
      ];
    },
    setCollapses: (state, { payload }) => {
      state.collapses = payload;
    },
    setCollapsedKeys: (state, { payload }) => {
      state.collapsedKeys = payload;
    },
    openCollapsed: (state, { payload }) => {
      state.collapsedKeys = [...state.collapsedKeys, payload];
    },
    closeCollapsed: (state, { payload }) => {
      state.collapsedKeys = state.collapsedKeys.filter(
        (key) => key !== payload
      );
    },
    setCollections: (state, { payload }) => {
      state.collections = payload;
    },
  },
});

export const {
  setSelectedKey,
  opend,
  unOpend,
  setSystemCollapseCount,
  setCollapses,
  setCollections,
  setCollapsed,
  setOpenKeys,
  setCollapsedKeys,
  openCollapsed,
  closeCollapsed,
} = slice.actions;
export default slice.reducer;
