import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

function AddIUCN() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get(
        "https://wlp.howizbiz.com/api/danhmuccha?ma_danh_mucs[]=REDBOOK&ma_danh_mucs[]=IUCN",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        // Chuyển đổi dữ liệu thành định dạng phù hợp với React-Select
        const filteredData = data.filter((item) => item.ma_danh_muc === "IUCN");

        const formattedOptions = filteredData[0].childs?.map((item) => ({
          value: `${item.ma_danh_muc} - ${item.ten}`,
          label: `${item.ma_danh_muc} - ${item.ten}`,
        }));

        setOptions(formattedOptions);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu từ API:", error);
      });
  }, [access_token]);
  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={(selected) => setSelectedOption(selected)}
        placeholder=""
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        menuPosition="relative"
      />
    </div>
  );
}

export default AddIUCN;
