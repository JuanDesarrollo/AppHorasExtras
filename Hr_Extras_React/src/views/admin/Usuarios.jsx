import React from 'react'
import { DataTableComponent } from '../../components/DataTableComponent';
import { RequestGetUser } from '../../request/admin/RequestGetUser';

export const Usuarios = () => {
    const { columns, datos } = RequestGetUser();

    return (
        <div className="pc-container">
            <div className="pc-content">
                <div className="row">
                    <div className="col-12">
                        <DataTableComponent despliegue={false}  rowss={datos} columns={columns} nombreCard='Empleados'  seleccion={false}/>
                    </div>
                </div>
            </div>
        </div>

    )
}
