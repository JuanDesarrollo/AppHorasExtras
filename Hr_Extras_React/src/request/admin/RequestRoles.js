import { useState } from 'react';
import { useEffect } from 'react';
import { sendRequest } from '../../hooks/functions';

export const RequestRoles = () => {
    const [roles, setroles] = useState([]);
    const rolesidades = async () => {
        try {
            const res = await sendRequest('GET', [], 'api/Roles', '', false);
            setroles(res.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        rolesidades();
    }, [])

    return { roles }
}
