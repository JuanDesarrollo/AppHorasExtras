import { sendRequest } from "../../hooks/functions"

export const RequestPuthRoles = async (res, id_empleados) => {

    const parametros = {
        "employee_id": id_empleados,
        'user': res.usuario,
        'password': res.password,
        'password_confirmation': res.password_confirmation,
        'rol': res.rol
    };

    try {
        await sendRequest("POST", parametros, 'api/Roles', "", true);
    } catch (error) {

    }
}
