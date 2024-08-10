import { sendRequest } from '../../hooks/functions'

export const RequestAddCorte = async (parametros) => {
    try {
        await sendRequest("POST", parametros, "api/cortes", "", true);

    } catch (error) {

    }
}
