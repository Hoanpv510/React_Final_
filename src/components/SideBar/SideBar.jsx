import { BsPencilFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiSheep } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { PiSortAscendingLight } from "react-icons/pi";
import { AiFillBook, AiOutlineBook } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";

import "./SideBar.css";
import SubBar from "./components/SubBar";

const listSideBar = [
  {
    id: 1,
    icon: <MdDashboard />,
    title: "Bảng điều khiển",
  },
  {
    id: 2,
    icon: <FaUser className="fs-5" />,
    title: "Quản lí người dùng",
  },
  {
    id: 3,
    icon: <PiSortAscendingLight className="fs-5" />,
    title: "Phân loại học",
  },
  {
    id: 4,
    icon: <GiSheep className="fs-5" />,
    title: "Loài nguy cấp quý hiếm",
  },
  {
    id: 5,
    icon: <BsPencilFill className="fs-5" />,
    title: "Bài viết",
  },
];

function SideBar(isSideBarVisible) {
  const iconListBar = <GiNotebook className="fs-5" />;
  const iconListBar2 = <AiFillBook className="fs-5" />;
  return (
    <>
      <div
        className={isSideBarVisible ? "side__bar visible" : "side__bar hidden"}
      >
        <ul className="list_sideBar">
          {listSideBar.map((item) => (
            <li key={item.id} className="item__sideBar">
              <span className="icon_css">{item.icon}</span> <b>{item.title}</b>
            </li>
          ))}

          <SubBar
            title="Phiếu đề Xuất"
            item1="Đưa loài vào"
            item2="Đưa loài ra"
            element={iconListBar}
            className="active"
          >
            <div className="item__book">
              <AiOutlineBook className="icon_css" />
              <b>Phiếu thông tin</b>
            </div>
          </SubBar>
          <SubBar
            title="Danh mục"
            item1="Danh mục tĩnh"
            item2="Danh mục động"
            element={iconListBar2}
          />
        </ul>
      </div>
    </>
  );
}

export default SideBar;
