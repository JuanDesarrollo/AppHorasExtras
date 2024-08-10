import { sendRequest } from "../../hooks/functions"

export const RequestDeleteTemp_employee = async (id, setEliminarHr, eliminarHr) => {

    try {
        const res = await sendRequest("delete", [], "api/employe_programcion_temp/" + id, "", true);
        if (res.error == false) {
            setEliminarHr(eliminarHr + 1);
        }

    } catch (error) {

    }
}

