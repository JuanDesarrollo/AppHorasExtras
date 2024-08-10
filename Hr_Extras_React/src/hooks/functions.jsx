import Swal from "sweetalert2"
import storage from "../storage/storage";
import axios from "axios";


export const succesTopRight = (mensaje = 'Realizado', icon = 'success', position = 'top-end') => {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: icon,
        title: mensaje
    });
}


export const AlertConfirmacion = (title = 'Etsas seguro?', text = 'Realizado', icon = 'warning', accion = '') => {

    /* Swal.fire({
         title: title,
         text: text,
         icon: icon,
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
     }).then((result) => {
         if (result.isConfirmed) {
             accion();
         }
     }); */

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });


}


export const sendRequest = async (method, params, url, redir = '', token = true, notificacion = true) => {
    if (token) {
        const authToken = storage.get('authToken');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
    }

    let res;
    try {
        const response = await axios({ method: method, url: url, data: params });
        res = response.data;

        if (method !== 'GET') {
            notificacion && succesTopRight(response.data.message, 'success');
        }

        if (redir !== '') {
            setTimeout(() => {
                window.location.href = redir;
            }, 2000);
        }
    } catch (errors) {
        let desc = '';

        succesTopRight(errors.response.data.message, 'error');
        res = errors.response.data;
    }
    return res;
}

export const confirmation = async (name, url, redir) => {
    let accion = sendRequest('DELETE', {}, url, redir)
    AlertConfirmacion();
}




export default succesTopRight;
