import { IoMdAdd, IoMdArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Session2 from "../Session2/Session2";
import Session3 from "../Session3/Session3";
import { useParams } from "react-router-dom";
function UpdateLoai() {
  const [animalData, setAnimalData] = useState({
    genus_id: "",
    family_id: "",
    order_id: "",
    class_id: "",
    phylum_id: "",
    kingdom_id: "",
    ten: "",
    toa_dos: [],
    ten_khoa_hoc: "",
    nguon_du_lieu: "",
    ten_dia_phuong: "",
    ten_tac_gia: "",
    sach_dos: [{}],
    iucns: [{}],
  });
  const access_token = localStorage.getItem("access_token");

  // Sử dụng useParams để lấy giá trị của ID từ URL
  const { id } = useParams();

  const handleChildSelectChange = (field, value) => {
    // Cập nhật dữ liệu cũ trong `animalData` dựa trên `field` và `value` mới
    setAnimalData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    axios
      .get(`https://wlp.howizbiz.com/api/species/` + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setAnimalData(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu từ API:", error);
      });
  }, [access_token, id]);
  const navigat = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://wlp.howizbiz.com/api/species/" + id,
        JSON.stringify(animalData),
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Server response:", response.data);

      navigat("/loai");
      toast.success("Update loài thành công !!!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  console.log(animalData);
  return (
    <form onSubmit={handleSubmit} className="container">
      <div className=" row container__addAnimal">
        <div className="d-flex align-items-center mt-5">
          <Link to={"../loai"} className="btn__back">
            <IoMdArrowBack className="fs-1 text-danger" />
          </Link>
          <h4 className="m-0">
            THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h4>
        </div>
        <div>
          <div className="session1">
            <h6 className="title">
              <b>I. Thông tin chung về loài</b>
            </h6>
            <div className="row">
              <div className="col-9">
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
                    value={animalData?.ten}
                    onChange={(e) =>
                      setAnimalData({ ...animalData, ten: e.target.value })
                    }
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="m-0">
                      Tên khoa học <span className="text-danger">*</span>
                    </p>
                    <input
                      className="input__group--animal"
                      type="text"
                      placeholder="Tên khoa học"
                      size={40}
                      value={animalData?.ten_khoa_hoc}
                      onChange={(e) =>
                        setAnimalData({
                          ...animalData,
                          ten_khoa_hoc: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <p className="m-0"> Tên tác giả </p>
                    <label>
                      <input
                        className="input__group--animal"
                        type="text"
                        placeholder="Tên tác giả"
                        size={40}
                        value={animalData?.ten_tac_gia || ""}
                        onChange={(e) =>
                          setAnimalData({
                            ...animalData,
                            ten_tac_gia: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <p className="m-0">Tên Địa Phương</p>
                  <label>
                    <input
                      className="input__group--animal"
                      type="text"
                      placeholder="Tên địa phương"
                      value={animalData?.ten_dia_phuong || ""}
                      onChange={(e) =>
                        setAnimalData({
                          ...animalData,
                          ten_dia_phuong: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div>
                  <p className="m-0">Nguồn dữ liệu</p>
                  <label>
                    <input
                      className="input__group--animal"
                      type="text"
                      placeholder="Nguồn dữ liệu"
                      value={animalData?.nguon_du_lieu || ""}
                      onChange={(e) =>
                        setAnimalData({
                          ...animalData,
                          nguon_du_lieu: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="col-3 ps-3">
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
              </div>
            </div>
          </div>
        </div>
        {/* body */}
        <div className="row">
          <div className="title ">
            <b>II. Phân loại học </b>
            <button className="plus">
              <IoMdAdd className="fs-4" />
            </button>
          </div>
          <div className="col-4">
            <Session2
              title="kingdom_id"
              name="Giới"
              Api="Kingdom"
              onChildSelectChange={handleChildSelectChange}
            />
          </div>
          <div className="col-4">
            <Session2
              title="phylum_id"
              name="Ngành"
              Api="Phylum"
              onChildSelectChange={handleChildSelectChange}
            />
          </div>
          <div className="col-4">
            <Session2
              title="class_id"
              name="Lớp"
              Api="Class"
              onChildSelectChange={handleChildSelectChange}
            />
          </div>
          <div className="col-4">
            <Session2
              title="order_id"
              name="Bộ"
              Api="Order"
              onChildSelectChange={handleChildSelectChange}
            />
          </div>
          <div className="col-4">
            <Session2
              title="family_id"
              name="Họ"
              Api="Family"
              onChildSelectChange={handleChildSelectChange}
            />
          </div>
          <div className="col-4">
            <Session2
              title="genus_id"
              name="Chi"
              Api="Genus"
              onChildSelectChange={handleChildSelectChange}
            />
          </div>
        </div>
        <Session3 />
        <span></span>
      </div>
      <button
        type="submit"
        className="btn btn-danger ps-5 pe-5 mt-4 mb-5 btn__submit"
      >
        Update
      </button>
    </form>
  );
}

export default UpdateLoai;
