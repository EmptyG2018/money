import { Image, Space } from "antd";
import { Link } from "react-router-dom";
import { ProCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { GetPostModules } from "@package_community/services/post";
import { styled } from "styled-components";
import Container from "@components/Container";

const ApplicationCell = styled.div`
  margin-left: 10px;
  flex: 1 0 0;
  width: 0;
`;

const ApplicationTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ApplicationDesc = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #6c757d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Application = ({ thumb, title, desc, ...props }) => {
  return (
    <ProCard layout="center" bodyStyle={{ padding: 14 }} {...props}>
      <Image src={thumb} width={42} height={42} preview={false} />
      <ApplicationCell>
        <ApplicationTitle title={title}>{title}</ApplicationTitle>
        <ApplicationDesc>{desc}</ApplicationDesc>
      </ApplicationCell>
    </ProCard>
  );
};

const Component = () => {
  const { data: postModules } = useRequest(GetPostModules);

  return (
    <Container title={false} gutter={[16, 24]}>
      <Space direction="vertical" size={16}>
        {(postModules || []).map((item) => (
          <ProCard
            wrap
            gutter={[16, 16]}
            title={item.name}
            key={item.fid}
            bordered
          >
            {(item.children || []).map((item) => (
              <ProCard ghost colSpan={6}>
                <Link to={"/community/list/" + item.fid}>
                  <Application
                    thumb={item.icon}
                    title={item.name}
                    desc={"贴数：" + item.posts}
                    key={item.fid}
                  />
                </Link>
              </ProCard>
            ))}
          </ProCard>
        ))}
      </Space>
    </Container>
  );
};

export default Component;
