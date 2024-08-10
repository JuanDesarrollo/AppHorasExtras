import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
/*Estilos del template */
import './assets/images/favicon.svg'
import './assets/fonts/inter/inter.css'
import './assets/fonts/tabler-icons.min.css'
import './assets/fonts/feather.css'
import './assets/fonts/fontawesome.css'
import './assets/fonts/material.css'
import './assets/css/style.css'
import './assets/css/style-preset.css'
import axios from 'axios'


window.axios =axios;
window.axios.defaults.baseURL ='http://127.0.0.1:8000'
window.axios.defaults.headers.common['Accept'] ='application/json';
window.axios.defaults.headers.common['Content-Type'] ='application/json';
window.axios.defaults.headers.common['x-requested-With'] ='XMLHttpRequest';
window.axios.defaults.withCredentials=true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </BrowserRouter>
)
