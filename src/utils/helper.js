export const arrayToTree = ({
  rowKey,
  parentKey = "parentId",
  childrenKey = "children",
  items,
  parentId,
  level,
}) =>
  items
    .filter((item) => item[parentKey] === parentId)
    .map((item) => ({
      ...item,
      [childrenKey]: arrayToTree({
        rowKey,
        parentKey,
        childrenKey,
        items,
        parentId: item[rowKey],
        level: level + 1,
      }),
      level,
    }));

export const findHierarchyById = ({
  tree,
  rowKey = "id",
  childrenKey = "children",
  targetId,
}) =>
  tree.reduce((result, node) => {
    if (node[rowKey] === targetId) {
      return [...result, node[rowKey]];
    }
    const children = findHierarchyById({
      tree: node[childrenKey] || [],
      rowKey,
      childrenKey,
      targetId,
    });
    return children.length ? [...result, node[rowKey], ...children] : result;
  }, []);
