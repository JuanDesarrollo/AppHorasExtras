import { useEffect } from 'react';
import { sendRequest } from '../../hooks/functions'
import { useState } from 'react';
import storage from '../../storage/storage';

export const RequestHrXcorte = (area_id, corte_id, nominaHrModifi) => {

    const [datos, setdata] = useState([]);
    const rol = storage.get('rol');
    const handleVhora = () => {
        if (rol == "jefe" || rol == "nomina" || rol == "control_interno") {
            return true;
        }
        else {
            return false;
        }
    }

    const callRequest = async () => {
        try {
            const res = await sendRequest('POST', { "corte_id": corte_id, "area_id": area_id }, 'api/HorasXempleadoXcorte', "", true, false);

            if (res.error == false) {
                const newRows = await res.data.map((element) => {
                    return {
                        empleado: {
                            id: element.id,
                            nombre: element.name,
                            documento: element.document,
                            cargo: element.position,
                            salary: element.salary,
                            valorHora: handleVhora() && (parseFloat(element.salary) / element.valorHora.horas_mes).toLocaleString(),
                        },
                        employee_extras: element.employee_extras[0].extra_hours.map(element2 => {
                            return {
                                id: element2.id,
                                date_i: element2.date_i,
                                date_f: element2.date_f,
                                time_i: element2.time_i,
                                time_f: element2.time_f,
                                id_detail: element2.detail_hours.id,
                                rn: element2.detail_hours.rn,
                                hed: element2.detail_hours.hed,
                                hen: element2.detail_hours.hen,
                                rdd: element2.detail_hours.rdd,
                                rdn: element2.detail_hours.rdn,
                                hedd: element2.detail_hours.hedd,
                                hedn: element2.detail_hours.hedn,
                                justification: element2.detail_hours.justification,
                                desaprobacion: element2.detail_hours.disapproved_hour.map(element3 => {
                                    return (element3.user.user + ": " + element3.reason
                                    )
                                })
                            }
                        })

                    };
                });
                setdata(newRows);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        callRequest();
    }, [nominaHrModifi]);


    return { datos }
}
