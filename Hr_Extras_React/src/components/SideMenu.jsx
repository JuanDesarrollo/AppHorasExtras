import React, { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { SidebarContextMob } from "../context/SidebarContextMob";
import storage from "../storage/storage";
import { ItemSidder } from "../hooks/ItemSidder";
import { OpcionesMenu } from "../hooks/OpcionesMenu";
import { IconApp } from "./IconApp";
import { useNavigate } from "react-router-dom";
import { RequestLogout } from "../request/RequestLogout";

export const SideMenu = ({ show = true }) => {
  const rol = storage.get("rol");
  const { isSidebarVisible } = useContext(SidebarContext);
  const { isSidebarVisibleMob } = useContext(SidebarContextMob);
  const { toggleSidebar } = useContext(SidebarContext);
  const { opcionesHeader } = OpcionesMenu(rol);
  const go = useNavigate();
  const handleLogout = () => {
    RequestLogout(storage.clear, go);
  }

  const { ItemSider } = ItemSidder(opcionesHeader);
  return (
    <>
      {show ?
        <nav
          className={
            isSidebarVisibleMob == "desk"
              ? isSidebarVisible
                ? "pc-sidebar pc-trigger "
                : "pc-sidebar pc-trigger pc-sidebar-hide"
              : isSidebarVisible
                ? "pc-sidebar pc-trigger "
                : "pc-sidebar pc-trigger mob-sidebar-active"
          }
        >
          <div className="navbar-wrapper">
            <div className="m-header">
              <a href="" className="b-brand text-primary">
                <IconApp />
              </a>
            </div>
            <div
              className="navbar-content pc-trigger active simplebar-scrollable-y simplebar-scrollin-y"
              data-simplebar="init"
            >
              <div className="simplebar-wrapper">
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer"></div>
                </div>

                <div className="card pc-user-card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img
                          src="src/assets/images/user/avatar-1.jpg"
                          alt="user-image"
                          className="user-avtar wid-45 rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3 me-2">
                        <h6 className="mb-0">{storage.get('rol')}</h6>
                        <small>{storage.get('area')}</small>
                      </div>
                      <a
                        className="btn btn-icon btn-link-secondary avtar"
                        data-bs-toggle="collapse"
                        href="#pc_sidebar_userlink"
                      >
                        <svg className="pc-icon">
                          <i className="custom-sort-outline"></i>
                          <use xlinkHref="#custom-sort-outline"></use>
                        </svg>
                      </a>
                    </div>
                    <div
                      className="collapse pc-user-links"
                      id="pc_sidebar_userlink"
                    >
                      <div className="pt-3">
                        <a href="">
                          <i className="ti ti-user"></i>
                          <span>My Account</span>
                        </a>
                        <a href="#!">
                          <i className="ti ti-settings"></i>
                          <span>Settings</span>
                        </a>
                        <a href="#!">
                          <i className="ti ti-lock"></i>
                          <span>Lock Screen</span>
                        </a>
                        <a onClick={handleLogout}>
                          <i className="ti ti-power"></i>
                          <span>Logout</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>


                <ul className="pc-navbar">
                  {ItemSider()}

                  <li className="pc-item pc-caption">
                    <label>Authentication</label>
                  </li>
                  <li className="pc-item">
                    <a href="/login" className="pc-link">
                      <span className="pc-micon">
                        <svg className="pc-icon">
                          <use xlinkHref="#custom-shield"></use>
                        </svg>
                      </span>
                      <span className="pc-mtext">Login</span>
                    </a>
                  </li>
                  <li className="pc-item">
                    <a href="" className="pc-link" target="_blank">
                      <span className="pc-micon">
                        <svg className="pc-icon">
                          <use xlinkHref="#custom-password-check"></use>
                        </svg>{" "}
                      </span>
                      <span className="pc-mtext">Ajuste perfil</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {isSidebarVisibleMob == "mob" ? (
            isSidebarVisible ? (
              ""
            ) : (
              <div className="pc-menu-overlay" onClick={toggleSidebar}></div>
            )
          ) : (
            ""
          )}
        </nav>
        : ''}
    </>
  );
};
