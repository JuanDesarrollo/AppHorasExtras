import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import { IconButton, Paper, SvgIcon, TableCell, TableContainer } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import storage from '../storage/storage';
import { TableHrAll } from './TableHrAll';

export const DataTableComponentNivel2 = ({status, rowss, columns, nombreCard, corte_id, handleShowMNG }) => {

    const [selectInputT, setselectInputT] = useState([]);
    const rol = storage.get('rol');

    const options = {
        download: true,
        onDownload: (buildHead, buildBody, columns, data) => {
            handleShowMNG();
            return false; // Prevent default CSV download
        },
        customToolbarSelect: selectedRows => (
            <IconButton onClick={opcionDeleteEnciar}>
                <SvgIcon component={ListIcon} inheritViewBox />
            </IconButton>
        ),
        onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
            allRowsSelected.map(row => {
                let index = row.dataIndex;
                setselectInputT([]);

                allRowsSelected.forEach(row => {
                    let index = row.dataIndex;
                    if (rowss[index]) {
                        // Agrega los nuevos elementos al estado del arreglo
                        setselectInputT(prevSelectInputT => [...prevSelectInputT, rowss[index].id]);
                    }
                });
            });
        },
        filter: rowss != "" ? true : false,
        filterType: "dropdown",
        responsive: "standard",
        rowsPerPage: 10,
        expandableRows: rowss != "" ? true : false,
        renderExpandableRow: (rowData, rowMeta) => {
            const row = rowss[rowMeta.dataIndex]; // Obtener los datos específicos de la fila
            return (<TableHrAll status={status} area_id={row.id} corte_id={corte_id} />)
        },
        selectableRows: rol == 'creador' ? true : 'none',
        pagination: false, // Oculta el footer desactivando la paginación

    };

    return (
        <>
            <TableContainer component={Paper} >
                <MUIDataTable
                    title={nombreCard}
                    data={rowss}
                    columns={rowss != "" ? columns : []}
                    options={options}
                />
            </TableContainer>

        </>
    );
};