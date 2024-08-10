import React from 'react'
import Swal from 'sweetalert2';
import { RequestCerrarCorte } from '../request/RequestCerrarCorte';

export const handleButtonCerrarCorte = (id, status, nominaHrModifi, setnominaHrModifi) => {

    const handleFinalizarCorte = () => {
        Swal.fire({
            title: "Estas seguro?",
            text: "¡No se podrá realizar ninguna modificación!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                RequestCerrarCorte(id, status == "abierto" ? "cerrado" : "abierto", nominaHrModifi, setnominaHrModifi );
            }
        });
    }


    return (
        <button className='btn btn-light btn-sm' onClick={handleFinalizarCorte}>{status == "abierto" ? "Finalizar este corte" : "Volver a abrir"}</button>
    )
}
