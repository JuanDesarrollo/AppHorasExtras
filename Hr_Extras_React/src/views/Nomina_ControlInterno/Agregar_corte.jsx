import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { RequestAddCorte } from '../../request/nominaControlInterno/RequestAddCorte';

export const Agregar_corte = () => {

    const Body = () => {
        const HandleAgregar = (e) => {
            e.preventDefault();
            RequestAddCorte(formData);
        }
        const [formData, setformData] = useState({
            name: "",
            date_i: "",
            date_f: "",
            status: "abierto"
        });

        const SaveCorte = (e) => {
            setformData({ ...formData, name: e.target.value })
        }
        return (
            <>
                <div className="card-body">
                    <form onSubmit={HandleAgregar} className="row row-cols-md-auto g-3 align-items-center">
                        <div className="col-12">
                            <input
                                onChange={SaveCorte}
                                required
                                type="text"
                                className="form-control"
                                id="inlineFormInputName"
                                placeholder="Nombre del name"
                                value={formData.name}
                            />
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <div className="input-group-text">fecha de inicio</div>
                                <input
                                    required
                                    onChange={(e) => setformData({ ...formData, date_i: e.target.value })}
                                    value={formData.date_i}
                                    type="date"
                                    className="form-control"
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <div className="input-group-text">fecha de finalización</div>
                                <input
                                    onChange={(e) => setformData({ ...formData, date_f: e.target.value })}
                                    value={formData.date_f}
                                    required
                                    type="date"
                                    className="form-control"
                                    id="inlineFormInputGroupUsername"
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Agregar name
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    };

    return (

        <>
            <div className="pc-container">
                <div className="pc-content">
                    <div className="row">
                        <div className="col-12">
                            <div class="row align-items-center">
                                <div class="col-md-12">
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            <NavLink to="/Cortes" >Listado de name</NavLink>
                                        </li>
                                        <li class="breadcrumb-item" aria-current="page">
                                            <NavLink to="/Agregar_corte" >Agregar nuevo corte</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="page-header-title">
                                    <h2 className="mb-0">Agregar nuevo corte</h2>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Agregar</h5>
                                        </div>
                                        <Body />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
