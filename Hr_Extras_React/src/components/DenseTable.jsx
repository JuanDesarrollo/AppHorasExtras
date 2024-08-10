import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import storage from '../storage/storage';
import { ModalHrEx } from './ModalHrEx';
import { useContext } from 'react';
import { SeendHourContext } from '../context/SeendHourContext';
import { SeendHours } from '../request/creador/SeendHours';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, SvgIcon } from '@mui/material';
import { RequestDeleteHr } from '../request/creador/RequestDeleteHr';
import TooltipCell from './TooltipCell';
import Swal from 'sweetalert2';
import { RequestModificarJustificacion } from '../request/creador/RequestModificarJustificacion';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { RequestAprobarHr } from '../request/jefe/RequestAprobarHr';
import MessageIcon from '@mui/icons-material/Message';
import { TableFooter } from '@mui/material';
import { TotalHorasSum } from '../hooks/TotalHorasSum';
import { ModalArchivoMNG } from './ModalArchivoMNG';
import ExcelExportWithWebWorker from './ExcelExportWithWebWorker';
import { ShowMNGmodalContext } from '../context/ShowMNGmodalContext';
import { useEffect } from 'react';
import { HorasPorcentajesContext } from '../context/HorasPorcentajesContext';
import { CalcularValorHR } from '../hooks/CalcularValorHR';
import { useLocation } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ModalProgramacionesEmpleado } from './ModalProgramacionesEmpleado';
import { TableProgramaciones } from './TableProgramaciones';
import { useState } from 'react';
import { sendRequest } from '../hooks/functions';
import { RefrescarContext2 } from '../context/RefrescarContext2';
export default function DenseTable({ status = "", employeId = "", rowsHr = [], header = [], area_id = '', corte_id = '', salario = 0, valorHora = 0 }) {

    const { Refrescar2, setRefrescar2 } = useContext(RefrescarContext2);

    const { horasPorcentaje } = useContext(HorasPorcentajesContext);
    const rol = storage.get('rol');
    /* acciones modal hr extras */
    const [showHX, setShowHX] = React.useState(false);
    const handleCloseHX = () => setShowHX(false);
    const handleShowHX = () => setShowHX(true);
    let location = useLocation();


    const [showPr, setShowPr] = React.useState(false);
    const handleClosePr = () => setShowPr(false);
    const handleShowPr = () => setShowPr(true);


    const { handleShowMNG, rowsMNG, setparametros, funcionesModalMNG } = useContext(ShowMNGmodalContext)

    useEffect(() => {
        setparametros({ "id_area": area_id, "id_corte": corte_id })
    }, [area_id, corte_id])


    /** acciones modal hr extras */


    const { HorasConcepto, setHorasConcepto } = useContext(SeendHourContext);


    const handleSeendHours = (e) => {
        e.preventDefault();
        SeendHours(HorasConcepto, setHorasConcepto, employeId, Refrescar2, setRefrescar2);
    }

    const funcionesModalHr = {
        handleCloseHX,
        handleSeendHours,
        handleCloseHX,
        showHX
    }

    const funcionesModalPr = {
        handleClosePr,
        showPr
    }

    const handleElimianarHr = (id) => {
        Swal.fire({
            title: "Eliminar",
            text: "Este registro no se podrá recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                RequestDeleteHr(id, Refrescar2, setRefrescar2);
            }
        });
    }

    const actualizarJust = (id, text) => {
        RequestModificarJustificacion(id, text, Refrescar2, setRefrescar2);
    }


    const handleEdit = (id, justificacion) => {
        Swal.fire({
            input: "textarea",
            inputLabel: "Modificar observación",
            inputPlaceholder: "Escriba aqui la nueva observación...",
            inputAttributes: {
                "aria-label": "Type your message here"
            },
            inputValue: justificacion,  // Aquí estableces el valor por defecto
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                const text = result.value;
                if (text) {
                    actualizarJust(id, text);
                }
            }
        });
    }


    const handleShowDesaprobaciones = (desaprobacion) => {
        Swal.fire({
            title: "Motivo de desaprobación",
            text: desaprobacion
        });
    }

    const handleShowJustificacion = (justificacion) => {
        Swal.fire({
            title: "Labor desempeñada",
            text: justificacion
        });
    }

    const handleAprobar = (id, accion, detail_id = "") => {
        if (accion == 'ap_jefe' || accion == 'ap_control_interno') {
            Swal.fire({
                title: accion == "Aprobar horas",
                text: "Estas horas se enviaran a nomina",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, enviar"
            }).then((result) => {
                if (result.isConfirmed) {
                    RequestAprobarHr(id, accion, "", "", Refrescar2, setRefrescar2);
                }
            });
        } else {
            Swal.fire({
                input: "textarea",
                inputLabel: "Desaprobar hora extras",
                inputPlaceholder: "Escriba aqui el motivo de la desaprobacion",
                inputAttributes: {
                    "aria-label": "Type your message here"
                },
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    const text = result.value;
                    if (text) {
                        RequestAprobarHr(id, accion, text, detail_id, Refrescar2, setRefrescar2);
                    }
                }
            });
        }
    }

    const handleRolTipoDesaprobacion = () => {
        if (rol == 'jefe') {

            return "dp_jefe";
        } else if (rol == 'nomina') {
            return "dp_nomina";
        }
        else {
            return "dp_control_interno";
        }
    }

    const handleRolTipoAprobacion = () => {
        if (rol == 'jefe') {
            return "ap_jefe";
        } else if (rol == 'nomina') {
            return "ap_nomina";
        }
        else if ("controlInterno") {
            return "ap_control_interno";
        }
    }

    const handleInforEmpleado = () => {
        if (rol == 'jefe' || rol == 'creador') {
            if (location.pathname == '/InformeHorasExtras') {
                return true;
            } else {
                return false;
            }
        } else if (rol == 'nomina') {
            return true;
        }

        else {
            return true;
        }
    }

    const handleNotCreador = () => {
        if (rol == 'creador') {
            return false;
        }
        else {
            return true;
        }
    }

    const [ProgramcionData, setProgramcionData] = useState([]);

    const handleShowProgramacion = async (empleado, corte) => {
        const parametros = { "empleado_id": empleado, "corte_id": corte };
        const res = await sendRequest("post", parametros, "api/ProgramacionEmpleado", "", true, false);

        if (res.error == false) {
            if (res.data == 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Sin programciones",
                    text: "No se encontro programaciones para este personal",
                });
            } else {
                setProgramcionData(res.data);
                // return { datos_programacion }
                handleShowPr();

            }
        }

    }


    const { totals } = TotalHorasSum(rowsHr);

    return (
        <>

            <ModalHrEx data={funcionesModalHr} />
            <ModalArchivoMNG data={funcionesModalMNG} body={<ExcelExportWithWebWorker rowsMNG={rowsMNG} />} />
            <ModalProgramacionesEmpleado data={funcionesModalPr} body={<TableProgramaciones datos={ProgramcionData} />} />

            {/*rol == 'nomina' && <button className='btn btn-secondary btn-sm separacion_bottom' onClick={handleShowMNG}>General archivo Excel MNG de toda el area</button>*/}
            {rol == 'controlInterno' && <button className='btn btn-secondary btn-sm separacion_bottom' onClick={handleShowMNG}>General PDF</button>}

            <TableContainer component={Paper}>
                {rol == 'creador' && location.pathname != "/InformeHorasExtras" ? <a href="" onClick={handleShowHX} className="btn btn-light añadirHr d-inline-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#modalHrExtras" ><i className="ti ti-plus f-18"></i>Añadir Extras</a> : ''}
                {handleInforEmpleado() && <>
                    <div className='text-center'>
                        <p className="text-dark">Empleado: <span className="text-muted">{header.nombre}</span>  {rol != "creador" && <>- <span className="text-muted">{header.documento}</span></>}</p>
                        <p className="text-dark">Cargo: <span className="text-muted">{header.cargo}</span></p>
                        {rol != "creador" && <p className="text-dark">Salario: <span className="text-muted">{parseFloat(header.salary).toLocaleString()}</span></p>}
                        {rol == "creador" && <p className="text-dark">Documento: <span className="text-muted">{parseFloat(header.documento).toLocaleString()}</span></p>}

                    </div>
                </>}
                {rowsHr != "" ? <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rango fechas</TableCell>
                            <TableCell>Rango horas</TableCell>
                            <TableCell>Hed</TableCell>
                            <TableCell>Hen</TableCell>
                            <TableCell>Hedd</TableCell>
                            <TableCell>Hedn</TableCell>
                            <TableCell>Rdd</TableCell>
                            <TableCell>Rdn</TableCell>
                            <TableCell>Rn</TableCell>
                            <TableCell>Justificación</TableCell>
                            {handleNotCreador() && <TableCell>Valor</TableCell>}
                            {location.pathname != "/InformeHorasExtras" && <TableCell>Accion</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsHr.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.date_i} a {row.date_f}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.time_i} a {row.time_f}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.hed}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.hen}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.hedd}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.hedn}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.rdd}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.rdn}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.rn}
                                </TableCell>
                                <TableCell onClick={() => handleShowJustificacion(row.justification)} component="th" scope="row">
                                    <TooltipCell text={row.justification} />
                                </TableCell>

                                {handleNotCreador() &&
                                    <TableCell component="th" scope="row">
                                        {CalcularValorHR(row.hed, row.hen, row.hedd, row.hedn, row.rdd, row.rdn, row.rn, salario, valorHora, horasPorcentaje)}
                                    </TableCell>
                                }
                                {rol == 'creador' ?
                                    row.status == 'creador' || row.status == 'dp_jefe' || row.status == 'dp_nomina' || row.status == 'dp_control_interno' ?
                                        <TableCell className='separacion' component="th" scope="row">

                                            <IconButton title='Editar justificación' onClick={() => handleEdit(row.id, row.justification)}>
                                                <SvgIcon className='clic ' component={EditIcon} inheritViewBox />
                                            </IconButton>
                                            {row.desaprobacion != "" && <IconButton title='Ver motivo de desaprobación' onClick={() => handleShowDesaprobaciones(row.desaprobacion)}>
                                                <SvgIcon className='clic' component={MessageIcon} inheritViewBox />
                                            </IconButton>}
                                            <IconButton title='Eliminar hora extra' onClick={() => handleElimianarHr(row.id)}>
                                                <SvgIcon className='clic' component={DeleteIcon} inheritViewBox />
                                            </IconButton>
                                        </TableCell>

                                        : location.pathname != "/InformeHorasExtras" && <TableCell component="th" scope="row">
                                            Enviado
                                        </TableCell>
                                    : location.pathname != "/InformeHorasExtras" &&
                                    <TableCell className='separacion' component="th" scope="row">
                                        {(rol == 'jefe' || rol == 'controlInterno') && <IconButton style={status == "cerrado" ? { "pointer-events": "none" } : {}} title='Aprobar hora extras' onClick={() => handleAprobar(row.id, handleRolTipoAprobacion())}>
                                            <SvgIcon className='clic' component={ThumbUpIcon} inheritViewBox />
                                        </IconButton>
                                        }
                                        <IconButton style={status == "cerrado" ? { "pointer-events": "none" } : {}} title='Desaprobar hora extras' onClick={() => handleAprobar(row.id, handleRolTipoDesaprobacion(), row.id_detail)}>
                                            <SvgIcon className='clic' component={ThumbDownAltIcon} inheritViewBox />
                                        </IconButton>
                                        {rol != 'jefe' && <IconButton style={status == "cerrado" ? { "pointer-events": "none" } : {}} title='Programaciones' onClick={() => handleShowProgramacion(header.id, corte_id)}>
                                            <SvgIcon className='clic' component={MenuBookIcon} inheritViewBox />
                                        </IconButton>
                                        }
                                        {row.desaprobacion != "" && rol == 'jefe' &&
                                            <IconButton title='Ver motivo de desaprobación' onClick={() => handleShowDesaprobaciones(row.desaprobacion)}>
                                                <SvgIcon className='clic' component={MessageIcon} inheritViewBox />
                                            </IconButton>}
                                    </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell className='separacion text-center' colSpan={2} component="th" scope="row">
                                TOTAL
                            </TableCell>
                            <TableCell className='separacion' component="th" scope="row">
                                {totals.hed}
                            </TableCell>
                            <TableCell className='separacion' component="th" scope="row">
                                {totals.hen}
                            </TableCell>
                            <TableCell className='separacion' component="th" scope="row">
                                {totals.hedd}
                            </TableCell>
                            <TableCell className='separacion' component="th" scope="row">
                                {totals.hedn}
                            </TableCell>
                            <TableCell className='separacion' component="th" scope="row">
                                {totals.rdd}
                            </TableCell>
                            <TableCell className='separacion' component="th" scope="row">
                                {totals.rdn}
                            </TableCell>
                            <TableCell className='separacion' component="th" scope="row">
                                {totals.rn}
                            </TableCell>
                            <TableCell className='separacion text-primary text-center' component="th" scope="row">
                                {parseFloat(totals.total).toFixed(2)}
                            </TableCell>
                            <TableCell className='separacion text-primary text-center' component="th" scope="row">
                                {rol != "creador" && CalcularValorHR(totals.hed, totals.hen, totals.hedd, totals.hedn, totals.rdd, totals.rdn, totals.rn, salario, valorHora, horasPorcentaje)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                    : <h1 className='text-center'>Sin horas extras reportadas</h1>
                }
            </TableContainer>

        </>

    );
}

