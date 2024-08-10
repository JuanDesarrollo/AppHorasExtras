import { TableCell, TableRow } from '@mui/material';
import React from 'react'
import { RequestAreasNominaControl } from '../request/nominaControlInterno/RequestAreasNominaControl'
import { DataTableComponentNivel2 } from './DataTableComponentNivel2';
import { useContext } from 'react';
import { ShowMNGmodalContext } from '../context/ShowMNGmodalContext';
import { useEffect } from 'react';
import { ModalArchivoMNG } from './ModalArchivoMNG';
import ExcelExportWithWebWorkers from './ExcelExportWithWebWorker';

export const ExpandableComponentNomina = ({ id , status}) => {
  const { rows, columnss } = RequestAreasNominaControl(id);
  const { handleShowMNG, rowsMNG, setparametros, funcionesModalMNG } = useContext(ShowMNGmodalContext);

  useEffect(() => {
    setparametros({ 'id_corte': id });
  }, [id])

  return (
    <>
      <ModalArchivoMNG data={funcionesModalMNG} body={<ExcelExportWithWebWorkers rowsMNG={rowsMNG} />} />
      <TableRow>
        <TableCell colSpan={6}>
          <DataTableComponentNivel2 status={status} rowss={rows} columns={columnss} handleShowMNG={handleShowMNG}
            nombreCard='Listado de areas que han reportado horas extras' corte_id={id} />
        </TableCell>
      </TableRow>
    </>
  );
}
