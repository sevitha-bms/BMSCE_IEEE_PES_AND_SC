import React, { useState } from "react";
import databaseStyles from "../../Components_style/Database_css/UpdateDatabase.module.css";
export default function Button(props) {
  const [clickedItem, setClickedItem] = useState(null);
  const handleClickedItem = (index) => {
    setClickedItem(index);
    setTimeout(() => {
      setClickedItem(null);
    }, 500);
    props.onToggle(index);
  };
  return (
    <>
      <div className={databaseStyles.default}>
        <div className={clickedItem === 0 ? databaseStyles.clicked : ""}>
          <button type="button" onClick={() => handleClickedItem(0)}>
            Insert
          </button>
        </div>
        <div className={clickedItem === 1 ? databaseStyles.clicked : ""}>
          <button type="button" onClick={() => handleClickedItem(1)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
