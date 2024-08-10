import React from 'react'

export const Footer = ({ show = true }) => {
    return (
        <>{show ?
            <footer className="pc-footer">
                <div className="footer-wrapper container-fluid">
                    <div className="row">
                        <div className="col my-1">
                            <p className="m-0"
                            >Able Pro &#9829; crafted by Team <a href="https://themeforest.net/user/phoenixcoded" target="_blank">Phoenixcoded</a></p>
                        </div>
                        <div className="col-auto my-1">
                            <ul className="list-inline footer-link mb-0">
                                <li className="list-inline-item"><a >Juan Pablo G.V</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            : ''}
        </>
    )
}
