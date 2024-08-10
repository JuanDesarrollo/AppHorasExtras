import { sendRequest } from "../../hooks/functions"

export const deleteEmployeExtrasHook = (id, setEliminarHr, eliminarHr ) => {

    const eliminar = async () => {
        try {
            const res = await sendRequest('POST', {"id": id}, `api/eliminarEmpleado`, '', true);
            if (res.error == false) {
                setEliminarHr(eliminarHr+1);
            }
        } catch (error) {

        }
    }

    eliminar();

}
