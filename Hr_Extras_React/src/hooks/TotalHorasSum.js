import { useEffect } from 'react';
import { useState } from 'react';

export const TotalHorasSum = (rowsHr) => {
    const [totals, setTotals] = useState({
        hed: 0,
        hen: 0,
        hedd: 0,
        hedn: 0,
        rdd: 0,
        rdn: 0,
        rn: 0,
        total: 0
    });


    useEffect(() => {
        const newTotals = rowsHr.reduce((acc, row) => {
            acc.hed += parseFloat(row.hed) || 0;
            acc.hen += parseFloat(row.hen) || 0;
            acc.hedd += parseFloat(row.hedd) || 0;
            acc.hedn += parseFloat(row.hedn) || 0;
            acc.rdd += parseFloat(row.rdd) || 0;
            acc.rdn += parseFloat(row.rdn) || 0;
            acc.rn += parseFloat(row.rn) || 0;
            acc.total += parseFloat(row.hed) + parseFloat(row.hen) 
            + parseFloat(row.hedd) + parseFloat(row.hedn)+ 
            parseFloat(row.rdd) + parseFloat(row.rdn) + parseFloat(row.rn) || 0;
            return acc;
        }, {
            hed: 0,
            hen: 0,
            hedd: 0,
            hedn: 0,
            rdd: 0,
            rdn: 0,
            rn: 0,
            total: 0
        });

        setTotals(newTotals);
    }, [rowsHr]);

    return { totals }
}
