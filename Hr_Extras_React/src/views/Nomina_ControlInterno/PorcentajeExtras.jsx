import React from 'react';
import EditableTable from '../../components/EditableTable';
import storage from '../../storage/storage';

export const PorcentajeExtras = () => {


    return (
        <>
            <div className="pc-container">
                <div className="pc-content">
                    <div className="row">
                        <div className="col-12">
                            <EditableTable nameTable='Porcentaje de las horas extras' porcentajes={storage.get('PorcentajesHoras')} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
