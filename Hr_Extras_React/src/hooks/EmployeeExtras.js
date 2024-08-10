import { sendRequest } from './functions'
import storage from '../storage/storage';
import { useEffect } from 'react';

export const EmployeeExtras = (id_empleado, setEliminarHr, eliminarHr, setLoadingPage) => {
    const datos = { employee_id: id_empleado, status: 'En creacion', area: storage.get('area_id') };

    const addEmployeExtras = async () => {
        setLoadingPage(true);
        try {
            const res = await sendRequest('POST', datos, 'api/employee_extras', '', true);
            if (res.error == false) {
                setEliminarHr(eliminarHr + 1);
            }
            setLoadingPage(false);

        } catch (error) {
            setLoadingPage(false);
        }
    }

    useEffect(() => {
        if (id_empleado > 0) {
            addEmployeExtras();
        }
    }, [id_empleado]);

}
