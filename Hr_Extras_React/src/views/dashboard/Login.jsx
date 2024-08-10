import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sendRequest } from '../../hooks/functions';
import storage from '../../storage/storage';
import { JornadaMaxima } from '../../request/JornadaMaxima';
import { HorasPorcentajes } from '../../request/HorasPorcentajes';
import { IconApp } from '../../components/IconApp';

export const Login = () => {
    const [usuario, setusuario] = useState('');
    const [contrasena, setcontrasena] = useState('');

    const authUser = storage.get('authUser');
    const userPermissions = storage.get('permisos'); // Obtener permisos desde el storage

    if (authUser) {
        return <Navigate to={'/' + userPermissions[0].name} />;
    }


    const go = useNavigate();
    const csrf = async () => {
        await axios.get('/sanctum/csrf-cookie');
    }

    const login = async (e) => {
        console.log("en login");
        e.preventDefault();
        await csrf();
        const form = { user: usuario, password: contrasena };
        const res = await sendRequest('POST', form, '/api/login', '', false);
        if (res.status == true) {
            storage.set('authToken', res.token);
            storage.set('authUser', res.data.user);
            storage.set('rol', res.rol);
            storage.set('name', res.nombre.name);
            storage.set('position', res.nombre.position);
            storage.set('area', res.area);
            storage.set('area_id', res.nombre.area_id);
            storage.set('permisos', res.permisos);
            await JornadaMaxima(res.area);
            await HorasPorcentajes();
            go(`/${storage.get('permisos')[0].name}`);

        }
    }
    return (
        <>
            <div className="auth-main">
                <div className="auth-wrapper v1">
                    <div className="auth-form">
                        <div className="card my-5">
                            <div className="card-body">
                                <div className="text-center">
                                    <IconApp />
                                </div>
                                <div className="saprator my-3">
                                    <span>login</span>
                                </div>
                                <h4 className="text-center f-w-500 mb-3">Inicia sesion con tus credenciales</h4>
                                <form onSubmit={login}>
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" onChange={(e) => setusuario(e.target.value)} value={usuario} required='required' placeholder="Usuario" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="password" className="form-control" onChange={(e) => setcontrasena(e.target.value)} value={contrasena} required='required' placeholder="Contraseña" />
                                    </div>

                                    <div className="d-grid mt-4">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </form>
                                <div className="d-flex justify-content-between align-items-end mt-4">
                                    <h6 className="f-w-500 mb-0">No tienes credenciales?</h6>
                                    <a href="#" className="link-primary">Crear credenciales</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
