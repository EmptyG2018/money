import { ConfigProvider } from "antd";
import Ant_zhCN from "antd/es/locale/zh_CN";

import dayjs from "dayjs";
import Dayjs_zhCN from "dayjs/locale/zh-cn";

dayjs.locale(Dayjs_zhCN);

export default ({ children }) => (
  <ConfigProvider locale={Ant_zhCN}>{children}</ConfigProvider>
);
