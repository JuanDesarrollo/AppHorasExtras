import React from "react";
import {  NavLink, useLocation } from "react-router-dom";



export const Li = ({name='', path='', icon=''}) => {

  const loc = useLocation();

  return (
    <>
      <li className={ loc.pathname==path ? "pc-item active" : "pc-item "} >
        <NavLink  to={path} className="pc-link">
          <span className="pc-micon">
            <svg className="pc-icon">
              <use xlinkHref={icon}></use>
            </svg>
          </span>
          <span className="pc-mtext">{name}</span>
        </NavLink >
      </li>
    </>
  );
};
