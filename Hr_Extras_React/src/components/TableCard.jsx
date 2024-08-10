import React from 'react'

export const TableCard = ({ contenido, nombreCard = '', opcionCard = "" }) => {
    return (
        <div className="card table-card">
            <div className="card-header d-flex align-items-center justify-content-between py-3">
                <h5 className="mb-0">{nombreCard}</h5>
                {opcionCard}
            </div>
            <div className="card-body">
                <React.Fragment>
                    {contenido}
                </React.Fragment>
            </div>
        </div>
    )
}
