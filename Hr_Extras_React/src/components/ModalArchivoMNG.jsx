import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const ModalArchivoMNG = ({ data, body }) => {

    return (
        <>
            < Modal show={data.showMNG} onHide={data.handleCloseMNG} size='xl' backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title>Diligenciación de horas extras</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={data.handleCloseMNG}>
                        Cerrar
                    </Button>
                    <Button type='submit' variant="primary" >
                        Aplicar
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

