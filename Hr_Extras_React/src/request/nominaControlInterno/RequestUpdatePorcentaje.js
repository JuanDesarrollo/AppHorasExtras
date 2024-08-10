import { sendRequest } from "../../hooks/functions";
import storage from "../../storage/storage";

export const RequestUpdatePorcentaje = async (row) => {
    const parametros = {
        "conceptos": row.concepto,
        "porcentaje": row.porcentaje,
        "company_code": row.company_code,
        "company_code_seguridad": row.company_code_seg
    };
    try {
        const res = await sendRequest("PATCH", parametros, "api/HorasPorcentajes/" + row.id, "", false);
        if (res.error == false) {
            storage.set('PorcentajesHoras', res.data);
        }
    } catch (error) {
    }

    return {}
}
