import React, { useState } from 'react'
import { sendRequest } from './functions';
import storage from '../storage/storage';

export const useEnviarHrId = (id, errorr, seterror) => {
    const param = { status: storage.get('rol') == 'jefe' ? 'En nomina' : 'Jefe' };

    const enviar = async () => {

        try {
            const res = await sendRequest('PATCH', param, 'api/employee_extras/' + id, '', true);
            if (res.error == false) {
                seterror(false);
            }
        } catch (error) {
            seterror(true);

        }
    }
    enviar();

    return {errorr}
}
