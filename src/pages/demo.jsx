import { memo, useState, useRef } from "react";
import { useRequest } from "ahooks";
import { GetMarksByCollectionId } from "../services/collection/mark";
import { ImgMark, WordMark, Mark } from "../components/collection/Mark";
import { useEffect, useLayoutEffect } from "react";

const Component = () => {
  const ref = useRef([]);
  const [columns, setColumns] = useState([[], [], [], []]);
  const { refresh: refreshMarks, data: mark } = useRequest(() =>
    GetMarksByCollectionId({
      title: "",
      collectionsId: -1,
      offset: 0,
      pageSize: 100,
    })
  );

  useLayoutEffect(() => {
    if (mark?.rows && ref.current.length) {
      mark.rows.forEach((item) => {
        const index = ref.current.findIndex((num) => {
          return (
            num.offsetHeight ===
            Math.min(...ref.current.map((el) => el.offsetHeight))
          );
        });
        const cloneColumns = JSON.parse(JSON.stringify(columns));
        cloneColumns[index].push(item);
        setColumns(cloneColumns);
      });
    }
  }, [mark]);

  return (
    <>
      <button
        onClick={() => {
        }}
      >
        get ref
      </button>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        {columns.map((column, index) => (
          <div
            ref={(el) => (ref.current[index] = el)}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1 0 0",
              width: 0,
              gap: 16,
            }}
          >
            {(column || []).map((item) => (
              <>
                {item.mediaType === 0 && (
                  <Mark.Compact title={item.title} thumb={item.imageUrl} />
                )}
                {item.mediaType === 1 && (
                  <ImgMark.Compact thumb={item.domain} />
                )}
                {item.mediaType === 2 && (
                  <WordMark.Compact
                    title={item.title}
                    word={item.description}
                  />
                )}
              </>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Component;
