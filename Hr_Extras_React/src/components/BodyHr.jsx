import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export const BodyHr = (HorasConcepto_rec, porcent, fechasDiferentes) => {

    //   const [headerHr, setheaderHr] = useState();
    // const [tFooter, settFooter] = useState();

    const headerHr = fechasDiferentes ? ["CONCEPTOS", "HORAS DIA 1", "HORAS DIA 2", "PORCENTAJE"] : ["CONCEPTOS", "HORAS", "PORCENTAJE"];
    const tFooter = fechasDiferentes ? <tr>
        <th>TOTAL</th>
        <th > {parseFloat(HorasConcepto_rec.total).toFixed(2)}</th>
        <th > {parseFloat(HorasConcepto_rec.total2).toFixed(2)}</th>
    </tr>
        :
        <tr>
            <th>TOTAL</th>
            <th colSpan={3}> {parseFloat(HorasConcepto_rec.total).toFixed(2)}</th>
        </tr>;

    const bodyHr = (
        <>
            {(HorasConcepto_rec.concepto.rn > 0 || HorasConcepto_rec.concepto2.rn > 0) && (
                <tr className="custom-row-height">
                    <td>RECARGO NOCTURNO</td>
                    <td>{HorasConcepto_rec.concepto.rn > 0 && HorasConcepto_rec.concepto.rn}</td>
                    {fechasDiferentes && <td>{HorasConcepto_rec.concepto2.rn > 0 && HorasConcepto_rec.concepto2.rn}</td>}
                    <td>{porcent[0].porcentaje} %</td>
                </tr>
            )
            }
            {(HorasConcepto_rec.concepto.hed > 0 || HorasConcepto_rec.concepto2.hed > 0) && (
                <tr className="custom-row-height">
                    <td>HED</td>
                    <td>{HorasConcepto_rec.concepto.hed > 0 && HorasConcepto_rec.concepto.hed}</td>
                    {fechasDiferentes && <td>{HorasConcepto_rec.concepto2.hed > 0 && HorasConcepto_rec.concepto2.hed}</td>}
                    <td>{porcent[1].porcentaje} %</td>
                </tr>
            )
            }
            {(HorasConcepto_rec.concepto.hen > 0 || HorasConcepto_rec.concepto2.hen > 0) && (
                <tr className="custom-row-height">
                    <td>HEN</td>
                    <td>{HorasConcepto_rec.concepto.hen > 0 && HorasConcepto_rec.concepto.hen}</td>
                    {fechasDiferentes && <td>{HorasConcepto_rec.concepto2.hen > 0 && HorasConcepto_rec.concepto2.hen}</td>}
                    <td>{porcent[2].porcentaje} %</td>
                </tr>
            )
            }
            {(HorasConcepto_rec.concepto.hedd > 0 || HorasConcepto_rec.concepto2.hedd > 0) && (
                <tr className="custom-row-height">
                    <td>HEDD</td>
                    <td>{HorasConcepto_rec.concepto.hedd > 0 && HorasConcepto_rec.concepto.hedd}</td>
                    {fechasDiferentes && <td>{HorasConcepto_rec.concepto2.hedd > 0 && HorasConcepto_rec.concepto2.hedd}</td>}
                    <td>{porcent[4].porcentaje} %</td>
                </tr>
            )
            }
            {(HorasConcepto_rec.concepto.hedn > 0 || HorasConcepto_rec.concepto2.hedn > 0) && (
                <tr className="custom-row-height">
                    <td>HEDN</td>
                    <td>{HorasConcepto_rec.concepto.hedn > 0 && HorasConcepto_rec.concepto.hedn}</td>
                    {fechasDiferentes && <td>{HorasConcepto_rec.concepto2.hedn > 0 && HorasConcepto_rec.concepto2.hedn}</td>}
                    <td>{porcent[5].porcentaje} %</td>
                </tr>
            )
            }
            {(HorasConcepto_rec.concepto.rdd > 0 || HorasConcepto_rec.concepto2.rdd > 0) && (
                <tr className="custom-row-height">
                    <td>RECARGO DOM DIURNO</td>
                    <td>{HorasConcepto_rec.concepto.rdd > 0 && HorasConcepto_rec.concepto.rdd}</td>
                    {fechasDiferentes && <td>{HorasConcepto_rec.concepto2.rdd > 0 && HorasConcepto_rec.concepto2.rdd}</td>}
                    <td>{porcent[2].porcentaje} %</td>
                </tr>
            )
            }
            {(HorasConcepto_rec.concepto.rdn > 0 || HorasConcepto_rec.concepto2.rdn > 0) && (
                <tr className="custom-row-height">
                    <td>RECARGO DOM NOCTURNO</td>
                    <td>{HorasConcepto_rec.concepto.rdn > 0 && HorasConcepto_rec.concepto.rdn}</td>
                    {fechasDiferentes && <td>{HorasConcepto_rec.concepto2.rdn > 0 && HorasConcepto_rec.concepto2.rdn}</td>}
                    <td>{porcent[2].porcentaje} %</td>
                </tr>
            )
            }
        </>
    );
    return { bodyHr, headerHr, tFooter }
}
