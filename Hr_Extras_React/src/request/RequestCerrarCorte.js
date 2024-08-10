import { sendRequest } from "../hooks/functions"

export const RequestCerrarCorte = async (id, status, nominaHrModifi, setnominaHrModifi) => {
  try {
    const res = await sendRequest('PATCH', { "status": status }, 'api/cortes/' + id, '', true);

    if (res.error == false) {
      setnominaHrModifi(nominaHrModifi + 1);
    }
  } catch (error) {

  }
}
