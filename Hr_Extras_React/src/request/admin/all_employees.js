import { useState } from "react";
import { sendRequest } from "../../hooks/functions"
import { useEffect } from "react";

export const all_employees = () => {


    const [datos, setdatos] = useState([]);
    // Columnas de la tabla
    const columns = [
        {
            name: "Nombre",
            label: "Nombre",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "Cargo",
            label: "Cargo",
            options: {
                filter: false,
                sort: true,
            }
        },

    ];

    const peticion = async () => {
        try {
            const res = await sendRequest("GET", {}, "api/all_employees", "", true, false);
            if (res.error == false) {
                const transformedUsers = res.data.map((user, index) => ({
                    id: user.id,
                    Nombre: user.name,
                    Cargo: user.position,
                }));
                setdatos(transformedUsers);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        peticion();
    }, []);


    return { columns, datos }
}
