import succesTopRight, { sendRequest } from '../../hooks/functions';

export const SeendHours = (HorasConcepto, setHorasConcepto, employeDespliegue, deleteAdd, setDeleteAdd) => {


    /*   useState({
           fechas: { fechaI: '', fechaF: '' },
           horas: { horaI: '', horaF: '' },
           concepto: { rn: 0, hed: 0, hen: 0, hedd: 0, hedn: 0, rdd: 0, rdn: 0 },
           total: 0,
           justificacion: ''
       }); */



    const date_i = HorasConcepto.fechas.fechaI;
    const date_f = HorasConcepto.fechas.fechaF;
    const time_i = HorasConcepto.horas.horaI;
    const time_f = HorasConcepto.horas.horaF;

    const hed = parseFloat(HorasConcepto.concepto.hed) + parseFloat(HorasConcepto.concepto2.hed);
    const hen = parseFloat(HorasConcepto.concepto.hen) + parseFloat(HorasConcepto.concepto2.hen);
    const rdd = parseFloat(HorasConcepto.concepto.rdd) + parseFloat(HorasConcepto.concepto2.rdd);
    const rdn = parseFloat(HorasConcepto.concepto.rdn) + parseFloat(HorasConcepto.concepto2.rdn);
    const hedd = parseFloat(HorasConcepto.concepto.hedd) + parseFloat(HorasConcepto.concepto2.hedd);
    const hedn = parseFloat(HorasConcepto.concepto.hedn) + parseFloat(HorasConcepto.concepto2.hedn);
    const rn = parseFloat(HorasConcepto.concepto.rn) + parseFloat(HorasConcepto.concepto2.rn);


    const justification = HorasConcepto.concepto.justificacion;


    const parametros = {
        extra_hours: [{ "employee_extra_id": employeDespliegue, "date_i": date_i, "date_f": date_f, "time_i": time_i, "time_f": time_f, "status": 'creador' }],
        detail_hours: [{ "rn": rn, "hed": hed, "hen": hen, "rdd": rdd, "rdn": rdn, "hedd": hedd, "hedn": hedn, "justification": justification }]
    };
    const agregar = async () => {
        if (HorasConcepto.concepto.justificacion != '' && HorasConcepto.total > 0) {
            const res = await sendRequest('POST', parametros, 'api/extra_hour', '', true);
            if (res.error == false) {
                setDeleteAdd(deleteAdd + 1);
                setHorasConcepto((prevState) => ({
                    ...prevState,
                    fechas: { fechaI: '', fechaF: '' },
                    horas: { horaI: '', horaF: '' },
                    concepto: {
                        ...prevState.concepto,
                        rn: 0, hed: 0, hen: 0, hedd: 0, hedn: 0, rdd: 0, rdn: 0,
                        rn2: 0, hed2: 0, hen2: 0, hedd2: 0, hedn2: 0, rdd2: 0, rdn2: 0,
                        justificacion: ''
                    },
                    concepto2: {
                        ...prevState.concepto2,
                        rn: 0, hed: 0, hen: 0, hedd: 0, hedn: 0, rdd: 0, rdn: 0,
                        rn2: 0, hed2: 0, hen2: 0, hedd2: 0, hedn2: 0, rdd2: 0, rdn2: 0,
                    },
                    total: 0,
                    total2: 0,
                }));
            }
        }
        else {
            succesTopRight('Faltan datos', 'warning');
        }
    }

    agregar();

}
