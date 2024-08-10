import { useState } from "react";
import { SeendHourContext } from "./SeendHourContext"

export const SeendHourProvider = ({ children }) => {
    const [HorasConcepto, setHorasConcepto] =
        useState({
            fechas: { fechaI: '', fechaF: '' },
            horas: { horaI: '', horaF: '' },
            concepto: {
                rn: 0, hed: 0, hen: 0, hedd: 0, hedn: 0, rdd: 0, rdn: 0,
                justificacion: ''
            },
            concepto2: {
                rn: 0, hed: 0, hen: 0, hedd: 0, hedn: 0, rdd: 0, rdn: 0,
            },
            total: 0,
            total2: 0
        });

    return (
        <SeendHourContext.Provider value={{ HorasConcepto, setHorasConcepto }} >
            {children}
        </SeendHourContext.Provider>
    )
};
