import React from 'react'
import EditableTable from '../../components/EditableTable';
import { RequestCortes } from '../../request/RequestCortes';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Cortes = () => {

    const [count, setcount] = useState(0);
    const { datos } = RequestCortes(count);


    return (
        <>
            <div className="pc-container">
                <div className="pc-content">
                    <div className="row">
                        <div className="col-12">
                            <div class="col-md-12">
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <NavLink to="/Cortes" >Listado de corte</NavLink>
                                    </li>
                                    <li class="breadcrumb-item" aria-current="page">
                                        <NavLink to="/Agregar_corte" >Agregar nuevo corte</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <EditableTable nameTable='Gestión de cortes' porcentajes={datos} count={count} setcount={setcount} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
