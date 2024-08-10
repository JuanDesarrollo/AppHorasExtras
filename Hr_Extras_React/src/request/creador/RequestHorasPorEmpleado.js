import { useState } from 'react';
import { sendRequest } from '../../hooks/functions';
import { useEffect } from 'react';
import storage from '../../storage/storage';

export const RequestHorasPorEmpleado = (id, deleteAdd = 0, setLoading) => {
    const [rowsHr, setRows] = useState();

    const getHours = async () => {
        const rest = await sendRequest('POST', { "id": id }, 'api/horasPorEmpleado', '', true, false);
        const newRows = await rest.data.map((element) => {
            return {
                id: element.id,
                date_i: element.date_i,
                date_f: element.date_f,
                time_i: element.time_i,
                time_f: element.time_f,
                status: element.status,
                id_detail: element.detail_hours.id,
                hed: element.detail_hours.hed,
                hen: element.detail_hours.hen,
                hedd: element.detail_hours.hedd,
                hedn: element.detail_hours.hedn,
                rdd: element.detail_hours.rdd,
                rdn: element.detail_hours.rdn,
                rn: element.detail_hours.rn,
                justification: element.detail_hours.justification,
                desaprobacion: element.detail_hours.disapproved_hour.map((element, index) => {
                    return `${index + 1}. ${element.user.user}: ${element.reason} `;
                }).join('\n')
            };
        });

        if (rest.error == false) {
            setLoading(false);
            setRows(newRows);
        }

        else {
            setLoading(false);
        }

    }
    useEffect(() => {
        storage.get('rol') == 'creador' && setLoading(true);

        getHours();
    }, [id, deleteAdd,])

    return { rowsHr }
}
