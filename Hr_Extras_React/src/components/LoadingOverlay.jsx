import React, { useContext, useState } from 'react'
import '../assets/Mis_stilos/LoadingOverlay.css';
import { LoadingContext } from '../context/LoadingContext';

export const LoadingOverlay = () => {
    const {loading} = useContext(LoadingContext)
    return (
        <>
            {loading ?
                <div className="overlay">
                    <div className="spinner"></div>
                </div>
                : null
            }
        </>
    )
}
