import { sendRequest } from "../../hooks/functions"

export const RequestAgregarProgramacionTemp = async (id, setEliminarHr, eliminarHr) => {

    try {
        const res = await sendRequest("POST", { employee_id: id }, "api/employe_programcion_temp", "", true);
        if (res.error == false) {
            setEliminarHr(eliminarHr + 1);
        }
    } catch (error) {

    }

    return {}
}
