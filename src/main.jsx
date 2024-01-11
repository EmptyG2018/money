import React from "react";
import ReactDOM from "react-dom/client";
import { ReduxProvider, RouterProvider, AntdProvider } from "./providers";
import GlobalStyle from "./globalStyle";

const ConfigProvider = ({ children }) => (
  <ReduxProvider>
    <AntdProvider>
      <RouterProvider />
      {children}
    </AntdProvider>
  </ReduxProvider>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <ConfigProvider />
  </React.StrictMode>
);
