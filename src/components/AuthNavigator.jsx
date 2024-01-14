import { useUser } from "@hooks/user";
import { useNavigatorPath } from "@hooks/recordPath";

const Component = ({ children, ...props }) => {
  const { user } = useUser();
  const navigatorLogin = useNavigatorPath("/login");
  return (
    <span
      onClickCapture={(e) => {
        if (!user) {
          navigatorLogin();
          e.stopPropagation();
        }
      }}
      {...props}
    >
      {children}
    </span>
  );
};

export default Component;
