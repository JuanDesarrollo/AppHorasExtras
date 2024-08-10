import { useState } from "react";
import { sendRequest } from "../../hooks/functions"
import { useEffect } from "react";

export const RequestEmployeeProgramacion = (eliminarHr) => {

    const [datos, setdatos] = useState([]);
    const peticion = async () => {
        try {
            const res = await sendRequest("GET", [], "api/employe_programcion_temp", "", true, false);
            if (res.error == false) {
                setdatos(res.data);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        peticion();
    }, [eliminarHr]);

    return { datos }

}
