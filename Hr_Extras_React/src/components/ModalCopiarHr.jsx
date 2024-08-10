import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Datatable } from './Datatable';
import { Personal } from '../hooks/Personal';

export const ModalCopiarHr = ({ data }) => {

    const { columns, users } = Personal("","/Employee_copiarHr");


    return (
        <>
            {/*MODAL CREACION HR EXTRAS */}
            < Modal show={data.showHX} onHide={data.handleCloseHX} size={data.size} backdrop="static" >
                <form onSubmit={data.handleSubmi}>
                    <Modal.Header closeButton>
                        <Modal.Title>{data.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* COmponente en el que se digita las horas extras */}
                        <Datatable columns={columns} data={users} />

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

