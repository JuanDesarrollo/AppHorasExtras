import React, { useContext } from "react";
import { HorasExtrasCreacion } from "../../hooks/HorasExtrasCreacion";
import { DataTableComponent } from "../../components/DataTableComponent";
import { LoadingContext } from "../../context/LoadingContext";
import { RefrescarContext } from "../../context/RefrescarContext";

export const Jefe = () => {
  //Provider para actualizar la data cuando se agregar o se quita personal en las horas extras
  const Refrescar1 = useContext(RefrescarContext);

  const { setLoading } = useContext(LoadingContext)

  //Hook que me llama la data de las hr ext para el corte actual
  const { rows, columnss } = HorasExtrasCreacion(Refrescar1, setLoading);


  return (
    <>
      <div className="pc-container">
        <div className="pc-content">
          <div className="row">
            <div className="col-12">
              {//rows.length> 0 ?
                <DataTableComponent rowss={rows} columns={columnss} nombreCard='Aprobación de Horas Extras' url="export-actividades" />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

