import { sendRequest } from "../../hooks/functions"

export const RequestPostProgramacion = async (id, date, time_i, time_f, word,
    index, fecha_programcion, setFecha_programcion, horai_programcion,
    setHorai_programcion, horaf_programcion, sethoraf_programcion,
    labor_programcion, setlabor_programcion
) => {

    const parametros = {
        "employee_schedule_id": id,
        "date": date,
        "time_i": time_i,
        "time_f": time_f,
        "word": word,
        "status": "Por aprobar"

    };

    try {
        const res = await sendRequest("POST", parametros, "api/programacion", "", true);
        if (res.error == false) {

            const newInputsF = [...fecha_programcion];
            newInputsF[index] = "";
            setFecha_programcion(newInputsF);

            const newInputsHoI = [...horai_programcion];
            newInputsHoI[index] = "";
            setHorai_programcion(newInputsHoI);

            const newInputsHoF = [...horaf_programcion];
            newInputsHoF[index] = "";
            sethoraf_programcion(newInputsHoF);

            const newInputsLabor = [...labor_programcion];
            newInputsLabor[index] = "";
            setlabor_programcion(newInputsLabor);
        }
    } catch (error) {

    }
}
