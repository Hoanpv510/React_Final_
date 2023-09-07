import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import "./Session3.css";
import AddComponentSachDo from "./components";
import AddComponentIUCN from "./components/CpIUCN";

function Session3() {
  const [infoList, setInfoList] = useState([]);
  const [infoList1, setInfoList1] = useState([]); // Danh sách các component con
  // Danh sách các component con
  // AddSachDo
  const addInfoInput = () => {
    setInfoList([
      ...infoList,
      <AddComponentSachDo key={infoList.length} onDelete={deleteInfoInput} />,
    ]);
  };

  const deleteInfoInput = (index) => {
    const updatedList = infoList.filter((_, i) => i !== index);
    setInfoList(updatedList);
  };
  //ADIUCN
  const addInfoInput1 = () => {
    setInfoList1([
      ...infoList1,
      <AddComponentIUCN key={infoList1.length} onDelete={deleteInfoInput1} />,
    ]);
  };

  const deleteInfoInput1 = (index) => {
    const updatedList = infoList1.filter((_, i) => i !== index);
    setInfoList1(updatedList);
  };
  return (
    <div className="row">
      <h6 className="title">
        <b>III. Tình trạng bảo tồn</b>
      </h6>
      <div className="col-6">
        <b>Sách đỏ</b>
        <div className="title__redbookgroup">
          <p>Năm</p>
          <p>Hiện trạng</p>
        </div>
        <div id="addnew">
          {infoList.map((info, index) => (
            <div key={index}>{info}</div>
          ))}
        </div>
        <button
          onClick={addInfoInput}
          className="btn w-100 bg-secondary-subtle"
        >
          <IoMdAdd className="red__book" />
        </button>
      </div>
      <div className="col-6">
        <b>IUCN</b>
        <div className="title__redbookgroup">
          <p>Năm</p>
          <p>Hiện trạng</p>
        </div>
        <div id="addnew1">
          {infoList1.map((info, index) => (
            <div key={index}>{info}</div>
          ))}
        </div>
        <button
          onClick={addInfoInput1}
          className="btn w-100 bg-secondary-subtle"
        >
          <IoMdAdd className="red__book" />
        </button>
      </div>
    </div>
  );
}

export default Session3;
