import { useState } from 'react';
import { sendRequest } from '../../hooks/functions';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { RequestDeleteUser } from './RequestDeleteUser';
import Swal from 'sweetalert2';
import { RefrescarContext } from '../../context/RefrescarContext';
import { useContext } from 'react';

export const RequestGetUser = () => {


    const { Refrescar1, setRefrescar1 } = useContext(RefrescarContext)


    const [datos, setdatos] = useState([]);

    // Función para manejar la edición
    const handleEdit = (rowIndex) => {
        const user = datos[rowIndex];
        console.log('Editando usuario:', user);
        // Aquí puedes agregar la lógica para editar el usuario
    };

    // Función para manejar la eliminación
    const handleDelete = (id) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "Este usuarios se eliminara permanentemente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                RequestDeleteUser(id, Refrescar1, setRefrescar1 );
            }
        });
        // Aquí puedes agregar la lógica para eliminar el usuario
    };

    // Columnas de la tabla
    const columns = [
        {
            name: "Area",
            label: "Area",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "Empleado",
            label: "Empleado",
            options: {
                filter: false,
                sort: true,
            }
        },

        {
            name: "Usuario",
            label: "Usuario",
            options: {
                filter: false,
                sort: true,
            }
        },

        {
            name: "Rol",
            label: "Rol",
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
        {
            name: "Acciones",
            label: "ACCIONES",
            options: {
                filter: false,
                sort: false,
                options: {
                    filter: false,
                    sort: true,
                }
            }
        },

    ];

    const peticion = async () => {
        try {
            const res = await sendRequest("GET", {}, "api/all_user", "", true, false);
            if (res.error == false) {
                const transformedUsers = res.data.map((user, index) => ({
                    id: user.id,
                    Empleado: user.employee_name,
                    Area: user.area_name,
                    Usuario: user.user,
                    Rol: user.rol_name,
                    Cargo: user.position,
                    Acciones: <>
                        <IconButton title='Editar justificación' onClick={() => handleEdit(user.id)}>
                            <SvgIcon className='clic ' component={EditIcon} inheritViewBox />
                        </IconButton>
                        <IconButton title='Eliminar usuario' onClick={() => handleDelete(user.id)}>
                            <SvgIcon className='clic ' component={DeleteIcon} inheritViewBox />
                        </IconButton>
                    </>
                }));
                setdatos(transformedUsers);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        peticion();
    }, [Refrescar1]);


    return { columns, datos }
}
