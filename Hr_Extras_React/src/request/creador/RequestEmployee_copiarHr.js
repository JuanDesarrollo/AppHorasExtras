import { useState } from "react";
import { sendRequest } from "../../hooks/functions";
import { useEffect } from "react";

export const RequestEmployee_copiarHr = (id) => {

    const [datos, setdatos] = useState();
    // Columnas de la tabla
    const columns = [
        { name: '#', style: { maxWidth: '10%' }, selector: row => row.id, sortable: true, style: { maxWidth: '10%' } },
        { name: 'PERSONAL', style: { maxWidth: '70%' }, selector: row => row.Nombre, sortable: true, style: { maxWidth: '70%' } },
        { name: '', style: { maxWidth: '20%' }, selector: row => row.accion, style: { maxWidth: '20%' } },
    ];

    const handlePegar = () =>{

    }

    const peticion = async () => {
        try {
            const res = await sendRequest("GET", { "id": id }, "api/Employee_copiarHr", "", true);
            if (res.error == false) {
                const transformedUsers = res.data.map((user, index) => ({
                    id: user.id,
                    Nombre: user.name,
                    accion: <button type="button" className="btn btn-outline-secondary btn-sm" id={user.id} onClick={handlePegar}>Pegar</button>
                }));
                setdatos(transformedUsers);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        peticion();
    }, []);


    return {columns,  datos }
}
