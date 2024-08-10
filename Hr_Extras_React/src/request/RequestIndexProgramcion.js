import { useState } from "react";
import { sendRequest } from "../hooks/functions"
import { useEffect } from "react";

export const RequestIndexProgramcion = (deleteAdd) => {

    const [datos, setdatos] = useState([]);

    const resouesta = async () => {
        try {
            const res = await sendRequest("get", [], "api/programacion", "", true, false);
            if (res.error == false) {
                setdatos(res.data);
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        resouesta();
    }, [deleteAdd]);


    return { datos }

}
