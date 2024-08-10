import { useEffect } from "react";
import storage from "../storage/storage";
import succesTopRight, { sendRequest } from "./functions";

export const EnviarCorteActual = (setcorteSelect) => {

    console.log("setcorteSelect -> " + setcorteSelect);


        try {
            const form = { court_id: setcorteSelect, area_id: storage.get('area_id') };

            const res =  sendRequest('POST', form, '/api/current_cut', '', true);
            if (res.status == true) {
                console.log("sendRequest" + res);
            }
        } catch (error) {
            succesTopRight('Sucedio un error', 'error');
        }

    return {}
}
