import { Link, useNavigate } from "react-router-dom";
import { List, Space, Avatar, NavBar, Image, Swiper } from "antd-mobile";
import {
  FireFill,
  EyeOutline,
  ClockCircleOutline,
  SearchOutline,
} from "antd-mobile-icons";
import { useRequest } from "ahooks";
import { GetPostCarsouels, GetIfPosts } from "@package_community/services/post";
import Page from "@components/community/mini/Page";
import { useAgentSetting } from "@plugins/agent";
import { GetConfigStyleModuleList } from "@services/setting";
import {ProCard} from "@ant-design/pro-components";
import styled, { css } from "styled-components";
import {Col} from "antd";


const CONSTAVATARIMG =
  "http://6uzy.com/uc_server/avatar.php?uid=1&size=middle&ts=1";

const DotIndicator = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.3);
  padding: 4px 8px;
  color: #ffffff;
  border-radius: 4px;
  user-select: none;
`;

const SwiperDescription = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ArticleList = styled(List)`
  margin-bottom: 10px;
  --header-font-size: 16px;
  .adm-list-header {
    background-color: #fff;
    padding-block: 10px;
  }
`;

const ArticleAuthor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  font-size: 12px;
  color: #999;
`;

const NickName = styled.span`
  display: inline-block;
  width: 48px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

const ArticleTitle = styled.h2`
  display: flex;
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  height: 48px;
  line-height: 24px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ArticleDesc = styled.div`
  margin-block-start: 4px;
`;

const Main = styled.div``;

const StyleModueSection = styled.div`
  margin-bottom: 16px;
`;


