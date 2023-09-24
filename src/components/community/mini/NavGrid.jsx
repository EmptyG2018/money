import { forwardRef } from "react";
import { Grid } from "antd-mobile";
import { styled } from "styled-components";

const ComponentRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavGridHeader = styled.div`
  padding-inline: 16px;
  padding-block: 12px;
  border-bottom: 1px solid #eee;
`;

const NavGridList = styled(Grid)`
  padding-block: 20px;
`;

const NavGridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NavGridItemIcon = styled.div`
  margin-bottom: 8px;
`;

const NavGridItemTitle = styled.p`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0 12px;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;

const Component = forwardRef(
  ({ header, items = [], onItemClick, style, ...props }, ref) => {
    return (
      <ComponentRoot style={style} ref={ref}>
        <NavGridHeader>{header}</NavGridHeader>
        <NavGridList {...props}>
          {items.map((item) => (
            <Grid.Item key={item.key}>
              <NavGridItem
                onClick={() => onItemClick && onItemClick(item.key, item)}
              >
                <NavGridItemIcon>{item.icon}</NavGridItemIcon>
                <NavGridItemTitle>{item.title}</NavGridItemTitle>
              </NavGridItem>
            </Grid.Item>
          ))}
        </NavGridList>
      </ComponentRoot>
    );
  }
);

export default Component;
