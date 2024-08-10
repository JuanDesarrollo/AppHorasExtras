import { sendRequest } from '../../hooks/functions'

export const RequestDeleteUser = async (id, Refrescar1, setRefrescar1) => {

    try {
        const res = await sendRequest("DELETE", {}, 'api/deleteUser/' + id, "", true);
        if (res.error == false) {
            setRefrescar1(Refrescar1 + 1);
        }
    } catch (error) {

    }

}
