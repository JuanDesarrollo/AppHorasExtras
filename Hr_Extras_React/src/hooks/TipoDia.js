import React, { useState, useEffect } from 'react';
import Holidays from 'date-holidays';
import { DateTime } from 'luxon';

export const TipoDia = (fecha) => {
    const hd = new Holidays('CO'); // Cambia 'US' por el código de tu país
    const fechaLuxon = DateTime.fromISO(fecha);

    const esFestivo = hd.isHoliday(fechaLuxon.toJSDate()) !== false;
    const esDomingo = fechaLuxon.weekday === 7;

    if (esFestivo) {
        return 'Festivo';
    } else if (esDomingo) {
        return 'Domingo';
    } else {
        return 'Ordinario';
    }
}
