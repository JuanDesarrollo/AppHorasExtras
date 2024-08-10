import { useState } from 'react'
import { sendRequest } from '../../hooks/functions'
import Swal from 'sweetalert2';

export const RequestModificarJustificacion = async (id, justificacion, deleteAdd, setDeleteAdd) => {
    console.log(id, justificacion);
    try {
        const params = { "id": id, "justificacion": justificacion };
        const res = await sendRequest("POST", params, "api/UpdateJustificacionHr", "", true);
        if (res.error == false) {
            setDeleteAdd(deleteAdd + 1);
            Swal.fire("Observación modificada:", justificacion);
        }
    } catch (error) {
    }
    //  return { error }
}
