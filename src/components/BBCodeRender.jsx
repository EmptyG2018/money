import React from "react";
import bbob from "@bbob/core";
import { render } from "@bbob/html";
import { createPreset } from "@bbob/preset";
import parse from "html-react-parser";
import {
  isEOL,
  isStringNode,
  isTagNode,
  TagNode,
  getUniqAttr,
} from "@bbob/plugin-helper";

const isStartsWith = (node, type) => node[0] === type;

const listItems = (content) => {
  let listIdx = 0;
  const listItems = [];
  const createItemNode = () => TagNode.create("li");
  const ensureListItem = (val) => {
    listItems[listIdx] = listItems[listIdx] || val;
  };
  const addItem = (val) => {
    if (listItems[listIdx] && listItems[listIdx].content) {
      listItems[listIdx].content = listItems[listIdx].content.concat(val);
    } else {
      listItems[listIdx] = listItems[listIdx].concat(val);
    }
  };
  content.forEach((el) => {
    if (isStringNode(el) && isStartsWith(el, "*")) {
      if (listItems[listIdx]) {
        listIdx++;
      }
      ensureListItem(createItemNode());
      addItem(el.substr(1));
    } else if (isTagNode(el) && TagNode.isOf(el, "*")) {
      if (listItems[listIdx]) {
        listIdx++;
      }
      ensureListItem(createItemNode());
    } else if (!isTagNode(listItems[listIdx])) {
      listIdx++;
      ensureListItem(el);
    } else if (listItems[listIdx]) {
      addItem(el);
    } else {
      ensureListItem(el);
    }
  });
  return [].concat(listItems);
};

const plugin = (tree) => tree.walk((node) => (isEOL(node) ? "<br/>" : node));

const preset = createPreset({
  font: (node) => ({
    ...node,
    tag: "font",
    attrs: {
      face: getUniqAttr(node.attrs),
    },
  }),
  size: (node) => ({
    ...node,
    tag: "font",
    attrs: {
      size: `font-size: ${getUniqAttr(node.attrs)}px;`,
    },
  }),
  color: (node) => ({
    ...node,
    tag: "font",
    attrs: {
      color: getUniqAttr(node.attrs),
    },
  }),
  backcolor: (node) => ({
    ...node,
    tag: "font",
    attrs: {
      style: `background-color: ${getUniqAttr(node.attrs)}`,
    },
  }),
  url: (node) => ({
    ...node,
    tag: "a",
    attrs: {
      href: getUniqAttr(node.attrs),
      target: "_blank",
    },
  }),
  align: (node) => ({
    ...node,
    tag: "div",
    attrs: {
      align: getUniqAttr(node.attrs),
    },
  }),
  float: (node) => {
    const styleMap = {
      left: "float: left; margin-right: 5px;",
      right: "float: right; margin-left: 5px",
    };
    return {
      ...node,
      tag: "span",
      attrs: {
        style: styleMap[getUniqAttr(node.attrs)],
      },
    };
  },
  list: (node) => ({
    tag: getUniqAttr(node.attrs) ? "ol" : "ul",
    content: listItems(node.content),
  }),
  quote: (node) => ({
    ...node,
    tag: "blockquote",
    content: TagNode.create("p", {}, node.content),
  }),
  free: (node) => ({
    ...node,
    tag: "blockquote",
    content: TagNode.create("p", {}, node.content),
  }),
  code: (node) => ({
    ...node,
    tag: "pre",
    content: TagNode.create("code", {}, node.content),
  }),
  attachimg: (node) => ({
    tag: "div",
    attrs: {
      hidden: true,
      "data-type": "attachimg",
      "data-value": node.content[0],
    },
  }),
  attach: (node) => ({
    tag: "div",
    attrs: {
      hidden: true,
      "data-type": "attach",
      "data-value": node.content[0],
    },
  }),
  hide: (node) => ({
    ...node,
    tag: "div",
    attrs: {
      hidden: true,
      "data-type": "hide",
    },
  }),
  postbg: (node) => ({
    tag: "div",
    attrs: {
      hidden: true,
      "data-type": "postbg",
      "data-value": node.content[0],
    },
  }),
  password: (node) => ({
    tag: "div",
    attrs: {
      hidden: true,
      "data-type": "password",
      "data-value": node.content[0],
    },
  }),
  qq: (node) => ({
    tag: "div",
    attrs: {
      hidden: true,
      "data-type": "qq",
      "data-value": node.content[0],
    },
  }),
});

const Component = ({
  code = "",
  plugins = [],
  options = {},
  parseOptions = {},
}) => {
  return parse(
    bbob([preset(), plugin, ...plugins]).process(code, {
      render,
      contextFreeTags: ["code"],
      ...options,
    }).html,
    { ...parseOptions }
  );
};

export default React.memo(Component);
export { listItems };
