import React from 'react'
import { RequestHrXcorte } from '../request/nominaControlInterno/RequestHrXcorte'
import { TableCell, TableRow } from '@mui/material';
import DenseTable from './DenseTable';
import { useContext } from 'react';
import { RefrescarContext2 } from '../context/RefrescarContext2';

export const TableHrAll = ({ area_id, corte_id, status }) => {
  const Refrescar2 = useContext(RefrescarContext2)
  const { datos } = RequestHrXcorte(area_id, corte_id, Refrescar2);
  return (
    datos.map(element => {
      return (
        <>
          <TableRow>
            <TableCell colSpan={6}>
              <DenseTable  status={status} salario={element.empleado.salary} valorHora={element.empleado.valorHora} rowsHr={element.employee_extras} header={element.empleado} area_id={area_id} corte_id={corte_id} />
            </TableCell>
          </TableRow>
        </>
      )
    })
  )
}
