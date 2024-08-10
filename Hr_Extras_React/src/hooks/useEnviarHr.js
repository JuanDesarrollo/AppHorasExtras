import React from 'react'
import { sendRequest } from './functions'
import storage from '../storage/storage';

export const useEnviarHr = (selectInputT, setEliminarHr, eliminarHr) => {

    const parametros = { "status": storage.get('rol') == 'jefe' ? 'En nomina' : 'Jefe', "id": selectInputT };
    const enviar = async () => {
        try {
            const res = await sendRequest('post', parametros, 'api/EnviarTodas', '', true);
            if (res.error == false) {
                setEliminarHr(eliminarHr + 1);
            }
        } catch (error) {
            setEliminarHr(eliminarHr + 1);
        }
    }
    enviar();
}
