import React, { useContext, useState } from 'react'
import './Modal'
import { Modal, Button } from 'react-bootstrap';
import { DigitarHrModal } from './DigitarHrModal';
import { deleteEmployeExtrasHook } from '../request/creador/deleteEmployeExtrasHook';
import { DeleteEmployeeHrContext } from '../context/DeleteEmployeeHrContext';
import Swal from "sweetalert2"
import { SeendHourContext } from '../context/SeendHourContext';
import { SeendHours } from '../request/creador/SeendHours';
import storage from '../storage/storage';
import { useEnviarHr } from '../hooks/useEnviarHr';
import { useEnviarHrId } from '../hooks/useEnviarHrId';


export const TableAcordion = ({ Header = [], rows = [], CurrentCut = [] }) => {

    const rol = storage.get('rol');
    const [employeDespliegue, setEmployeDespliegue] = useState('');
    const { setEliminarHr, eliminarHr } = useContext(DeleteEmployeeHrContext);
    const [error, seterror] = useState(false);

    /* acciones modal hr extras */
    const [showHX, setShowHX] = useState(false);
    const handleCloseHX = () => setShowHX(false);
    const handleShowHX = () => setShowHX(true);
    /** acciones modal hr extras */

    const [expandedRow, setExpandedRow] = useState(null);
    const deleteItem = () => {
        // Lógica para eliminar un ítem
    };

    const editItem = () => {
        // Lógica para editar un ítem
    };

    const handleEnviarHr = (e) => {
        useEnviarHr();
    }

    const handleEnviarHr_ID = (e) => {
        const { errorr } = useEnviarHrId(e.target.id, error, seterror);
        if (errorr == false) {
            setEliminarHr(eliminarHr + 1);
        }
    }



    const handleQuitEmployeExtras = (e) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "Se eliminaran los registros",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEmployeExtrasHook(e.target.id, setEliminarHr, eliminarHr);
            }
        });
    }

    const { HorasConcepto, setHorasConcepto } = useContext(SeendHourContext);

    const handleSeendHours = (e) => {
        e.preventDefault();
        SeendHours(HorasConcepto, setHorasConcepto, employeDespliegue);
    }



    const toggleExpandRow = (index, event) => {
        setEmployeDespliegue(event.target.id);
        setExpandedRow(expandedRow === index ? null : index);
    };

    const [BarProgress, setBarProgress] = useState({ width: '55%' });
    return (
        <>

            {/*MODAL CREACION HR EXTRAS */}
            < Modal show={showHX} onHide={handleCloseHX} size='lg' backdrop="static" >
                <form onSubmit={handleSeendHours}>
                    <Modal.Header closeButton>

                        <Modal.Title>Diligenciación de horas extras</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <DigitarHrModal CurrentCut={CurrentCut} />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseHX}>
                            Cerrar
                        </Button>
                        <Button type='submit' variant="primary" >
                            Aplicar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal >

            {/*MODAL CREACION HR EXTRAS */}
            < div className="table-responsive" >
                <table id="colum-render" className="table table-hover">
                    <thead>
                        <tr>
                            {Header.map((item) => {
                                return (
                                    <th key={item} className="whitespace-nowrap rounded-tl-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                                        {item}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <React.Fragment key={row.id}>
                                <tr className="border-y border-transparent"  >
                                    <td className="whitespace-nowrap px-4 py-3 sm:px-5 pointer" id={row.id} onClick={(event) => toggleExpandRow(index, event)} >
                                        {row.nombre}
                                    </td>
                                    <td className="pointer whitespace-nowrap px-4 py-3 font-medium text-slate-700 dark:text-navy-100 sm:px-5" id={row.id} onClick={(event) => toggleExpandRow(index, event)}>
                                        {row.documento}
                                    </td>
                                    <td className="pointer whitespace-nowrap px-4 py-3 sm:px-5" id={row.id} onClick={(event) => toggleExpandRow(index, event)}>
                                        {row.cargo}
                                    </td>
                                    <td className="pointer whitespace-nowrap px-4 py-3 sm:px-5" id={row.id} onClick={(event) => toggleExpandRow(index, event)}>
                                        {row.horas}
                                    </td>
                                    <td className="pointer whitespace-nowrap px-4 py-3 sm:px-5" id={row.id} onClick={(event) => toggleExpandRow(index, event)}>
                                        {row.estado}
                                    </td>
                                    {storage.get("rol") == "creador" ?
                                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                            {rol == 'creador' ? <button id={row.id} onClick={handleQuitEmployeExtras} type="button" className="btn btn-light btn-sm">Eliminar</button> : ''}
                                            <button id={row.id} onClick={handleEnviarHr_ID} type="button" className="btn btn-light btn-sm">Enviar</button>
                                        </td>
                                        : " "}
                                </tr>
                                {expandedRow === index && (
                                    <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                                        <td colSpan="100" className="p-0">
                                            <div
                                                style={{
                                                    display:
                                                        expandedRow === index
                                                            ? "block"
                                                            : "none",
                                                }}
                                            >

                                                <div className='container-pc'>

                                                    <div className="is-scrollbar-hidden min-w-full overflow-x-auto">
                                                        {storage.get("rol") == "creador" ?
                                                            <>
                                                                <h5 className='titleHrDespliegue'>MODELAMIENTO DEL REPORTE DE TRABAJO SUPLEMENTARIO (Recargos y Extras)</h5>

                                                                <table className="table">
                                                                    <tbody>
                                                                    </tbody>
                                                                    <tbody><tr>
                                                                        <td>JORNADA DIARIA MÁXIMA (JDM)</td>
                                                                        <td><span className='spanDespliegueExt'>7,83</span> Horas / día</td>
                                                                        <td>Distinto de Seguridad</td>
                                                                    </tr>
                                                                        <tr>
                                                                            <td></td>
                                                                            <td><span className='spanDespliegueExt'>8.00</span> Horas / día</td>
                                                                            <td>Seguridad</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </>
                                                            :
                                                            <>
                                                                <h5 className='titleHrDespliegue'>DETALLE DE HORAS EXTRAS POR APROBAR</h5>
                                                                <div className='row'>

                                                                <div class="d-flex justify-content-end ">
                                                                    <div  className='btn_jefe_aprobar'>
                                                                        <button className='btn btn-outline-primary btn-sm iconAprobar'>Aprobar Todos</button>
                                                                        <button className='btn btn-outline-danger btn-sm'>Desaprobar Todos</button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <br />
                                                            </>

                                                        }
                                                        {storage.get('rol') == 'creador' ? <a href="" onClick={handleShowHX} className="btn btn-light añadirHr d-inline-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#modalHrExtras" ><i className="ti ti-plus f-18"></i>Añadir Extras</a> : ''}
                                                        {row.contenido}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    )
}
