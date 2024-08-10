import React from 'react'
import EditableTable from '../../components/EditableTable';
import { ModalGeneral } from '../../components/ModalGeneral';
import { Datatable } from '../../components/Datatable';
import { Personal } from '../../hooks/Personal';
import { RequestEmployeeProgramacion } from '../../request/creador/RequestEmployeeProgramacion';
import { useContext } from 'react';
import { RefrescarContext } from '../../context/RefrescarContext';


export const CrearProgramacion = () => {
    const [showHX, setShowHX] = React.useState(false);
    const handleCloseHX = () => setShowHX(false);
    const handleShowHX = () => setShowHX(true);
    const handleSubmi = () => {
        window.alert("queeeeeeeeee");
    }
    const Refrescar1 = useContext(RefrescarContext);

    const { columns, users } = Personal();


    const Body_modal = () => {
        return (
            <>
                <Datatable columns={columns} data={users} />
            </>
        );
    }

    const { datos } = RequestEmployeeProgramacion(Refrescar1);

    const funcionesModalGeneral = {
        handleSubmi,
        handleCloseHX,
        showHX,
        title: "Personal del área",
        size: "lg"
    }


    return (
        <>
            <ModalGeneral data={funcionesModalGeneral} Body_modal={Body_modal} />
            <div className="pc-container">
                <div className="pc-content">
                    <button className='btn btn-primary' onClick={handleShowHX}>Agregar personal</button>
                    <hr />
                    <div className="row">
                        <div className="col-12">
                            <EditableTable nameTable='Crear programaciones' porcentajes={datos} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
