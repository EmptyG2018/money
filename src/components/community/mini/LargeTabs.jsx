import {
  Radio,
  Popover,
  Tabs,
  CapsuleTabs,
  JumboTabs,
  Grid,
} from "antd-mobile";
import { AppstoreOutline } from "antd-mobile-icons";
import { styled } from "styled-components";

const ComponentRoot = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--adm-color-border);
  background-color: #fff;
`;

const PopoverScrollbar = styled.div`
  padding: 8px;
  max-height: 140px;
  overflow-y: auto;
`;

const TabsControl = styled(Tabs)`
  flex: 1 0 0;
  .adm-tabs-header {
    border-bottom-width: 0;
  }
`;

const CapsuleTabsControl = styled(CapsuleTabs)`
  flex: 1 0 0;
  .adm-capsule-tabs-header {
    border-bottom-width: 0;
  }
`;

const JumboTabsControl = styled(JumboTabs)`
  flex: 1 1 0;
  .adm-jumbo-tabs-header {
    border-bottom-width: 0;
  }
`;

const MoreIcon = styled(AppstoreOutline)`
  font-size: var(--adm-font-size-9);
  margin: 0 16px;
  transform: translateY(-2px);
`;

const TYPE_MAP = {
  tabs: (items, props) => (
    <TabsControl {...props}>
      {items.map((item) => (
        <Tabs.Tab title={item.title} key={item.key} />
      ))}
    </TabsControl>
  ),
  capsuleTabs: (items, props) => (
    <CapsuleTabsControl {...props}>
      {items.map((item) => (
        <CapsuleTabs.Tab title={item.title} key={item.key} />
      ))}
    </CapsuleTabsControl>
  ),
  jumboTabs: (items, props) => (
    <JumboTabsControl {...props}>
      {items.map((item) => (
        <JumboTabs.Tab title={item.title} key={item.key} />
      ))}
    </JumboTabsControl>
  ),
};

const Component = ({
  type = "tabs",
  items = [],
  showMore = true,
  tabsStyle,
  getContainer,
  ...props
}) => {
  const { activeKey, onChange } = props;

  return (
    <ComponentRoot style={tabsStyle}>
      {TYPE_MAP[type] && TYPE_MAP[type](items, props)}
      {showMore && (
        <Popover
          style={{ "--content-padding": "16px 12px" }}
          getContainer={getContainer}
          trigger="click"
          content={
            <PopoverScrollbar>
              <Radio.Group
                value={activeKey}
                onChange={(key) => onChange && onChange(key)}
              >
                <Grid columns={2} gap={16}>
                  {items.map((item) => (
                    <Grid.Item span={1} key={item.key}>
                      <Radio value={item.key}>{item.title}</Radio>
                    </Grid.Item>
                  ))}
                </Grid>
              </Radio.Group>
            </PopoverScrollbar>
          }
        >
          <MoreIcon />
        </Popover>
      )}
    </ComponentRoot>
  );
};

export default Component;
