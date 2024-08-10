import React from "react";
import { RequestIndexNominaControl } from "../../request/nominaControlInterno/RequestIndexNominaControl";
import { DataTableComponent } from "../../components/DataTableComponent";
import { useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { ModificarHrContext } from "../../context/ModificarHrContext";
import { RefrescarContext } from "../../context/RefrescarContext";

export const NominaControlInterno = () => {
  //Hook que me llama la data de las hr ext para el corte actual
  const { setLoading } = useContext(LoadingContext);

  const {Refrescar1, setRefrescar1} = useContext(RefrescarContext);

  // --------> const { nominaHrModifi, setnominaHrModifi } = useContext(ModificarHrContext);

  const { rows, columnss } = RequestIndexNominaControl(setLoading, Refrescar1, setRefrescar1);


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

