import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { TipoDia } from "./TipoDia";
import storage from "../storage/storage";

export const CalcularExtras = (
    HorasConcepto_rec,
    setHorasConcepto_rec,
    inputHrDom,
    InputHorasTrabajadas,
    esRecargo = false
) => {

    const [tipoDia, setTipoDia] = useState({
        TipoFecha: { FechaI_Tipo: "", FechaF_Tipo: "" },
    });

    const HrMax = storage.get('JornadaMaxima');


    const crearHora = (horaStr) => DateTime.fromFormat(horaStr, "HH:mm");

    const diferencia = (horaInicial, horaFinal) => {
        const duracion = horaFinal.diff(horaInicial, ["hours", "minutes"]);
        return duracion.hours + duracion.minutes / 60;
    };

    const calcularHorasExtras = (horaInicial, horaFinal, tipoDia, opc) => {
        let T_hed = 0, T_hen = 0, T_rdd = 0, T_rdn = 0, T_hdd = 0, T_hdn = 0, T_rn = 0;
        let temGeneral = diferencia(horaInicial, horaFinal);
        let hrAntes = parseFloat(InputHorasTrabajadas);
        const finalNoturna = crearHora("06:00");
        const iniciaNoturna = crearHora("21:00");

        if (horaInicial < finalNoturna) {
            if (horaFinal <= finalNoturna) {
                T_hen = temGeneral;
            } else if (horaFinal <= iniciaNoturna) {
                T_hen = diferencia(horaInicial, finalNoturna);
                T_hed = diferencia(finalNoturna, horaFinal);
            } else {
                T_hen = diferencia(horaInicial, finalNoturna);
                T_hed = diferencia(finalNoturna, iniciaNoturna);
                T_hen += diferencia(iniciaNoturna, horaFinal);
            }
        } else if (horaInicial < iniciaNoturna) {
            if (horaFinal <= iniciaNoturna) {
                T_hed = temGeneral;
            } else {
                T_hed = diferencia(horaInicial, iniciaNoturna);
                T_hen = diferencia(iniciaNoturna, horaFinal);
            }
        } else {
            if (inputHrDom == true) {
                T_rn = temGeneral;
            }
            else {
                if (esRecargo) {
                    T_rn = temGeneral;
                }
                else {
                    T_hen = temGeneral;
                }
            }
        }

        const isEspecialDia1 = tipoDia.FechaI_Tipo === "Domingo" || tipoDia.FechaI_Tipo === "Festivo";
        const isEspecialDia2 = tipoDia.FechaF_Tipo === "Domingo" || tipoDia.FechaF_Tipo === "Festivo";



        if (opc == 1 ? isEspecialDia1 : isEspecialDia2) {
            if (inputHrDom == false) {

                if (temGeneral + hrAntes <= HrMax) {
                    T_rdd = T_hed;
                    T_rdn = T_hen;
                    T_hed = 0;
                    T_hen = 0;
                } else {
                    let remainingHours = 0;
                    remainingHours = temGeneral - HrMax;
                    if (horaInicial <= finalNoturna) {
                        if (hrAntes == 0) {
                            T_rdn = T_hen;
                            T_rdd = T_hed - remainingHours;
                            T_hdd = remainingHours;
                        } else if (hrAntes > 0) {
                            T_rdd = (T_hed - remainingHours) - hrAntes;
                            T_hdd = T_hed - T_rdd <= T_hed ? T_hed - T_rdd : T_hed;
                            T_rdn = T_rdd > 0 ? T_hen : T_hen + T_rdd;
                            T_hdn = T_rdd > 0 ? 0 : temGeneral - (T_hdd + T_rdn);
                        }
                    } else {

                        if (horaFinal <= iniciaNoturna) {
                            if (hrAntes == 0) {
                                T_rdd = T_hed - remainingHours;
                                T_hdd = remainingHours;
                            }
                            else {
                                T_rdd = T_hed - (remainingHours + hrAntes);
                                T_hdd = remainingHours + hrAntes;
                            }
                        } else {
                            if (hrAntes == 0) {
                                T_rdd = T_hed >= HrMax ? HrMax : T_hed;
                                T_hdn = T_hed >= HrMax ? T_hen : remainingHours;
                                T_hdd = temGeneral - (T_rdd + T_hdn);
                            } else {
                                T_rdn = T_hen - (remainingHours + hrAntes);
                                T_rdd = T_rdn >= 0 ? T_hed : T_hed + T_rdn;
                                T_hdn = T_hen - T_rdn > T_hen ? T_hen : T_hen - T_rdn;
                                T_hdd = T_rdd == T_hed ? 0 : temGeneral - (T_hdn + T_rdd);
                            }

                        }
                    }
                }
            }
            else {
                if (isEspecialDia1) {
                    T_hdd = T_hed;
                    T_hdn = T_hen;
                }
            }

        }


        return { T_hed, T_hen, T_rdd, T_rdn, T_hdd, T_hdn, T_rn, temGeneral };
    };

    useEffect(() => {
        const horaInicial = crearHora(HorasConcepto_rec.horas.horaI);
        const horaFinal = crearHora(HorasConcepto_rec.horas.horaF);
        const horaIni = crearHora("00:00");
        const horaFin = crearHora("23:59");

        if (HorasConcepto_rec.fechas.fechaF == HorasConcepto_rec.fechas.fechaI) {
            const { T_hed, T_hen, T_rdd, T_rdn, T_hdd, T_hdn, T_rn, temGeneral } = calcularHorasExtras(horaInicial, horaFinal, tipoDia.TipoFecha, 1);
            setHorasConcepto_rec((prevState) => ({
                ...prevState,
                concepto: {
                    ...prevState.concepto,
                    rn: parseFloat(T_rn).toFixed(2),
                    hed: parseFloat(tipoDia.TipoFecha.FechaI_Tipo === "Ordinario" ? T_hed : 0).toFixed(2),
                    hen: parseFloat(tipoDia.TipoFecha.FechaI_Tipo === "Ordinario" ? T_hen : 0).toFixed(2),
                    hedd: parseFloat(
                        ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaI_Tipo) ? T_hdd : 0
                    ).toFixed(2),
                    hedn: parseFloat(
                        ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaI_Tipo) ? T_hdn : 0
                    ).toFixed(2),
                    rdd: parseFloat(
                        ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaI_Tipo) ? T_rdd : 0
                    ).toFixed(2),
                    rdn: parseFloat(
                        ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaI_Tipo) ? T_rdn : 0
                    ).toFixed(2),
                },
                total: temGeneral,
            }));
        }
        else {
            for (let i = 0; i < 2; i++) {
                console.log("htt " + i);
                if (i === 0) {
                    const { T_hed, T_hen, T_rdd, T_rdn, T_hdd, T_hdn, T_rn, temGeneral } = calcularHorasExtras(horaInicial, horaFin, tipoDia.TipoFecha, 1);
                    setHorasConcepto_rec((prevState) => ({
                        ...prevState,
                        concepto: {
                            ...prevState.concepto,
                            rn: parseFloat(T_rn).toFixed(2),
                            hed: parseFloat(tipoDia.TipoFecha.FechaI_Tipo === "Ordinario" ? T_hed : 0).toFixed(2),
                            hen: parseFloat(tipoDia.TipoFecha.FechaI_Tipo === "Ordinario" ? T_hen : 0).toFixed(2),
                            hedd: parseFloat(
                                ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaI_Tipo) ? T_hdd : 0
                            ).toFixed(2),
                            hedn: parseFloat(
                                ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaI_Tipo) ? T_hdn : 0
                            ).toFixed(2),
                            rdd: parseFloat(
                                ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaI_Tipo) ? T_rdd : 0
                            ).toFixed(2),
                            rdn: parseFloat(
                                ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaI_Tipo) ? T_rdn : 0
                            ).toFixed(2),
                        },
                        total: temGeneral,
                    }));
                } else {
                    const { T_hed, T_hen, T_rdd, T_rdn, T_hdd, T_hdn, T_rn, temGeneral } = calcularHorasExtras(horaIni, horaFinal, tipoDia.TipoFecha, 2);
                    setHorasConcepto_rec((prevState) => ({
                        ...prevState,
                        concepto2: {
                            ...prevState.concepto2,
                            rn: parseFloat(T_rn).toFixed(2),
                            hed: parseFloat(tipoDia.TipoFecha.FechaF_Tipo === "Ordinario" ? T_hed : 0).toFixed(2),
                            hen: parseFloat(tipoDia.TipoFecha.FechaF_Tipo === "Ordinario" ? T_hen : 0).toFixed(2),
                            hedd: parseFloat(
                                ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaF_Tipo) ? T_hdd : 0
                            ).toFixed(2),
                            hedn: parseFloat(
                                ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaF_Tipo) ? T_hdn : 0
                            ).toFixed(2),
                            rdd: parseFloat(
                                ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaF_Tipo) ? T_rdd : 0
                            ).toFixed(2),
                            rdn: parseFloat(
                                ["Domingo", "Festivo"].includes(tipoDia.TipoFecha.FechaF_Tipo) ? T_rdn : 0
                            ).toFixed(2),
                        },
                        total2: temGeneral,
                    }));
                }

            }
        }
    }, [HorasConcepto_rec.horas.horaI, HorasConcepto_rec.horas.horaF, HorasConcepto_rec.fechas.fechaF, tipoDia, inputHrDom, InputHorasTrabajadas, esRecargo]);

    useEffect(() => {
        const dia1 = HorasConcepto_rec.fechas.fechaI ? TipoDia(HorasConcepto_rec.fechas.fechaI) : "";
        const dia2 = HorasConcepto_rec.fechas.fechaF ? TipoDia(HorasConcepto_rec.fechas.fechaF) : "";
        setTipoDia({ TipoFecha: { FechaI_Tipo: dia1, FechaF_Tipo: dia2 } });
    }, [HorasConcepto_rec.fechas.fechaI, HorasConcepto_rec.fechas.fechaF]);

    return { HorasConcepto_rec, tipoDia };
};