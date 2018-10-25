import React from "react";

export default function GroupList({ listStatus }) {
  return (
    <ul>
      {listStatus.listElements.map(el => (
        <li key={el.key} id={el.key}>
          {el.val}
        </li>
      ))}
      ;
    </ul>
  );
}
