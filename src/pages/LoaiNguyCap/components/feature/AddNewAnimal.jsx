import { IoMdAdd } from "react-icons/io";
import Session1 from "./Session1/Session1";
import Session2 from "./Session2/Session2";
import Session3 from "./Session3/Session3";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { number } from "prop-types";
import { toast } from "react-toastify";
function AddNewAnimal() {
  const [errAddNew, setErrAddNew] = useState([]);
  const [animalData, setAnimalData] = useState({
    genus_id: number,
    family_id: number,
    order_id: number,
    class_id: number,
    phylum_id: number,
    kingdom_id: number,
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

  const handleChildSelectChange = (field, value) => {
    setAnimalData({
      ...animalData,
      [field]: value,
    });
  };

  const updateAnimalData = (field, value) => {
    setAnimalData({
      ...animalData,
      [field]: value,
    });
  };

  const navigat = useNavigate();

  //
  const [selectErrors, setSelectErrors] = useState({
    kingdom_id: false,
    phylum_id: false,
    class_id: false,
    order_id: false,
    family_id: false,
    genus_id: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSelectErrors = {};

    // Kiểm tra các Select component
    if (!animalData.kingdom_id) {
      newSelectErrors.kingdom_id = true;
    }
    if (!animalData.phylum_id) {
      newSelectErrors.phylum_id = true;
    }
    if (!animalData.class_id) {
      newSelectErrors.class_id = true;
    }
    if (!animalData.order_id) {
      newSelectErrors.order_id = true;
    }
    if (!animalData.family_id) {
      newSelectErrors.family_id = true;
    }
    if (!animalData.genus_id) {
      newSelectErrors.genus_id = true;
    }

    // Nếu có lỗi validate, cập nhật trạng thái và không tiếp tục xử lý
    if (Object.values(newSelectErrors).some((error) => error)) {
      setSelectErrors(newSelectErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://wlp.howizbiz.com/api/species",
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
      toast.success("Thêm loài mới thành công !!!");
    } catch (error) {
      if (!error?.response) {
        console.error("No Server Response");
      } else if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else if (error.response?.status === 401) {
        console.error("Unauthorized");
      } else if (error.response?.status === 422) {
        setErrAddNew(error.response.data.errors);
      } else {
        console.error("Login Fail");
      }
    }
  };
  console.log(errAddNew);
  return (
    <>
      <form onSubmit={handleSubmit} className="container">
        <div className=" row container__addAnimal">
          <Session1
            updateData={updateAnimalData}
            errorFromParent={errAddNew.ten}
            errorTenKhoaHoc={errAddNew.ten_khoa_hoc}
          />
          <div className="row">
            <div className="title ">
              <b>II. Phân loại học </b>
              <button className="plus">
                <IoMdAdd className="fs-4" />
              </button>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Session2
                title="kingdom_id"
                name="Giới"
                Api="Kingdom"
                onChildSelectChange={handleChildSelectChange}
                selectError={errAddNew.kingdom_id}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Session2
                title="phylum_id"
                name="Ngành"
                Api="Phylum"
                onChildSelectChange={handleChildSelectChange}
                selectError={errAddNew.phylum_id}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Session2
                title="class_id"
                name="Lớp"
                Api="Class"
                onChildSelectChange={handleChildSelectChange}
                selectError={errAddNew.class_id}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Session2
                title="order_id"
                name="Bộ"
                Api="Order"
                onChildSelectChange={handleChildSelectChange}
                selectError={errAddNew.order_id}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Session2
                title="family_id"
                name="Họ"
                Api="Family"
                onChildSelectChange={handleChildSelectChange}
                selectError={errAddNew.family_id}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Session2
                title="genus_id"
                name="Chi"
                Api="Genus"
                onChildSelectChange={handleChildSelectChange}
                selectError={errAddNew.genus_id}
              />
            </div>
          </div>
          <Session3 />
          <span></span>
        </div>
        <div className="text-lg-end text-md-end text-sm-center">
          <button
            type="submit"
            className="btn btn-danger ps-5 pe-5 mt-4 mb-5 btn__submit"
          >
            Thêm
          </button>
        </div>
      </form>
    </>
  );
}

export default AddNewAnimal;
