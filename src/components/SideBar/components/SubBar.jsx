/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiBook, BiBookAdd } from "react-icons/bi";
import { IoMdArrowDropleft } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";

function SubBar(props) {
  const [iconChange, setIconChange] = useState(true);
  const [show, setShow] = useState(false);
  const handleClick = () => {
    // 👇️ toggle isActive state on click
    setIconChange(() => !iconChange);
    setShow(() => !show);
  };

  return (
    <li className="item__sideBar" onClick={handleClick}>
      <div className="d-flex justify-content-between">
        <span className="icon_css">
          {props.element}
          <b>{props.title}</b>
        </span>
        <span className="icon_css pe-3">
          {iconChange ? <IoMdArrowDropleft /> : <MdArrowDropDown />}
        </span>
      </div>

      <div className={show ? "d-block" : "d-none"}>
        <div className="item__book ">
          <BiBookAdd className="icon_css" />
          <b>{props.item1}</b>
        </div>
        <div className="item__book">
          <BiBook className="icon_css" />
          <b>{props.item2}</b>
        </div>
        {props.children}
      </div>
    </li>
  );
}

export default SubBar;
