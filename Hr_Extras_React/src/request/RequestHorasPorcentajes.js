import { useState } from "react";
import { sendRequest } from "../hooks/functions"
import { useEffect } from "react";

export const RequestHorasPorcentajes = () => {
    const [horasPorcentaje, sethorasPorcentaje] = useState([]);
    const reques = async () => {
        try {
            const res = await sendRequest('GET', [], 'api/HorasPorcentajes', "", true, false);
            if (res.error == false) {
                sethorasPorcentaje(res.data);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        reques();
    }, [])

    return { horasPorcentaje }

}
