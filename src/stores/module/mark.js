import { atom } from "recoil";

const selectionKeysAtom = atom({
  key: "selectionKeys",
  default: []
})

const isEditAtom = atom({
  key: "isEdit",
  default: false,
})
