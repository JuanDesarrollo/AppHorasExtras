import { sendRequest } from "../../hooks/functions";

export const RequestUpdateCorte = async (row, count, setcount) => {
    const parametros = {
        "name": row.company_code,
        "date_i": row.company_code_seg,
        "date_f": row.concepto
    };
    try {
        const res = await sendRequest("PATCH", parametros, "api/UpdateCorte/" + row.id, "", false);
        if (res.error == false) {
            setcount(count + 1);
        }
    } catch (error) {
    }

    return {}
}
