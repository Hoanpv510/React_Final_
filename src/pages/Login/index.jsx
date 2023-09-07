import "./login.css";

import FormLogin from "./components/FormLogin";
import HeaderLogin from "./components/headerLogin";
// import { Helmet } from "react-helmet";
function LoginPage() {
  return (
      <div className="login_admin">
        {/* <Helmet>
          <title>Đăng nhập</title>
        </Helmet> */}
        <HeaderLogin />
        <FormLogin />
      </div>
  );
}

export default LoginPage;
