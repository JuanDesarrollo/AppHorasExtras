import { TableCell, TableRow } from '@mui/material';
import React from 'react'
import DenseTable from './DenseTable';
import { useContext } from 'react';
import { RequestHorasPorEmpleado } from '../request/creador/RequestHorasPorEmpleado';
import { LoadingContext } from '../context/LoadingContext';
import { RefrescarContext2 } from '../context/RefrescarContext2';

export const ExpandableComponentCreadorJefe = ({ employeId, salario=0, valorHora=0 }) => {
    const { setLoading } = useContext(LoadingContext);
    const Refrescar2 = useContext(RefrescarContext2);


    const { rowsHr } = RequestHorasPorEmpleado(employeId, Refrescar2, setLoading);
    return (
        <>
            <TableRow>
                <TableCell colSpan={12}>
                    <DenseTable employeId={employeId} rowsHr={rowsHr} salario={salario} valorHora={valorHora}/>
                </TableCell>
            </TableRow>
        </>
    );

}
