/* eslint-disable react/prop-types */
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.css";

function HeaderUserBoad({ setIsSideBarVisible }) {
  const [myUser, setMyUser] = useState([]);
  const access_token = localStorage.getItem("access_token");
  const [showLogoutForm, setShowLogoutForm] = useState(true);
  const logoutFormRef = useRef(null);
  const handleClick = () => {
    setShowLogoutForm(!showLogoutForm);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        logoutFormRef.current &&
        !logoutFormRef.current.contains(event.target)
      ) {
        setShowLogoutForm(false);
        console.log(logoutFormRef.current.contains(event.target));
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axios
      .get("https://wlp.howizbiz.com/api/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const dataArray = response.data; // Trích xuất mảng từ thuộc tính "data"
        setMyUser(dataArray.user); // Gán mảng vào trạng thái data
        // setMyUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [access_token]);
  const [isActive, setIsActive] = useState(true);
  const handleClickBar = () => {
    setIsActive(!isActive);
    setIsSideBarVisible(!isActive); // Đảo ngược trạng thái của SideBar
  };
  return (
    <>
      <div className="nav__userboad row">
        <div className="col-10 d-flex header__title" >
          <button onClick={handleClickBar} className="btn__bars">
            <FaBars className="fs-4  text-secondary align-self-center" />
          </button>
          <img
            className="logo_userboad align-self-center me-3"
            src="https://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
            width="30px"
          />
          <h5 className="m-2 align-self-center">
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h5>
        </div>

        <div className=" col-2">
          <div onClick={handleClick} className="d-flex user_info">
            <div
              className="avatar"
              style={{
                background: `url("${myUser?.avatar_url}")`,
              }}
            ></div>
            <p>{myUser.name}</p>
          </div>
          {!showLogoutForm && (
            <div ref={logoutFormRef}>
              <div className="logout__user ">
                <p
                  className="avatar__logout avatar "
                  style={{
                    background: `url("${myUser?.avatar_url}")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></p>
                <p className="m-0">{myUser.name}</p>
                <p
                  className="role_logout"
                  style={{ background: `${myUser.role?.meta?.color}` }}
                >
                  {myUser.role?.name}
                </p>
                <div className="button__logingroup m-3">
                  <button className="btn btn-outline-secondary">Hồ sơ</button>
                  <Link to={"../login"} className="btn btn-outline-danger">
                    Đăng xuất
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HeaderUserBoad;
