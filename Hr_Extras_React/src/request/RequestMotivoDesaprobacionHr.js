import { sendRequest } from "../hooks/functions"

export const RequestMotivoDesaprobacionHr = async (id, justificacion) => {

    try {
        const res = await sendRequest('PATH', { "reason": justificacion }, 'disapproved_hours/' + id, true);
    } catch (error) {

    }
}
