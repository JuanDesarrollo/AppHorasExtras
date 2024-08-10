import { useEffect } from 'react';
import { useState } from 'react';
import { sendRequest } from '../hooks/functions';

export const RequestCortes = (count) => {
    const [datos, setdatos] = useState();

    const peticion = async () => {
        try {
            const res = await sendRequest('GET', [], 'api/cortes', "", true, false);
            if (res.error == false) {
                setdatos(res.data);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        peticion();
    }, [count]);



    return { datos }
}
