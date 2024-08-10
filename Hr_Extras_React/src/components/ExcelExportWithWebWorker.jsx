import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as XLSX from 'xlsx';

const columns = [
  {
    id: 'subirsn',
    label: 'SUBIRSN.C1',
  },
  {
    id: 'tipodoc',
    label: 'TIPODOC.C4',
  },
  {
    id: 'cedula',
    label: 'CEDULA.C15',
  },
  {
    id: 'nombre',
    label: 'NOMBRE.C50',
    align: 'center'
  },

  {
    id: 'cause',
    label: 'CAUSA.C5',
  },

  {
    id: 'limpio',
    label: 'LIMPIO.C50',
    align: 'center'
  },

  {
    id: 'fecini',
    label: 'FECINI.C10',
  },

  {
    id: 'dias',
    label: 'DIAS.N10',
  },

  {
    id: 'canti',
    label: 'CANTI.N12',
  },

  {
    id: 'valor',
    label: 'VALOR.N12',
  },

  {
    id: 'detalle',
    label: 'DETALLE.C250',
  },

  {
    id: 'diagnos',
    label: 'DIAGNOS.C6',
  },

  {
    id: 'limpio2',
    label: 'LIMPIO2.C10',
    align: 'center'
  },

  {
    id: 'limpio3',
    label: 'LIMPIO3.C250',
    align: 'center'
  },

  {
    id: 'sucurs',
    label: 'SUCURS.C5',
    align: 'center'
  },

  {
    id: 'ccosto',
    label: 'CCOSTO.C10',
    align: 'center'
  },

  {
    id: 'destino',
    label: 'DESTINO.C10',
    align: 'center'
  },
  {
    id: 'zona',
    label: 'ZONA.C5',
    align: 'center'
  },
];

function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

export default function ExcelExportWithWebWorkers({ rowsMNG }) {
  const createData = (subirsn, tipodoc, cedula, nombre, cause, limpio,
     fecini, dias, canti, valor, detalle, diagnos, limpio2, limpio3, sucurs, ccosto, destino, zona) => {
    return { subirsn, tipodoc, cedula, nombre, cause, limpio, fecini,
       dias, canti, valor, detalle, diagnos, limpio2, limpio3, sucurs, ccosto, destino, zona };
  }

  // Utilizar el método map para crear los objetos dinámicamente
  const rows = rowsMNG.map(element => {
    return createData('S', 'NV01', element.document, '.', element.cause, '.', formatDate(), '0,00', element.cant,'0', element.detalle,'NA', '.', '.', '.', '.', '.', '.');
  });



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDownload = () => {
    const data = rows.map(row => {
      const newRow = {};
      columns.forEach(column => {
        newRow[column.label] = row[column.id];
      });
      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };



  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <button onClick={handleDownload} className='btn btn-sm btn-secondary'>
        Generar archivo excel
      </button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
