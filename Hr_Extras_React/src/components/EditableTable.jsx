import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import { TableContainer } from '@mui/material';
import { Paper } from '@mui/material';
import storage from '../storage/storage';
import { RequestDeleteTemp_employee } from '../request/creador/RequestDeleteTemp_employee';
import { useContext } from 'react';
import { RequestUpdateEstadoProgramacion } from '../request/jefe/RequestUpdateEstadoProgramacion';
import { RefrescarContext } from '../context/RefrescarContext';
import { FilasTablaEditable } from '../hooks/FilasTablaEditable';


const EditableTable = ({ nameTable = "", porcentajes = [], count = 0, setcount = "" }) => {
    //const porcentajes = storage.get('PorcentajesHoras');
    let location = useLocation();
    const rol = storage.get("rol");
    const [data, setData] = useState([]);
    const { Refrescar1, setRefrescar1 } = useContext(RefrescarContext);


    const handleEliminarProgramcion = (e) => {
        RequestDeleteTemp_employee(e.target.id, setRefrescar1, Refrescar1);
    }


    const handleShowLabor = (word) => {
        Swal.fire({
            title: "Trabajo realizado",
            text: word
        });
    }


    const UpdateEstadoProgramacion = (estado, id) => {
        RequestUpdateEstadoProgramacion(estado, id, Refrescar1, setRefrescar1);
    }



    const { hableColums } = FilasTablaEditable(rol, location, handleEliminarProgramcion, handleShowLabor, 
        UpdateEstadoProgramacion, porcentajes, Refrescar1, setRefrescar1,count,  setcount, data, setData);

    const columns = hableColums();
    //    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',

    return (
        <TableContainer component={Paper} >
            <MUIDataTable
                title={nameTable}
                data={data}
                columns={columns}
                options={{
                    selectableRows: 'none',
                }}
            />
        </TableContainer>
    );
};

export default EditableTable;
