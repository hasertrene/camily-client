import React from "react";

export default function day({ props }) {
  return (
    <span
      style={
        props.day.format("DD") === props.today
          ? {
              backgroundColor: "orange",
              borderRadius: "100%",
              margin: "-7%",
              padding: "7%",
            }
          : {}
      }>
      {day.format("DD")}
    </span>
  );
}
