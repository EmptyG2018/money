import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Image } from "antd-mobile";
import { useRequest, useThrottleFn } from "ahooks";
import { GetPostModules } from "../../../services/community/post";
import Page from "../../../components/community/mini/Page";
import NavGrid from "../../../components/community/mini/NavGrid";
import LargeTabs from "../../../components/community/mini/LargeTabs";

const useFloorLocation = (scrollBar, els) => {
  const [activeKey, setActiveKey] = useState("");

  const { run: scrollLocation } = useThrottleFn(
    () => {
      let currentKey = "";
      for (let i = 0, j = els.current.length; i < j; i++) {
        const rect = els.current[i].el.getBoundingClientRect();
        if (rect.top <= 88) {
          currentKey = els.current[i].key;
        } else break;
      }
      setActiveKey(currentKey);
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    }
  );

  const scrollAchor = (key) => {
    const rect = els.current.find((item) => item.key === +key)?.el;
    scrollBar.current.scrollTo({
      top: rect?.offsetTop,
    });
  };

  useEffect(() => {
    scrollBar.current.addEventListener("scroll", scrollLocation);
    return () => {
      // scrollBar.current.removeEventListener("scroll", scrollLocation);
    };
  }, []);

  return { activeKey, scrollAchor };
};

const Component = () => {
  const scrollBar = useRef();
  const moduleEls = useRef([]);
  const navigate = useNavigate();
  const { activeKey, scrollAchor } = useFloorLocation(scrollBar, moduleEls);
  const { data: postModules } = useRequest(GetPostModules);

  const setModuleEls = (key, el) => moduleEls.current.push({ key, el });

  return (
    <>
      <NavBar backArrow={false}>分类</NavBar>
      <Page
        ref={scrollBar}
        background="#f5f5f5"
        yScroll
        style={{ position: "relative" }}
      >
        {postModules?.length && (
          <LargeTabs
            activeKey={activeKey}
            tabsStyle={{
              zIndex: 1,
              position: "sticky",
              top: 0,
            }}
            items={postModules.map((item) => ({
              title: item.name,
              key: item.fid,
            }))}
            onChange={scrollAchor}
          />
        )}

        {(postModules || []).map((item) => (
          <NavGrid
            ref={(el) => setModuleEls(item.fid, el)}
            style={{ background: "#fff", marginBottom: "10px" }}
            header={item.name}
            columns={4}
            gap={[0, 20]}
            items={(item.children || []).map((item) => ({
              key: item.fid,
              title: item.name,
              icon: <Image lazy src={item.icon} width={40} height={40} />,
            }))}
            key={item.fid}
            onItemClick={(key) => {
              navigate("/m/community/list/" + key);
            }}
          />
        ))}
      </Page>
    </>
  );
};

export default Component;
