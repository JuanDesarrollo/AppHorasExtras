import React from 'react'
import EditableTable from '../../components/EditableTable';
import { RequestIndexProgramcion } from '../../request/RequestIndexProgramcion';
import { useContext } from 'react';
import { RefrescarContext } from '../../context/RefrescarContext';

export const InformeProgramaciones = () => {
const Refrescar1 = useContext(RefrescarContext);

    const { datos } = RequestIndexProgramcion(Refrescar1);
    
    return (
        <>
            <div className="pc-container">
                <div className="pc-content">
                <div className="row">
                    <div className="col-12">
                        <EditableTable nameTable='Programaciones' porcentajes={datos} />
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
