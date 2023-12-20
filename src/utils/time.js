import dayjs from "dayjs";
import zhCN from "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale(zhCN);
dayjs.extend(relativeTime);

export const fromNow = (date) => dayjs(date).fromNow();
