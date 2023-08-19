import React, { useState } from "react";
import "../../Components_style/Database_css/PosterTypeDropdown.css";

export default function DropdownMenu({ poster, onPosterChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState("Timeline");

  const posters = ["Timeline", "Images"];

  const handlePosterSelect = (selectedPoster) => {
    onPosterChange(selectedPoster);
    setSelectedPoster(selectedPoster);
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
      className="dropdown-wrapper-poster"
      onMouseEnter={handleDropdownHover}
      onMouseLeave={handleDropdownLeave}
    >
      <div className="dropdown-title-poster">Poster Type: {selectedPoster}</div>
      {isDropdownOpen && (
        <ul className="dropdown-poster">
          {posters.map((poster) => (
            <li key={poster} onClick={() => handlePosterSelect(poster)}>
              <span>{poster}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
