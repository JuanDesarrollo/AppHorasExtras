import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const ModalProgramacionesEmpleado = ({ data, body }) => {
    return (
        < Modal show={data.showPr} onHide={data.handleClosePr} size='xl' backdrop="static" >
            <Modal.Header closeButton>
                <Modal.Title>Programaciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={data.handleClosePr}>
                    Cerrar
                </Button>

            </Modal.Footer>
        </Modal >
    )
}
