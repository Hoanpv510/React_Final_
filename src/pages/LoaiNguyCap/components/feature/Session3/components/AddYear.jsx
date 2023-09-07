import { useState } from "react";

const SelectYear = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear); // Năm mặc định là năm hiện tại

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const years = Array.from(
    { length: currentYear - 1989 },
    (_, index) => currentYear - index
  );

  return (
    <div>
      <select
        value={selectedYear}
        onChange={handleChange}
        className="select-css"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectYear;
