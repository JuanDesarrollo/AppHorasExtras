import React, { useContext, useState } from 'react'
import { SimpleTable } from './SimpleTable';
import '../App.css';
import { CalcularExtras } from '../hooks/CalcularExtras';
import { SeendHourContext } from '../context/SeendHourContext';
import storage from '../storage/storage';
import { CurrentCutContext } from '../context/CurrentCutContext';
// table-sm para poner en table table-striped si queremos las filas menos altas
import { DateTime } from 'luxon';
import { BodyHr } from './BodyHr';

export const DigitarHrModal = () => {

    const { corteActual } = useContext(CurrentCutContext)
    const { HorasConcepto, setHorasConcepto } = useContext(SeendHourContext);
    const [inputHrDom, setinputHrDom] = useState(false);
    const [InputHorasTrabajadas, setInputHorasTrabajadas] = useState(0);
    const porcent = storage.get('PorcentajesHoras');
    const [maxCarateres, setMaxCarateres] = useState(1000);
    const [esRecargo, setEsRecargo] = useState(false);
    // Importar Luxon
    const [maxDiaF, setmaxDiaF] = useState("");
    const [fechasDiferentes, setfechasDiferentes] = useState(false);

    const handlefechaI = (e) => {
        const nuevaFechaI = e.target.value;
        setHorasConcepto(prevEstado => ({
            ...prevEstado,
            fechas: {
                ...prevEstado.fechas,
                fechaI: nuevaFechaI
            }
        }));

        const dateTime = DateTime.fromISO(nuevaFechaI);
        const nextDay = dateTime.plus({ days: 1 });
        setmaxDiaF(nextDay.toISODate());

        //  if (HorasConcepto.fechas.fechaF == "") {
        setHorasConcepto(prevEstado => ({
            ...prevEstado,
            fechas: {
                ...prevEstado.fechas,
                fechaF: nuevaFechaI
            }
        }))
    }
    const handlefechaF = (e) => {
        const nuevaFechaF = e.target.value;
        setHorasConcepto(prevEstado => ({
            ...prevEstado,
            fechas: {
                ...prevEstado.fechas,
                fechaF: nuevaFechaF
            }
        }));
        if (nuevaFechaF === HorasConcepto.fechas.fechaI) {
            setfechasDiferentes(false);
        } else {
            setfechasDiferentes(true);
        }
    }
    const handlehoraI = (e) => {
        const nuevaHoraI = e.target.value;
        setHorasConcepto(prevEstado => ({
            ...prevEstado,
            horas: {
                ...prevEstado.horas,
                horaI: nuevaHoraI
            }
        }))
    }
    const handlehoraF = (e) => {
        const nuevaHoraF = e.target.value;
        setHorasConcepto(prevEstado => ({
            ...prevEstado,
            horas: {
                ...prevEstado.horas,
                horaF: nuevaHoraF
            }
        }))
    }

    const handleJustificacion = (e) => {
        const nuevaJust = e.target.value;
        if (nuevaJust.length <= 1000) {
            setMaxCarateres(1000 - nuevaJust.length);
        }
        setHorasConcepto(prevEstado => ({
            ...prevEstado,
            concepto: {
                ...prevEstado.concepto,
                justificacion: nuevaJust
            }
        }))
    }

    const handleInputHorasTrabajadas = (e) => {
        setInputHorasTrabajadas(e.target.value);
    }

    const handleInputHrDom = (e) => {
        setinputHrDom(!inputHrDom);
    }

    const { HorasConcepto_rec, tipoDia } = CalcularExtras(HorasConcepto, setHorasConcepto, inputHrDom, InputHorasTrabajadas, esRecargo);

    console.log("fechasDiferentes " + fechasDiferentes);
    const { bodyHr, headerHr, tFooter } = BodyHr(HorasConcepto_rec, porcent, fechasDiferentes);

    const timeThreshold = DateTime.fromObject({ hour: 20, minute: 59 });
    const currentTime = DateTime.fromISO(HorasConcepto.horas.horaI);


    const handleEsRecargo = () => {
        setEsRecargo(!esRecargo);
    }

    return (

        <>
            <div className="container">
                <div className="row">
                    {tipoDia.TipoFecha.FechaI_Tipo == 'Domingo' || tipoDia.TipoFecha.FechaI_Tipo == 'Festivo' ?
                        <div className='row'>
                            <div className="form-check form-switch esHoraExras col" >
                                <input className="form-check-input esHoraExrasInput" type="checkbox" id="flexSwitchCheckChecked" onClick={handleInputHrDom} />
                                <label className="form-check-label " htmlFor="flexSwitchCheckChecked">Horas Extra ?</label>
                            </div>
                            <div className=' col-sm-3 divinputHorasTrabajadas'>
                                {!inputHrDom ?
                                    <input type="number" min={0} max={storage.get('JornadaMaxima')} placeholder='Hrs anterio' className='form-control inputHorasTrabajadas' onChange={handleInputHorasTrabajadas} />
                                    : ''}
                            </div>
                        </div> :

                        currentTime > timeThreshold && <div className="form-check form-switch esHoraExras col" >
                            <input className="form-check-input esHoraExrasInput" type="checkbox" id="flexSwitchCheckChecked" onClick={handleEsRecargo} />
                            <label className="form-check-label " htmlFor="flexSwitchCheckChecked">Es recargo ?</label>
                        </div>
                    }

                    <div className="row">
                        <div className='col-sm-6'>
                            {/* <label>Rango de fecha</label>*/}
                            <div className='row'>
                                <div className='input-daterange input-group' id='pc-datepicker-5'>
                                    <input value={HorasConcepto.fechas.fechaI} onChange={handlefechaI} min={corteActual.fechaI} max={corteActual.fechaF} required type="date" className='form-control inpuesModal2' />
                                    <span className='input-group-text'>a</span>
                                    <input onChange={handlefechaF}
                                        value={HorasConcepto.fechas.fechaF}
                                        disabled={HorasConcepto.fechas.fechaI == '' ? true : false}
                                        min={HorasConcepto.fechas.fechaI}
                                        max={maxDiaF}
                                        required type="date" className='form-control inpuesModal2' />
                                </div>
                            </div>
                            <div className='row text-center'>
                                <div className='col'>
                                    <label >{tipoDia.TipoFecha.FechaI_Tipo}</label>
                                </div>
                                <div className='col'>
                                    <label >{tipoDia.TipoFecha.FechaF_Tipo}</label>
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-6'>
                            {/*    <label >Rango de hora</label> */}
                            <div className='row'>
                                <div className='row'>
                                    <div className='input-daterange input-group' id='pc-datepicker-5'>
                                        <input value={HorasConcepto.horas.horaI} onChange={handlehoraI}
                                            disabled={HorasConcepto.fechas.fechaI == '' || HorasConcepto.fechas.fechaF == '' ? true : false}
                                            type="time" required className='form-control inpuesModal2' />
                                        <span className='input-group-text'>a</span>
                                        <input value={HorasConcepto.horas.horaF} onChange={handlehoraF}
                                            disabled={HorasConcepto.fechas.fechaI == '' || HorasConcepto.fechas.fechaF == '' ? true : false}
                                            type="time" required className='form-control inpuesModal2' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'></div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col" >
                        <div className="table-responsive-md">
                            {HorasConcepto_rec.total > 0 ?
                                <SimpleTable classHeader='thead-dark ' header={headerHr} body={bodyHr} tfoot={tFooter} classTable='table table-striped' />
                                : <h3 className='text-center'>Sin horas extras digitadas</h3>}
                        </div>
                        <div className="form-group">

                            <textarea value={HorasConcepto.concepto.justificacion} maxLength={1000} placeholder='Trabajo a Realizar ó Realizado' required className="form-control" id="textArModal" rows="3" onChange={handleJustificacion}></textarea>
                        </div>
                        Maximo de caracteres: {parseFloat(maxCarateres).toLocaleString()}
                    </div>
                </div>
            </div>
        </>
    )
}
