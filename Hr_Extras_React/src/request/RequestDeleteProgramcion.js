import { sendRequest } from "../hooks/functions";

export const RequestDeleteProgramcion = async (id, deleteAdd, setDeleteAdd) => {
    try {
        const res = await sendRequest("DELETE", [], "api/programacion/" + id, "", true);
        if (res.error == false) {
            setDeleteAdd(deleteAdd + 1);
        }
    } catch (error) {

    }
}
