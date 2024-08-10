import React from "react";
import { RequestIndexNominaControl } from "../../request/nominaControlInterno/RequestIndexNominaControl";
import { DataTableComponent } from "../../components/DataTableComponent";
import { useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";

export const InformeHorasExtras = () => {
    //Hook que me llama la data de las hr ext para el corte actual
    const { setLoading } = useContext(LoadingContext)
    const { rows, columnss } = RequestIndexNominaControl(setLoading);



    return (
        <>
            <div className="pc-container">
                <div className="pc-content">
                    <div className="row">
                        <div className="col-12">
                            {//rows.length> 0 ?
                                <DataTableComponent rowss={rows} columns={columnss} nombreCard='Historial de horas extras' url="export-actividades" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

