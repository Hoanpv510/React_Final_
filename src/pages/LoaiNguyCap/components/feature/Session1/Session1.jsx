/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Session1.css";
function Session1({ updateData, errorFromParent, errorTenKhoaHoc }) {
  const [inputData, setInputData] = useState({
    ten: "",
    ten_khoa_hoc: "",
    ten_tac_gia: "",
    ten_dia_phuong: "",
    nguon_du_lieu: "",
  });

  const handleInputChange = (field, value) => {
    const updatedData = {
      ...inputData,
      [field]: value,
    };
    setInputData(updatedData);
    updateData(field, value); // Gọi hàm callback để truyền dữ liệu lên cha
  };
  return (
    <div>
      <div className="d-flex align-items-center mt-5">
        <Link to={"../loai"} className="btn__back">
          <IoMdArrowBack className="fs-1 text-danger" />
        </Link>
        <h4 className="m-0">
          <b>
            THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </b>
        </h4>
      </div>
      <div className="mt-3">
        <div className="session1">
          <h6 className="title">
            <b>I. Thông tin chung về loài</b>
          </h6>
          <div className="row">
            <div className="">
              <div>
                <p className="m-0">
                  Tên <span className="text-danger">*</span>
                </p>
                <input
                  className="input__group--animal"
                  type="text"
                  name="name"
                  id=""
                  placeholder="Tên"
                  size={100}
                  onChange={(e) => handleInputChange("ten", e.target.value)}
                />
                {errorFromParent && (
                  <p className="text-danger">{errorFromParent}</p>
                )}
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <p className="m-0">
                    Tên khoa học <span className="text-danger">*</span>
                  </p>
                  <input
                    className="input__group--animal "
                    type="text"
                    placeholder="Tên khoa học"
                    size={45}
                    onChange={(e) =>
                      handleInputChange("ten_khoa_hoc", e.target.value)
                    }
                  />
                  {errorFromParent && (
                    <p className="text-danger">{errorTenKhoaHoc}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <p className="m-0"> Tên tác giả </p>
                  <input
                    className="input__group--animal "
                    type="text"
                    placeholder="Tên tác giả"
                    size={45}
                    onChange={(e) =>
                      handleInputChange("ten_tac_gia", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <p className="m-0">Tên Địa Phương</p>
                <input
                  className="input__group--animal"
                  type="text"
                  placeholder="Tên địa phương"
                  onChange={(e) =>
                    handleInputChange("ten_dia_phuong", e.target.value)
                  }
                />
              </div>
              <div>
                <p className="m-0">Nguồn dữ liệu</p>
                <input
                  className="input__group--animal"
                  type="text"
                  placeholder="Nguồn dữ liệu"
                  onChange={(e) =>
                    handleInputChange("nguon_du_lieu", e.target.value)
                  }
                />
              </div>
            </div>
            {/* <div className="col-3 ps-3">
              <p>Trạng thái</p>
              <p>Mã truy cập (QR) </p>
              <div className="d-flex">
                <div className="qr__code" alt=""></div>
                <div>
                  <p className="m-0">Sử dụng mã QR</p>
                  <p className="m-0">Màu hiển thị</p>
                  <input type="checkbox"></input>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Session1;
