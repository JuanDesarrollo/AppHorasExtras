import React, { useEffect } from 'react'
import { sendRequest } from '../hooks/functions'
import storage from '../storage/storage';

export const JornadaMaxima = async (area_id) => {

        try {
            const rest = await sendRequest('GET', [], 'api/JordanaMaxima', '', true);
            if (rest.error == false) {
                console.log("sin error " + rest.data[0]);
                if (area_id == '2') {
                    storage.set('JornadaMaxima', rest.datos[1].Horas_maxima);
                }
                else {
                    storage.set('JornadaMaxima', rest.data[0].Horas_maxima);
                }
                
            }

        } catch (error) {

        }
}
