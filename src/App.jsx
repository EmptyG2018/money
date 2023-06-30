import { RouterProvider } from "./providers";
import { Provider } from "react-redux";
import GlobalStyle from "./globalStyle";
import stores from "./stores";

const ReduxProvider = ({ children }) => {
  return <Provider store={stores}>{children}</Provider>;
};

const ConfigProvider = ({ children }) => {
  return (
    <>
      <ReduxProvider>
        <RouterProvider />
        {children}
      </ReduxProvider>
    </>
  );
};

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ConfigProvider />
    </>
  );
};

export default App;
