import { useEffect, useMemo, useState } from "react";
import succesTopRight, { AlertConfirmacion, sendRequest } from "./functions"

export const Cortes = () => {
    const [inputCortes, setinputCortes] = useState([]);
    const consultarCortes = async () => {
        try {
            const res = await sendRequest('GET', '', 'api/cortes');
            const data = await res.data.map((value, item) => {
                return (<option key={item} value={value.id}>{value.date_i} - {value.name}</option>
                )
            });
            // setinputCortes(data);
            setinputCortes(res.data);

        } catch (error) {
            succesTopRight('Error', 'error');
        }

    }

    useMemo(() => inputCortes, [])

    useEffect(() => {
        if (inputCortes.length === 0) { // Realiza la llamada solo si inputCortes está vacío
            consultarCortes();
        }
    }, [])

    return { inputCortes }
}
