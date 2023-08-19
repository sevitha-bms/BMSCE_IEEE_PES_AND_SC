import React, { useState } from "react";
import menuStyles from "../../Components_style/Database_css/MenuBar.module.css";

export default function MenuBar(props) {
  const [clickedItem, setClickedItem] = useState(0);
  props.onToggle(clickedItem);
  const handleItemClick = (index) => {
    setClickedItem(index);
  };

  return (
    <>
      <div className={menuStyles.menu}>
        <li
          className={clickedItem === 0 ? menuStyles.clicked : ""}
          onClick={() => handleItemClick(0)}
        >
          Events
        </li>
        <li
          className={clickedItem === 1 ? menuStyles.clicked : ""}
          onClick={() => handleItemClick(1)}
        >
          PES-Day (EV)
        </li>
        <li
          className={clickedItem === 2 ? menuStyles.clicked : ""}
          onClick={() => handleItemClick(2)}
        >
          Execom
        </li>
        <li
          className={clickedItem === 3 ? menuStyles.clicked : ""}
          onClick={() => handleItemClick(3)}
        >
          Images
        </li>
      </div>
    </>
  );
}
