import React from 'react'
import storage from '../storage/storage'
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = ({ allowedPermissions  }) => {
    const authUser = storage.get('authUser');
    const userPermissions = storage.get('permisos'); // Obtener permisos desde el storage

    if (!authUser) {
        return <Navigate to='/login' />;
    }
    

    const hasRequiredPermissions = allowedPermissions.every(permission =>
        userPermissions.some(userPermission => userPermission.name === permission)
    );

    if (!hasRequiredPermissions) {
        return <Navigate to="/*" />; // Ruta a una página de "No autorizado"
    }

    return <Outlet />;
   /* if (!authUser) {
        return <Navigate to='/login' />
    }
    
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />; // Ruta a una página de "No autorizado"
    }
    return (
        <Outlet />
    ) */
}
