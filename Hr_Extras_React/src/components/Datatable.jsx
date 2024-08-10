import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { TableWrapper } from '../assets/css/styled'; // Asegúrate de importar el styled


export const Datatable = ({ columns = [], data = [], tfoot = [] }) => {

    const [dataa, setData] = useState(data);
    const [search, setSearch] = useState('');

    // Manejar la entrada de búsqueda
   /* const handleSearch = event => {
        const value = event.target.value;
        setSearch(value);

        const filteredData = data.filter(item =>
            item.Nombre.toLowerCase().includes(value) ||
            item.lastName.toLowerCase().includes(value)
        );

        setData(filteredData);
    } */

    return (
        <>
            <TableWrapper>
                {/*}  <div style={{ marginBottom: '20px' }}>
                    <input
                        className='form-control buscPersonal'
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={handleSearch}
                        style={{ padding: '10px', width: '50%', boxSizing: 'border-box' }}
                    />
                </div> */}
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    paginationPerPage={5}
                />
            </TableWrapper>
        </>

    )
}
