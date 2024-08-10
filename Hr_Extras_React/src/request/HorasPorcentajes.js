import React from 'react'
import { sendRequest } from '../hooks/functions';
import storage from '../storage/storage';

export const HorasPorcentajes = async () => {


    try {
        const rest = await sendRequest('GET', [], 'api/HorasPorcentajes', '', true);
        if (rest.error == false) {
            console.log("Entrgas de > "+rest.data);
            storage.set('PorcentajesHoras', rest.data);
        }

    } catch (error) {

    }


}
