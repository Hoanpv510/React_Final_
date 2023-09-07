import "./minibar.css";
import { AiFillBook } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiNotebook, GiSheep } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { PiSortAscendingLight } from "react-icons/pi";

const BarIcon = () => {
  return (
    <div className="mini_bar__container" >
      <ul className="mini_bar">
        <li className="d-flex">
          <span>
            <MdDashboard className="fs-4" />
          </span>
        </li>

        <li className="d-flex">
          <span>
            <FaUser className="fs-4" />
          </span>
        </li>

        <li className="d-flex">
          <span>
            <PiSortAscendingLight className="fs-4" />
          </span>
        </li>

        <li className="d-flex">
          <span>
            <GiSheep className="fs-4" />
          </span>
        </li>

        <li className="d-flex">
          <span>
            <AiFillBook className="fs-4" />
          </span>
        </li>

        <li className="d-flex">
          <span>
            <GiNotebook className="fs-4" />
          </span>
        </li>

        <li className="d-flex">
          <span>
            <BsPencilFill className="fs-4" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default BarIcon;
