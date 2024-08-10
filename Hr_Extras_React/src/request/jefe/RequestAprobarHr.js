import { sendRequest } from '../../hooks/functions'

export const RequestAprobarHr = async (id, estado, text = '', detail_id = "", nominaHrModifi = 0, setnominaHrModifi) => {

    try {
        if (estado == "ap_jefe" || estado == "ap_control_interno") {
            const res = await sendRequest('PATCH', { "status": estado }, 'api/extra_hour/' + id, '', true);
            if (res.error == false) {
                setnominaHrModifi(nominaHrModifi + 1);
            }
        }
        else {
            const res = await sendRequest('PATCH', { "status": estado }, 'api/extra_hour/' + id, '', true, false);
            if (res.error == false) {
                const res2 = await sendRequest('POST', { "reason": text, "id": detail_id }, 'api/disapproved_hours', '', true);
                //console.log("sediento de sangre 0");
                //setnominaHrModifi(nominaHrModifi + 1);
                if (res2.error == false) {
                    console.log("sediento de sangre");
                    setnominaHrModifi(nominaHrModifi + 1);
                }
            }
        }

    } catch (error) {

    }
}
