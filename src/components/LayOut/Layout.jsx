import FooterUser from "../FooterUser";
import HeaderUser from "../HeaderUser";
import PropTypes from "prop-types";
import SideBar from "../SideBar/SideBar";
import { useState } from "react";
import BarIcon from "../SideBar/components/BarIcon";
import "./style.css";
Layout.propTypes = {
  children: PropTypes.element,
};

function Layout(props) {
  const { children } = props;
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);

  return (
    <>
      <HeaderUser setIsSideBarVisible={setIsSideBarVisible} />
      <div className="container__layout d-flex">
        {isSideBarVisible && (
          <div className="container__bar">
            <SideBar />
          </div>
        )}
        {!isSideBarVisible && (
          <div className="bar_icon">
            <BarIcon />
          </div>
        )}
        <div className="container__content">{children}</div>
      </div>
      <FooterUser />
    </>
  );
}

export default Layout;
