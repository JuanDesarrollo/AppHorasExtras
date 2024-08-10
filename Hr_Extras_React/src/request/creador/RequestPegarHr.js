import { sendRequest } from "../../hooks/functions";
import storage from "../../storage/storage";

export const RequestPegarHr = async (id) => {

    try {
        await sendRequest("POST",
            { "employee_pegar": id, "employe_copiado": storage.get("id_employe_copiado") },
            "api/Employee_pegarHr", "", true);
    } catch (error) {

    }
}
