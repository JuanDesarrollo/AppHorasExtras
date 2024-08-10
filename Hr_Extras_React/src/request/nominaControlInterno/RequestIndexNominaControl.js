import { useState } from 'react';
import { sendRequest } from '../../hooks/functions';
import { useEffect } from 'react';
import { handleButtonCerrarCorte } from '../../components/handleButtonCerrarCorte';
import { useLocation } from 'react-router-dom';
import storage from '../../storage/storage';

export const RequestIndexNominaControl = (setLoading, nominaHrModifi, setnominaHrModifi) => {

    const [rows, setRows] = useState();
    const rol = storage.get('rol');
    let location = useLocation();
    const [columnss, setcolumnss] = useState([
        {
            name: "nombre",
            label: "Corte",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "rango",
            label: "Rango corte",
            options: {
                filter: true,
                sort: true,
            }
        },
    ]);
    // Columnas de la tabla
    const getHours = async () => {
        const rest = await sendRequest('GET', [], 'api/indexContreolInternoNomina', '', true);

        if (rest.error == false) {
            const newRows = await rest.data.map((element) => {
                return {
                    id: element.id,
                    nombre: element.name,
                    rango: element.date_i + " a " + element.date_f,
                    status: element.status,
                    cerrar_corte: handleButtonCerrarCorte(element.id, element.status, nominaHrModifi, setnominaHrModifi)
                };
            });
            setRows(newRows);
            setLoading(false);
            if (location.pathname != "/InformeHorasExtras" && rol == 'nomina') {

                setcolumnss([{
                    name: "nombre",
                    label: "Corte",
                    options: {
                        filter: true,
                        sort: true,
                    }
                },
                {
                    name: "rango",
                    label: "Rango corte",
                    options: {
                        filter: true,
                        sort: true,
                    }
                }, {
                    name: "cerrar_corte",
                    label: "CERRAR EL CORTE",
                    options: {
                        filter: false,
                        sort: false,
                    }
                }]);
            }
        } else {
            setLoading(false);

        }

    }


    useEffect(() => {
        setLoading(true);
        getHours();
    }, [nominaHrModifi]);


    return { rows, columnss }
}
