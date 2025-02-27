import React from "react";

export default function Prayer({ name, time }) {
  return (
    <div className="prayar">
      <p className="name-prayar">{name}</p>
      <p className="time-prayar">{time}</p>
    </div>
  );
}
