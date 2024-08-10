import { useState } from "react";
import { useEffect } from "react";

export const OpcionesMenu = (rol) => {
  console.log("rol " + rol);

  const [opcionesHeader, setopcionesHeader] = useState({});


  useEffect(() => {
    if (rol === "creador") {
      setopcionesHeader({
        Acciones: [
          {
            name: "Horas extras",
            path: "/CrearHr",
            icon: "#custom-status-up",
          },
          {
            name: "Programación",
            path: "/CrearProgramacion",
            icon: "#custom-fatrows",
          },
        ],
        Informes: [
          {
            name: "Informe hr extras",
            path: "/InformeHorasExtras",
            icon: "#custom-mouse-circle",
          },
          {
            name: "Mis programaciones",
            path: "/InformeProgramaciones",
            icon: "#custom-text-block",
          }
        ],
      });
    }
    else if (rol === "jefe") {
      setopcionesHeader({
        Acciones: [
          {
            name: "Aprobar Extras",
            path: "/AprobarHr",
            icon: "#custom-fatrows",
          },
          {
            name: "Aprobar Programación",
            path: "/InformeProgramaciones",
            icon: "#custom-box-1",
          },
        ],
        Informes: [
          {
            name: "Informe hr extras",
            path: "/InformeHorasExtras",
            icon: "#custom-mouse-circle",
          }
        ],
      });
    }
    else if (rol === "nomina" || rol === "controlInterno") {
      setopcionesHeader({
        Acciones: [
          {
            name: "Inicio",
            path: "/NominaControl",
            icon: "#custom-fatrows",
          },
          {
            name: "Definir porcentajes",
            path: "/PorcentajeExtras",
            icon: "#custom-box-1",
          },
          {
            name: "Cortes",
            path: "/Cortes",
            icon: "#custom-crop",
          },
        ],
      });
    }
    else if (rol === "Monitoreo_seg") {
      setopcionesHeader({
        Acciones: [
          {
            name: "Inicio",
            path: "/InformeProgramaciones",
            icon: "#custom-fatrows",
          }
        ],
      });
    }
    else if (rol === "admin") {
      setopcionesHeader({
        Acciones: [
          {
            name: "Crear usuarios",
            path: "/Administrador",
            icon: "#custom-fatrows",
          },
          {
            name: "Usuarios",
            path: "/Usuarios",
            icon: "#custom-fatrows",
          },
          {
            name: "Definir porcentajes",
            path: "/PorcentajeExtras",
            icon: "#custom-box-1",
          },
          {
            name: "Cortes",
            path: "/Cortes",
            icon: "#custom-crop",
          },
          {
            name: "Jornada maxima",
            path: "/Jornadamaxima",
            icon: "#custom-crop",
          },
        ],
      });
    }
  }, [rol])

  return { opcionesHeader }
}
