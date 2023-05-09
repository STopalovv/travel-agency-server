import React from "react";
import { NavLink } from "react-router-dom";
import '../App.css'

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Начало
          </NavLink>
        </li>
        <li>
          <NavLink to="/packs" activeClassName="active">
            Пакети
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" activeClassName="active">
            Новини
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;