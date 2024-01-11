import { Provider } from "react-redux";
import stores from "@stores";

export default ({ children }) => <Provider store={stores}>{children}</Provider>;
