import React from "react";
import moment from "moment";

export default function DateFormatter({ doc }) {
  const dateStr = doc;
  const date = moment(dateStr, "DD-MM-YYYY");
  const day = date.format("Do");
  const month = date.format("MMMM");

  const formattedDate = `${day} ${month}`;

  const style = {
    fontFamily: "Open Sans, sans-serif",
  };

  return <span style={style}>{formattedDate}</span>;
}
