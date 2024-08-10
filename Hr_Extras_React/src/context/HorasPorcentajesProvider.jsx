import React from 'react'
import { HorasPorcentajesContext } from './HorasPorcentajesContext';
import { RequestHorasPorcentajes } from '../request/RequestHorasPorcentajes';

export const HorasPorcentajesProvider = ({ children }) => {

    const { horasPorcentaje } = RequestHorasPorcentajes();
    return (
        <HorasPorcentajesContext.Provider value={{ horasPorcentaje }}>
            {children}
        </HorasPorcentajesContext.Provider>
    );
}

