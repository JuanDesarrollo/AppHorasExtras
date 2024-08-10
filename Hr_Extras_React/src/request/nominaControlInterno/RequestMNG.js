import { useState } from "react";
import { sendRequest } from "../../hooks/functions"

export const RequestMNG = async (id_area, id_corte) => {
    const [datos, setdata] = useState();
    const parametros = { "id_area": id_area, "id_corte": id_corte };
    const parametros2 = { "id_corte": id_corte };

    try {
        const res = await sendRequest('POST', id_area != '' ? parametros : parametros2, 'api/mng', '', true, false);
        if (res.error == false) {
            setdata(res.data);
        }
    } catch (error) {
        console.log("sucedio un error " + error);
    }


    return { datos }
}
