import React, { useContext, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { IconButton, Paper, SvgIcon, TableContainer } from "@mui/material";
import { deleteEmployeExtrasHook } from '../request/creador/deleteEmployeExtrasHook';
import Swal from 'sweetalert2';
import ListIcon from '@mui/icons-material/List';
import { useEnviarHr } from '../hooks/useEnviarHr';
import storage from '../storage/storage';
import { ExpandableComponentCreadorJefe } from './ExpandableComponentCreadorJefe';
import { ExpandableComponentNomina } from './ExpandableComponentNomina'
import { useLocation } from 'react-router-dom';
import { TableHrAll } from './TableHrAll';
import { RefrescarContext } from '../context/RefrescarContext';

export const DataTableComponent = ({ rowss, columns, nombreCard, handleShowHX, setdaUserID, despliegue = true, seleccion = false }) => {

    const [selectInputT, setselectInputT] = useState([]);
    const [inputT_copiar, selectInputT_copiar] = useState([]);

    const { Refrescar1, setRefrescar1 } = useContext(RefrescarContext);

    const rol = storage.get('rol');

    const opcionDeleteEnciar = () => {
        Swal.fire({
            title: "Seleccione la acción",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Enviar a jefe",
            denyButtonText: `Eliminar`,
            cancelButtonText: 'Copiar horas',
            showCloseButton: true

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                useEnviarHr(selectInputT, setRefrescar1, Refrescar1);
            } else if (result.isDenied) {
                Swal.fire({
                    title: "Estas seguro",
                    text: "Se eliminaran todos los registro asociados",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteEmployeExtrasHook(selectInputT, setRefrescar1, Refrescar1);
                    }
                });
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                //  RequestCopiarHr(selectInputT);
                storage.set("id_employe_copiado", inputT_copiar);
                handleShowHX();

            }
        });
    }
    let location = useLocation();

    const handleRotornarViews = (row) => {
        console.log("location " + location.pathname);
        if ((rol == "creador" || rol == 'jefe') && location.pathname != "/InformeHorasExtras") {

            return <ExpandableComponentCreadorJefe employeId={row.id} salario={row.salario} valorHora={row.valorHora} />
        }
        else if (rol == "nomina" || rol == 'controlInterno') {
            return <ExpandableComponentNomina id={row.id} status={row.status} />
        }
        else if (location.pathname == "/InformeHorasExtras") {
            return <TableHrAll status="abierto" area_id={storage.get('area_id')} corte_id={row.id} />
        }

    }

    const options = {
        download: rowss != "" ? true : false,
        onDownload: (buildHead, buildBody, columns, data) => {
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
                selectInputT_copiar([]);
               rol=='admin' && setdaUserID([]);
                allRowsSelected.forEach(row => {
                    let index = row.dataIndex;
                    if (rowss[index]) {
                        // Agrega los nuevos elementos al estado del arreglo
                        setselectInputT(prevSelectInputT => [...prevSelectInputT, rowss[index].id]);
                        rol=='admin' &&   setdaUserID(prevSelectInputT => [...prevSelectInputT, rowss[index].id]);
                        selectInputT_copiar(prevSelectInputT => [...prevSelectInputT, rowss[index].employee_id]);

                    }
                });
            });
        },
        filter: rowss != "" ? true : false,
        filterType: "dropdown",
        responsive: "standard",
        rowsPerPage: 10,
        expandableRows: (rowss != "" && despliegue == true) ? true : false,
        renderExpandableRow: (rowData, rowMeta) => {
            const row = rowss[rowMeta.dataIndex]; // Obtener los datos específicos de la fila
            return handleRotornarViews(row);
        },
        selectableRows: seleccion ? true : 'none',
        page: 1,

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