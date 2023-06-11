import { RouterProvider } from "./providers";
import GlobalStyle from "./globalStyle";

const ConfigProvider = ({ children }) => {
  return (
    <>
      <RouterProvider />
      {children}
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
