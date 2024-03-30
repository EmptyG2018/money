import { useState, useEffect } from 'react';
import { Input, Tabs } from 'antd';
import { navData, navMap } from '@package_navigation/constant/search';
import styled from 'styled-components';

const SearchPanel = styled.div`
  max-width: 640px;
  margin: 0 auto;
  margin-bottom: 32px;
`;

const NavBar = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: none;
  }
`;

const CategoryBar = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: none;
  }
  .ant-tabs-tab-btn {
    color: #5f5f5f;
  }
  .ant-tabs-ink-bar {
    background: none;
  }
`;

const IndexSearchBar = () => {
  const [navTabKey, setNavTabKey] = useState('internal');
  const [navCategoryKey, setNavCategoryKey] = useState('');

  const navTabs = navData.map(({ children, ...rest }) => ({ ...rest }));

  const navCategorys =
    navData.find((item) => item.key === navTabKey)?.children || [];

  const navCategory = navCategorys.find((item) => item.key === navCategoryKey);

  useEffect(() => {
    setNavCategoryKey(navCategorys.length ? navCategorys[0].key : '');
  }, [navCategorys]);

  return (
    <SearchPanel>
      <NavBar
        centered
        activeKey={navTabKey}
        items={navTabs}
        onChange={setNavTabKey}
      />
      <Input.Search
        autoFocus
        placeholder={'搜索' + (navCategory?.label || '')}
        size="large"
        onSearch={(keyword) => {
          keyword.trim() &&
            navMap[navCategoryKey] &&
            navMap[navCategoryKey](keyword || '');
        }}
      />
      <CategoryBar
        size="small"
        animated={false}
        centered
        activeKey={navCategoryKey}
        items={navCategorys}
        onChange={setNavCategoryKey}
      />
    </SearchPanel>
  );
};

export default IndexSearchBar;
