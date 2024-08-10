import { sendRequest } from '../../hooks/functions'

export const RequestDeleteHr = async (id, deleteAdd, setDeleteAdd) => {

    try {
        const res = await sendRequest('DELETE', [], "api/extra_hour/" + id, "", true);
        if (res.error == false) {
            setDeleteAdd(deleteAdd + 1);
        }

    } catch (error) {
        console.log("fallo");
    }

}
