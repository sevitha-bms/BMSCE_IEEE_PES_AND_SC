import React, { useState } from "react";
import "../../Components_style/Database_css/YearDropdown.css";

export default function DropdownMenu({ year, onYearChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2023");
  const years = ["2023", "2022", "2021", "2020", "2019"];
  const handleYearSelect = (selectedYear) => {
    onYearChange(selectedYear);
    setSelectedYear(selectedYear);
    setIsDropdownOpen(false);
  };

  const handleDropdownHover = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="x-dropdown-wrapper"
      onMouseEnter={handleDropdownHover}
      onMouseLeave={handleDropdownLeave}
    >
      <div className="x-dropdown-title">Year: {selectedYear}</div>
      {isDropdownOpen && (
        <ul className="x-dropdown">
          {years.map((year) => (
            <li key={year} onClick={() => handleYearSelect(year)}>
              <span>{year}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
