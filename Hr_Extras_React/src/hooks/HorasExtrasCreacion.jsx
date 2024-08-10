import React, { useEffect, useState } from 'react'
import { sendRequest } from './functions';
import storage from '../storage/storage';


export const HorasExtrasCreacion = (eliminarHr = '', setLoading) => {

    const [rows, setRows] = useState();
    const rol = storage.get("rol");
    // Columnas de la tabla

    const handleVhora = () => {
        if (rol == "jefe" || rol == "nomina" || rol == "control_interno") {
            return true;
        }
        else {
            return false;
        }
    }
    const getHours = async () => {
        const rest = await sendRequest('GET', [], 'api/employee_extras', '', true);
        const newRows = await rest.data.map((element) => {
            return {
                id: element.id,
                nombre: element.employee.name,
                documento: element.employee.document,
                employee_id: element.employee_id,
                cargo: element.employee.position,
                salario: parseFloat(element.employee.salary).toLocaleString(),
                valorHora: handleVhora() && (parseFloat(element.employee.salary) / element.employee.valorHora.horas_mes).toLocaleString(),
                horas: 15,
                estado: "Enviadas 1/54 aprobadas jefe 1/1",
                btn_accion:
                    rol == "creador" ? <> <button id={element.id} type="button" className="btn btn-light btn-sm">Eliminar</button>
                        <button id={element.id} type="button" className="btn btn-light btn-sm">Enviar</button>
                    </> :
                        <button id={element.id} type="button" className="btn btn-light btn-sm">Enviar</button>
                ,
            };
        });
        if (rest.error == false) {
            setLoading(false);
            setRows(newRows);
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        //  setLoading(true);

        getHours();
    }, [eliminarHr]);

    let columnss = [];
    if (rol == "creador") {
        columnss = [
            {
                name: "nombre",
                label: "Empleado",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "documento",
                label: "Documento",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "cargo",
                label: "Cargo",
                options: {
                    filter: false,
                    sort: true,
                }
            },

            {
                name: "estado",
                label: "Estado",
                options: {
                    filter: false,
                    sort: true,
                }
            },
        ];
    } else {
        columnss = [
            {
                name: "nombre",
                label: "Empleado",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "documento",
                label: "Documento",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "cargo",
                label: "Cargo",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "salario",
                label: "Salario",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "valorHora",
                label: "V. Hora",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "estado",
                label: "Estado",
                options: {
                    filter: false,
                    sort: true,
                }
            },
        ];
    }


    return { rows, columnss }
}
