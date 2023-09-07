/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function Session2({ title, Api, name, onChildSelectChange, selectError }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const access_token = localStorage.getItem("access_token");

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    onChildSelectChange(title, selected.value); // Sử dụng hàm callback để truyền dữ liệu lên cha
  };

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    axios
      .get(`https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=${Api}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        // Lọc ra các mục có cả label và value không rỗng
        const filteredOptions = data.filter(
          (item) => item.ten !== "" && item.id !== ""
        );
        // Chuyển đổi dữ liệu thành định dạng phù hợp với React-Select
        const formattedOptions = filteredOptions.map((item) => ({
          value: item.id.slice(0, 1),
          label: `${item.ten_khoa_hoc} - ${item.ten} `,
        }));
        setOptions(formattedOptions.filter((item) => item.ten !== null));
      })

      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu từ API:", error);
      });
  }, [access_token, Api]);

  return (
    <div className="mb-3">
      <p className="m-0">
        {name}
        <span className="text-danger">*</span>
      </p>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder={name}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        styles={{ height: "300px" }}
        menuPosition="relative"
      />
      {selectError && (
        <p className="text-danger">Vui lòng chọn một lựa chọn.</p>
      )}
    </div>
  );
}

export default Session2;
