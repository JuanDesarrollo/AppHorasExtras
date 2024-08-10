import Swal from 'sweetalert2';
import { sendRequest } from '../hooks/functions'
import { useState } from 'react';

export const RequestProgramacionEmpleado = async (empleado, corte) => {
    const [datosP, setdatosP] = useState([]);

    const parametros = { "empleado_id": empleado, "corte_id": corte };
    try {
        const res = await sendRequest("post", parametros, "api/ProgramacionEmpleado", "", true, false);
        if (res.error == false) {
            if (res.data == []) {
                Swal.fire({
                    icon: "warning",
                    title: "Sin programciones",
                    text: "No se encontro programaciones para este personal",
                });
            } else {
                setdatosP(res.data);
                // return { datos_programacion }
            }
        }
    } catch (error) {

    }

    return { datosP }

}
