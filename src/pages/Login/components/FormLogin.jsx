import { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
function FormLogin() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errLogin, setErrLogin] = useState(false);
  const handleClick = () => {
    // 👇️ toggle isActive state on click
    setIsActive(() => !isActive);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://wlp.howizbiz.com/api/web-authenticate",
        {
          username,
          password,
        }
      );
      const { access_token } = response.data; // Giả sử API trả về token
      // Lưu mã token vào local storage hoặc state
      localStorage.setItem("access_token", access_token);
      toast.success("Đăng nhập thành công");

      window.location.href = "http://localhost:5173/loai";
    } catch (error) {
      if (!error?.response) {
        console.error("No Server Response");
      } else if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else if (error.response?.status === 401) {
        console.error("Unauthorized");
      } else if (error.response?.status === 422) {
        setErrLogin(error.response.data.errors);
      } else {
        console.error("Login Fail");
      }
    }
  };
  return (
    <div className="form__login">
      <div className="form__login--logo align-self-center mt-4">
        <img
          src="../src/assets/img/logoColor.e5de23ce.png"
          alt=""
          width="90px"
        />
        <h2 className="mt-3">Đăng Nhập</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input__group">
          <div className="border_input">
            <div className="input__login">
              <FaUser className="text-secondary align-self-center" />
              <input
                id="status"
                type="text"
                value={username}
                placeholder="Tên đăng nhập"
                className="border-0 ps-3"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          {errLogin.username && (
            <p className="errorLogin text-danger">
              {errLogin.username.join(", ")}
            </p>
          )}
          <div className="tab_Login"></div>
          <div className="border_input">
            <div className="input__login">
              <FaLock className="text-secondary align-self-center" />
              <input
                id="status"
                type={isActive ? "password" : "text"}
                value={password}
                placeholder="Mật khẩu"
                className="border-0 ps-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={handleClick}>
                {isActive ? (
                  <FaEye className="text-secondary align-self-center" />
                ) : (
                  <FaEyeSlash className="text-secondary align-self-center" />
                )}
              </span>
            </div>
          </div>
          {errLogin.password && (
            <p className="errorLogin text-danger">
              {errLogin.password.join(", ")}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-danger mb-3 mt-3 w-75 rounded-5"
        >
          Đăng Nhập
        </button>

        <a href="" className="d-block text-danger ">
          Quên mật khẩu
        </a>
      </form>
    </div>
  );
}

export default FormLogin;
