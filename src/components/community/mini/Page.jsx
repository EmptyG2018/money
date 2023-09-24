import { forwardRef } from "react";
import { styled, css } from "styled-components";

const ComponentRoot = styled.div`
  flex: 1 1 0;
  height: 0;
  background-color: ${({ background }) => background};
`;

const ScrollBar = styled.div`
  box-sizing: border-box;
  height: 100%;
  ${({ yScroll, xScroll, gutter: [gutterInline, gutterBlock] }) => css`
    overflow-x: ${xScroll && "auto"};
    overflow-y: ${yScroll && "auto"};
    padding-inline: ${gutterInline && gutterInline + "px"};
    padding-block: ${gutterBlock && gutterBlock + "px"};
  `}
`;

const Component = forwardRef(
  (
    { background, xScroll, yScroll, gutter, children, scrollStyle, ...props },
    ref
  ) => {
    const [gutterInline, gutterBlock = gutterInline] = Array.isArray(gutter)
      ? gutter
      : [];

    return (
      <ComponentRoot background={background} {...props}>
        <ScrollBar
          ref={ref}
          xScroll={xScroll}
          yScroll={yScroll}
          style={scrollStyle}
          gutter={[gutterInline, gutterBlock]}
        >
          {children}
        </ScrollBar>
      </ComponentRoot>
    );
  }
);

export default Component;
