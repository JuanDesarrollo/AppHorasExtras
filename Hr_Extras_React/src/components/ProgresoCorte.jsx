import React, { useContext, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Cortes } from '../hooks/Cortes';
import { EnviarCorteActual } from '../hooks/EnviarCorteActual';
import { CurrentCut } from '../hooks/CurrentCut';
import { CurrentCutContext } from '../context/CurrentCutContext';


export const ProgresoCorte = ({datos=[], inputCortes=[]}) => {
    const [show, setShow] = useState(false);
    const [corteSelect, setcorteSelect] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSelectCort = (event) => {
        setcorteSelect(event.target.value);
    }
    const handleEnvSelectCort = () => {
        EnviarCorteActual(corteSelect);
    }

    const  {corteActual}  = useContext(CurrentCutContext)


    return (
        <>
            <Modal show={show} onHide={handleClose} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione el corte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select className="form-select" aria-label="Default select example" onClick={handleSelectCort}>
                        <option selected>CLIC AQUI PARA SELECIONAR CORTE</option>
                        {inputCortes}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleEnvSelectCort}>
                        Aplicar
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="card task-card">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5>Corte actual{corteActual.nombreCorte !== "" ? <span className="text-primary"><a className="text-primary"> {corteActual.nombreCorte}</a> </span> : <span className="text-warning"><a  className="text-warning"> Sin seleccionar</a> </span>} </h5>
                    {/*<a href="#" className="link-primary" onClick={handleShow}>Selecionar corte</a>*/}
                </div>
                <div className="card-body">
                    <ul className="list-unstyled task-list">
                        <li>
                            <i className="feather icon-check f-w-600 task-icon bg-success"></i>
                            <p className="m-b-5">8:50</p>
                            <h5 className="text-muted">Enviado al jefe del área</h5>
                        </li>
                        <li>
                            <i className="task-icon bg-primary"></i>
                            <p className="m-b-5">Sat, 5 Mar</p>
                            <h5 className="text-muted">Aprobado por el jefe del área</h5>
                        </li>
                        <li>
                            <i className="task-icon bg-danger"></i>
                            <p className="m-b-5">Sun, 17 Feb</p>
                            <h5 className="text-muted">Aprobado por nomina</h5>
                        </li>
                        <li>
                            <i className="task-icon bg-warning"></i>
                            <p className="m-b-5">Sat, 18 Mar</p>
                            <h5 className="text-muted">Aprobado control interno</h5>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )
}
