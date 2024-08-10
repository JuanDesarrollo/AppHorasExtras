import { useState } from "react";
import { sendRequest } from "../../hooks/functions";
import { useEffect } from "react";

export const RequestAreasNominaControl = (id) => {

    const [rows, setRows] = useState();

    // Columnas de la tabla
    const getHours = async () => {
        const rest = await sendRequest('POST', { "court_id": id }, 'api/areasContreolInternoNomina', '', true, false);
        const newRows = await rest.data.map((element) => {
            return {
                id: element.id,
                area: element.name,
                company_id: element.Company_code
            };
        });
        setRows(newRows);
    }

    useEffect(() => {
        getHours();
    }, []);


    const columnss = [
        {
            name: "area",
            label: "Area",
            options: {
                filter: true,
                sort: true,
            }
        }
    ];

    return { rows, columnss }
}
