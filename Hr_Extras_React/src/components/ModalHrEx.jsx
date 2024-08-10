import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { DigitarHrModal } from './DigitarHrModal'

export const ModalHrEx = ({ data }) => {
    return (
        <>

            {/*MODAL CREACION HR EXTRAS */}
            < Modal show={data.showHX} onHide={data.handleCloseHX} size='lg' backdrop="static" >
                <form onSubmit={data.handleSeendHours}>
                    <Modal.Header closeButton>
                        <Modal.Title>Diligenciación de horas extras</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* COmponente en el que se digita las horas extras */}
                  <DigitarHrModal />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={data.handleCloseHX}>
                            Cerrar
                        </Button>
                        <Button type='submit' variant="primary" >
                            Aplicar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal >

            {/*MODAL CREACION HR EXTRAS */}
        </>
    )
}