const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyleModuleRoot = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  ${({ $bordered }) =>
    $bordered &&
    css`
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      overflow: hidden;
    `}
  ${({ $between }) =>
    $between &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
`;


const StyleModuleRootbk = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  ${({ $bordered }) =>
    $bordered &&
    css`
      border-radius: 6px;
      overflow: hidden;
      margin:auto;
    `}
  ${({ $between }) =>
    $between &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
`;

const StyleModuleRootTitle = styled.div`
    border-bottom: 1px solid #eee;
        display: block;
    height: 35px;
    line-height: 35px;
    overflow: hidden;
    font-size: 14px;
`;

const StyleModuleImg = styled.img`
  display: block;
  width: 100%;
`;
const StyleModuletitleImg = styled.img`
  width: 50px;
`;
const StyleModuleBody = styled.div`
  padding: 10px;
`;

const StyleModuleTitle = styled(Ellipsis)`
  flex: 1 0 0;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
`;

const StyleModuleDesc = styled.div`
  font-size: 12px;
  color: #444;
`;

const StyleModuleA = ({ url, title, imgStyle, ...props }) => {
    return (
        <StyleModuleRoot style={{ width: "48%" }} {...props}>
            <StyleModuleImg style={imgStyle} src={url} />
            <StyleModuleTitle>{title}</StyleModuleTitle>
        </StyleModuleRoot>
    );
};

const StyleModuleB = ({ url, title, imgStyle, ...props }) => {
    return (
        <Col xs={11} sm={7} lg={6}  style={{float: "left","margin-left":"12px",    "padding-top": "8px","padd   ing-bottom": "8px"}}>
        <StyleModuleRoot $bordered {...props}>
            <StyleModuleImg style={imgStyle} src={url} />
            <StyleModuleBody>
                <StyleModuleTitle>{title}</StyleModuleTitle>
            </StyleModuleBody>
        </StyleModuleRoot>
        </Col>
    );
};

const StyleModuleC = ({ title, desc,photoUrl, ...props }) => {
    return (
        <StyleModuleRootTitle
            $between
            style={{ paddingInline: "8px",width:"100%" }}
            {...props}
        >

            <StyleModuleTitle    style={{width:"100%" }}>
                {title}
            </StyleModuleTitle>
            <StyleModuleDesc>{desc}</StyleModuleDesc>
        </StyleModuleRootTitle>
    );
};



const StyleModuleD = ({ url, title,imgStyle, ...props }) => {
    return (
        <StyleModuleRootbk $bordered style={{ width: "19%",display: "block"  }} {...props}>

            <ProCard ghost style={{ "box-sizing": "border-box","text-overflow": "ellipsis", height: "100%", "padding-inline": "12px", "padding-block": "16px"}}>

                    <Image
                        src={url}
                        preview={false}
                        style={{width: "2.5rem",height: "2.5rem",    margin:" 0 2px","border-radius":"50%"}}
                    />
                <Space style={{    overflow: "hidden", "font-size": "12px",   width: "50px"}}>
                    {title}
                </Space>
            </ProCard>

        </StyleModuleRootbk>
    );
};

const StyleModuleE = ({ url,imgStyle,goUrl, ...props }) => {
    return (
        <StyleModuleRoot style={{ width: "100%" }} {...props}>
            <Link
                to={goUrl}>
                <StyleModuleImg src={url} style={imgStyle} />
            </Link>
        </StyleModuleRoot>
    );
};






const StyleModuleTemplate = ({ styleKey, imgStyle, items,title,titleStyle }) => {
    const navigate = useNavigate();

    const styleModuleMap = {
        1: ({ items }) => (
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {items.map((item) => (
                    <StyleModuleA
                        key={item.tid}
                        url={item.attachment}
                        title={item.subject}
                        imgStyle={imgStyle}
                        onClick={() => navigate("/m/community/article/" + item.tid)}
                    />
                ))}
            </div>
        ),
        2: ({ items }) => (
            <ArticleList
                header={
                    <span style={titleStyle}>
                    <FireFill /> {title}
                    </span>
                }
            >
            <div style={{ display: "flex",  flexWrap: "wrap","background-color": "#fff" }}>


                {items.map((item) => (

                    <StyleModuleB
                        key={item.tid}
                        url={item.attachment}
                        title={item.subject}
                        imgStyle={imgStyle}
                        onClick={() => navigate("/m/community/article/" + item.tid)}
                    />
                ))}

            </div>
            </ArticleList>
        ),
        3: ({ items }) => (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <ArticleList
                    header={
                        <span style={titleStyle}>
                    <FireFill /> {title}
                    </span>
                    }
                >
                    {items.map((item) => (
                        <List.Item
                            key={item.tid}
                            arrow={false}
                            prefix={
                                <ArticleAuthor>
                                    <Avatar
                                        style={{ "--size": "48px", "--border-radius": "24px" }}
                                        src={item.phoneUrl}
                                        fit="cover"
                                    />
                                    <NickName>{item.author}</NickName>
                                </ArticleAuthor>
                            }
                            description={
                                <ArticleDesc>
                                    <Space align="center" style={{ "--gap": "12px" }}>
                    <span>
                    <EyeOutline /> {item.views}
                    </span>
                                        <span>
                    <ClockCircleOutline /> {item.dateline}
                    </span>
                                    </Space>
                                </ArticleDesc>
                            }
                            onClick={() => navigate("/m/community/article/" + item.tid)}
                        >
                            <ArticleTitle
                                dangerouslySetInnerHTML={{ __html: item.subject }}
                            ></ArticleTitle>
                        </List.Item>
                    ))}
                </ArticleList>
            </div>
        ),
        4: ({ items }) => (
            <div style={{ display: "flex",  gap: "3px",flexWrap: "wrap","background-color": "#fff"}}>
                {items.map((item) => (
                    <StyleModuleD
                        key={item.tid}
                        url={item.attachment}
                        title={item.subject}
                        imgStyle={imgStyle}
                        onClick={() => navigate("/m/community/list/" + item.fid)}
                    />
                ))}
            </div>
        ),
        5: ({ items }) => (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {items.map((item) => (
                    <StyleModuleE
                        key={item.tid}
                        url={item.photoUrl}
                        goUrl={item.goUrl }
                    />
                ))}
            </div>
        ),
    };
    return styleModuleMap[styleKey] ? styleModuleMap[styleKey]({ items }) : null;
};



const StyleModule = ({ items }) => {
    const imgStyleFn = (style) => {
        if (!style) return {};
        try {
            return JSON.parse(style);
        } catch {
            return {};
        }
    };

    const render = items.map((item) => (
        <StyleModueSection key={item.id}>
            <StyleModuleTemplate
                styleKey={item.moduleId}
                imgStyle={imgStyleFn(item.styleConfig)}
                items={item.listfrom}
                title={item.title}
                titleStyle={imgStyleFn(item.titleStyle)}
            />
        </StyleModueSection>
    ));
    return render;
};


const Component = () => {
  const navigate = useNavigate();
  const { data: postBannars } = useRequest(GetPostCarsouels, {
    defaultParams: [{ limit: 6 }],
  });
  const { data: newPosts } = useRequest(GetIfPosts, {
    defaultParams: [{ pageNum: 1, pageSize: 12, sort: "new" }],
  });
  const { data: hostPosts } = useRequest(GetIfPosts, {
    defaultParams: [{ pageNum: 1, pageSize: 12, sort: "host" }],
  });
    const { agentSetting } = useAgentSetting();

    const { data: styleModuleList } = useRequest(GetConfigStyleModuleList, {
        defaultParams: [
            {
                pageId: 1,
                projectId: 2,
                terminal: 2,
            },
        ],
    });

  return (
    <>
      <NavBar
        backArrow={false}
        right={
          <Link to="/m/community/search">
            <SearchOutline fontSize={20} />
          </Link>
        }
      >
          {agentSetting.webname}
      </NavBar>
      <Page background="#f5f5f5" yScroll style={{ position: "relative" }}>
        {postBannars?.length && (
          <Swiper
            autoplay
            indicator={(total, current) => (
              <DotIndicator>
                {current + 1}/{total}
              </DotIndicator>
            )}
            style={{
              marginBottom: "10px",
            }}
          >
            {(postBannars || []).map((item) => (
              <Swiper.Item
                key={item.tid}
                onClick={() => navigate("/m/community/article/" + item.tid)}
              >
                <Image src={item.threadimage} height={160} fit="cover" />
                <SwiperDescription>{item.subject}</SwiperDescription>
              </Swiper.Item>
            ))}
          </Swiper>
        )}

        {/*{hostPosts?.rows?.length && (*/}
        {/*  <ArticleList*/}
        {/*    header={*/}
        {/*      <span style={{ color: "#ff5900" }}>*/}
        {/*        <FireFill /> 热门帖子*/}
        {/*      </span>*/}
        {/*    }*/}
        {/*  >*/}
        {/*    {hostPosts.rows.map((item) => (*/}
        {/*      <List.Item*/}
        {/*        key={item.tid}*/}
        {/*        arrow={false}*/}
        {/*        prefix={*/}
        {/*          <ArticleAuthor>*/}
        {/*            <Avatar*/}
        {/*              style={{ "--size": "48px", "--border-radius": "24px" }}*/}
        {/*              src={CONSTAVATARIMG}*/}
        {/*              fit="cover"*/}
        {/*            />*/}
        {/*            <NickName>{item.author}</NickName>*/}
        {/*          </ArticleAuthor>*/}
        {/*        }*/}
        {/*        description={*/}
        {/*          <ArticleDesc>*/}
        {/*            <Space align="center" style={{ "--gap": "12px" }}>*/}
        {/*              <span>*/}
        {/*                <EyeOutline /> {item.views}*/}
        {/*              </span>*/}
        {/*              <span>*/}
        {/*                <ClockCircleOutline /> {item.dateline}*/}
        {/*              </span>*/}
        {/*            </Space>*/}
        {/*          </ArticleDesc>*/}
        {/*        }*/}
        {/*        onClick={() => navigate("/m/community/article/" + item.tid)}*/}
        {/*      >*/}
        {/*        <ArticleTitle*/}
        {/*          dangerouslySetInnerHTML={{ __html: item.subject }}*/}
        {/*        ></ArticleTitle>*/}
        {/*      </List.Item>*/}
        {/*    ))}*/}
        {/*  </ArticleList>*/}
        {/*)}*/}

        {/*{newPosts?.rows?.length && (*/}
        {/*  <ArticleList*/}
        {/*    header={*/}
        {/*      <span style={{ color: "#2f86ff" }}>*/}
        {/*        <FireFill /> 最新帖子*/}
        {/*      </span>*/}
        {/*    }*/}
        {/*  >*/}
        {/*    {newPosts.rows.map((item) => (*/}
        {/*      <List.Item*/}
        {/*        key={item.tid}*/}
        {/*        arrow={false}*/}
        {/*        prefix={*/}
        {/*          <ArticleAuthor>*/}
        {/*            <Avatar*/}
        {/*              style={{ "--size": "48px", "--border-radius": "24px" }}*/}
        {/*              src={CONSTAVATARIMG}*/}
        {/*              fit="cover"*/}
        {/*            />*/}
        {/*            <NickName>{item.author}</NickName>*/}
        {/*          </ArticleAuthor>*/}
        {/*        }*/}
        {/*        description={*/}
        {/*          <ArticleDesc>*/}
        {/*            <Space align="center" style={{ "--gap": "12px" }}>*/}
        {/*              <span>*/}
        {/*                <EyeOutline /> {item.views}*/}
        {/*              </span>*/}
        {/*              <span>*/}
        {/*                <ClockCircleOutline /> {item.dateline}*/}
        {/*              </span>*/}
        {/*            </Space>*/}
        {/*          </ArticleDesc>*/}
        {/*        }*/}
        {/*        onClick={() => navigate("/m/community/article/" + item.tid)}*/}
        {/*      >*/}
        {/*        <ArticleTitle*/}
        {/*          dangerouslySetInnerHTML={{ __html: item.subject }}*/}
        {/*        ></ArticleTitle>*/}
        {/*      </List.Item>*/}
        {/*    ))}*/}
        {/*  </ArticleList>*/}
        {/*)}*/}

          <Main>
              <StyleModule items={styleModuleList || []} />
          </Main>

      </Page>



    </>
  );
};

export default Component;
