import React from 'react'

export const SimpleTable = ({ header = [], classTable = '', classHeader = '', body = [], tfoot = [] }) => {

    return (
        <table className={classTable}>
            <thead className={classHeader}>
                <tr>
                    {header.map((row, index) => (
                        <th key={index}>{row}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
            <tfoot>
                {tfoot}
            </tfoot>
        </table >
    )
}
