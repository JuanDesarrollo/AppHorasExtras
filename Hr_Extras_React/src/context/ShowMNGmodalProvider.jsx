import React, { useState } from "react";
import { ShowMNGmodalContext } from "../context/ShowMNGmodalContext"
import { sendRequest } from "../hooks/functions";

export const ShowMNGmodalProvider = ({ children }) => {
    const [showMNG, setShowMNG] = React.useState(false);
    const [rowsMNG, setrowsMNG] = useState();
    const [parametros, setparametros] = useState();
    const handleCloseMNG = () => setShowMNG(false);

    const funcionesModalMNG = {
        handleCloseMNG,
        showMNG
    }


    const handleShowMNG = async () => {

        // const parametros = { "id_area": area_id, "id_corte": corte_id };
        try {
            const res = await sendRequest('POST', parametros, 'api/mng', '', true, false);
            if (res.error == false) {
                setrowsMNG(res.data);
                setShowMNG(true);
            }
        } catch (error) {
            console.log("sucedio un error " + error);
        }
    }

    return (
        
        <ShowMNGmodalContext.Provider value={{ handleShowMNG, rowsMNG, setparametros, funcionesModalMNG }} >
            {children}
        </ShowMNGmodalContext.Provider>
    )
}
