import React, { useContext, useEffect } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import { SidebarContextMob } from '../context/SidebarContextMob'
import storage from '../storage/storage'
import { useNavigate } from 'react-router-dom'
import {RequestLogout} from '../request/RequestLogout'

export const Header = ({ show = true }) => {

    const { toggleSidebar } = useContext(SidebarContext)
    const { setSidebarVisibleMob } = useContext(SidebarContextMob);
    const go = useNavigate();

    const chanSider = (donde = '') => {
        toggleSidebar();
        setSidebarVisibleMob(donde);
    }

    useEffect(() => {
        chanSider
    },)

    const handleLogout = () => {
        RequestLogout(storage.clear,go);
    }

    return (
        <>
            {show ?
                <header className="pc-header">
                    <div className="header-wrapper">
                        <div className="me-auto pc-mob-drp">
                            <ul className="list-unstyled">
                                <li className="pc-h-item pc-sidebar-collapse">
                                    <a href="#" className="pc-head-link ms-0" onClick={() => chanSider('desk')}>
                                        <i className="ti ti-menu-2"></i>
                                    </a>
                                </li>
                                <li className="pc-h-item pc-sidebar-popup" >
                                    <a href="#" className="pc-head-link ms-0" id="mobile-collapse" onClick={() => chanSider('mob')}>
                                        <i className="ti ti-menu-2"></i>
                                    </a>
                                </li>
                                <li className="dropdown pc-h-item">
                                    <a
                                        className="pc-head-link dropdown-toggle arrow-none m-0 trig-drp-search"
                                        data-bs-toggle="dropdown"
                                        href="#"
                                        role="button"
                                        aria-haspopup="false"
                                        aria-expanded="false"
                                    >
                                        <svg className="pc-icon">
                                            <use xlinkHref="#custom-search-normal-1"></use>
                                        </svg>
                                    </a>
                                    <div className="dropdown-menu pc-h-dropdown drp-search">
                                        <form className="px-3 py-2">
                                            <input type="search" className="form-control border-0 shadow-none" placeholder="Search here. . ." />
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="ms-auto">
                            <ul className="list-unstyled">
                                <li className="dropdown pc-h-item">
                                    <a className="pc-head-link dropdown-toggle arrow-none me-0"
                                        data-bs-toggle="dropdown"
                                        href="#"
                                        role="button"
                                        aria-haspopup="false"
                                        aria-expanded="false">
                                        <svg className="pc-icon">
                                            <use xlinkHref="#custom-notification"></use>
                                        </svg>
                                        <span className="badge bg-success pc-h-badge">3</span>
                                    </a>
                                    <div className="dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown">
                                        <div className="dropdown-header d-flex align-items-center justify-content-between">
                                            <h5 className="m-0">Notifications</h5>
                                            <a href="#!" className="btn btn-link btn-sm">Mark all read</a>
                                        </div>
                                        <div className="dropdown-body text-wrap header-notification-scroll position-relative st1">
                                            <p className="text-span">Today</p>
                                            <div className="card mb-2">
                                                <div className="card-body">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0">
                                                            <svg className="pc-icon text-primary">
                                                                <use xlinkHref="#custom-layer"></use>
                                                            </svg>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <span className="float-end text-sm text-muted">2 min ago</span>
                                                            <h5 className="text-body mb-2">UI/UX Design</h5>
                                                            <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                                                type and scrambled it to make a type</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-2">
                                                <div className="card-body">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0">
                                                            <svg className="pc-icon text-primary">
                                                                <use xlinkHref="#custom-sms"></use>
                                                            </svg>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <span className="float-end text-sm text-muted">1 hour ago</span>
                                                            <h5 className="text-body mb-2">Message</h5>
                                                            <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-span">Yesterday</p>
                                            <div className="card mb-2">
                                                <div className="card-body">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0">
                                                            <svg className="pc-icon text-primary">
                                                                <use xlinkHref="#custom-document-text"></use>
                                                            </svg>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <span className="float-end text-sm text-muted">2 hour ago</span>
                                                            <h5 className="text-body mb-2">Forms</h5>
                                                            <p className="mb-0"
                                                            >Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                                                type and scrambled it to make a type</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-2">
                                                <div className="card-body">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0">
                                                            <svg className="pc-icon text-primary">
                                                                <use xlinkHref="#custom-user-bold"></use>
                                                            </svg>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <span className="float-end text-sm text-muted">12 hour ago</span>
                                                            <h5 className="text-body mb-2">Challenge invitation</h5>
                                                            <p className="mb-2"><span className="text-dark">Jonny aber</span> invites to join the challenge</p>
                                                            <button className="btn btn-sm btn-outline-secondary me-2">Decline</button>
                                                            <button className="btn btn-sm btn-primary">Accept</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-2">
                                                <div className="card-body">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0">
                                                            <svg className="pc-icon text-primary">
                                                                <use xlinkHref="#custom-security-safe"></use>
                                                            </svg>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <span className="float-end text-sm text-muted">5 hour ago</span>
                                                            <h5 className="text-body mb-2">Security</h5>
                                                            <p className="mb-0"
                                                            >Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                                                type and scrambled it to make a type</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center py-2">
                                            <a href="#!" className="link-danger">Clear all Notifications</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="dropdown pc-h-item header-user-profile">
                                    <a
                                        className="pc-head-link dropdown-toggle arrow-none me-0"
                                        data-bs-toggle="dropdown"
                                        href="#"
                                        role="button"
                                        aria-haspopup="false"
                                        data-bs-auto-close="outside"
                                        aria-expanded="false">
                                        <img src="src/assets/images/user/avatar-2.jpg" alt="user-image" className="user-avtar" />
                                    </a>
                                    <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                                        <div className="dropdown-header d-flex align-items-center justify-content-between">
                                            <h5 className="m-0">Profile</h5>
                                        </div>
                                        <div className="dropdown-body">
                                            <div className="profile-notification-scroll position-relative st1">
                                                <div className="d-flex mb-1">
                                                    <div className="flex-shrink-0">
                                                        <img src="src/assets/images/user/avatar-2.jpg" alt="user-image" className="user-avtar wid-35" />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h6 className="mb-1">{storage.get('name')}</h6>
                                                        <span>{storage.get('position')}</span>
                                                    </div>
                                                </div>
                                                <hr className="border-secondary border-opacity-50" />
                                                <div className="card">
                                                    <div className="card-body py-3">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <h5 className="mb-0 d-inline-flex align-items-center"
                                                            ><svg className="pc-icon text-muted me-2">
                                                                    <use xlinkHref="#custom-notification-outline"></use>
                                                                </svg>Recibir Notificaciones</h5>
                                                            <div className="form-check form-switch form-check-reverse m-0">
                                                                <input className="form-check-input f-18" type="checkbox" role="switch" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="border-secondary border-opacity-50" />
                                                <div className="d-grid mb-3">
                                                    <button className="btn btn-primary" onClick={handleLogout}>
                                                        <svg className="pc-icon me-2">
                                                            <use xlinkHref="#custom-logout-1-outline"></use>
                                                        </svg>Logout
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                : ''}
        </>
    )
}
