import { sendRequest } from '../hooks/functions';

export const RequestLogout = async (clean, go) => {
    try {
        const res = await sendRequest("POST", [], 'api/logout', "", true);
        if (res.error == false) {
            clean();
            go("/login");
        }

    } catch (error) {

    }
}
