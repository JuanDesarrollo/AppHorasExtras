import { sendRequest } from '../../hooks/functions'

export const RequestUpdateEstadoProgramacion = async (estado, id, deleteAdd, setDeleteAdd) => {

    try {
        const res = await sendRequest("PATCH", { status: estado }, "api/programacion/" + id, "", true, false);
        if (res.error == false) {
            setDeleteAdd(deleteAdd + 1);
        }
    } catch (error) {

    }

}
