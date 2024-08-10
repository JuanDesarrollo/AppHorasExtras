import React, { useContext, useEffect, useRef, useState } from 'react'
import { sendRequest } from './functions';
import { EmployeeExtras } from './EmployeeExtras';
import { useLocation } from 'react-router-dom';
import { RequestAgregarProgramacionTemp } from '../request/creador/RequestAgregarProgramacionTemp';
import { RequestPegarHr } from '../request/creador/RequestPegarHr';
import { RefrescarContext } from '../context/RefrescarContext';

export const Personal = (setLoadingPage, url="/employee") => {
    const [id_empleado, setId_empleado] = useState(0);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {Refrescar1, setRefrescar1} = useContext(RefrescarContext);

    const fetchCalled = useRef(false);  // useRef para verificar si fetchUsers ya fue llamado
    let location = useLocation();

    EmployeeExtras(id_empleado, setRefrescar1, Refrescar1, setLoadingPage);

    const handleAddPersona = (e) => {
        setId_empleado(e.target.id);
    }
    const handleAddPersonaProgramacion = (e) => {
        RequestAgregarProgramacionTemp(e.target.id, setRefrescar1, Refrescar1);
    }
    const handelPegarHoras = (e) => {
       RequestPegarHr(e.target.id);
    }
    // Columnas de la tabla
    const columns = [
        { name: '#', style: { maxWidth: '10%' }, selector: row => row.id, sortable: true, style: { maxWidth: '10%' } },
        { name: 'PERSONAL', style: { maxWidth: '70%' }, selector: row => row.Nombre, sortable: true, style: { maxWidth: '70%' } },
        { name: '', style: { maxWidth: '20%' }, selector: row => row.accion, style: { maxWidth: '20%' } },
    ];

    const fetchUsers = async () => {
        try {
            const response = await sendRequest('GET', null, 'api'+url);
            const transformedUsers = await response.data.map((user, index) => ({
                id: index + 1,
                Nombre: user.name,
                accion: url =="/employee" ? <button type="button" className="btn btn-outline-secondary btn-sm" id={user.id} onClick={location.pathname == "/CrearHr" ? handleAddPersona : handleAddPersonaProgramacion}>Agregar</button>
                :<button type="button" className="btn btn-outline-secondary btn-sm" id={user.id} onClick={handelPegarHoras }>Pegar horas</button>
            }));
            setUsers(transformedUsers);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };


    useEffect(() => {
        if (!fetchCalled.current) {
            fetchCalled.current = true;
            fetchUsers();
        }
    }, []);


    return { columns, users }
}
