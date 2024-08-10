import React, { useContext } from "react";
import { TableCard } from "../../components/TableCard";
import { HorasExtrasCreacion } from "../../hooks/HorasExtrasCreacion";
import { Personal } from "../../hooks/Personal";
import { Datatable } from "../../components/Datatable";
import { ProgresoCorte } from "../../components/ProgresoCorte";
import { CurrentCut } from "../../hooks/CurrentCut";
import { DataTableComponent } from "../../components/DataTableComponent";
import { LoadingContext } from "../../context/LoadingContext";
import { ModalCopiarHr } from "../../components/ModalCopiarHr";
import { RefrescarContext } from "../../context/RefrescarContext";


export const CreacionHr = () => {

  const Refrescar1 = useContext(RefrescarContext);


  const { setLoading } = useContext(LoadingContext);
  //Provider para actualizar la data cuando se agregar o se quita personal en las horas extras
 // ------------------------> const { eliminarHr } = useContext(DeleteEmployeeHrContext)
  //Hook que me llama la data de las hr ext para el corte actual
  const { rows, columnss } = HorasExtrasCreacion(Refrescar1, setLoading);
  //Trae la data del personal del area
  const { columns, users } = Personal(setLoading);
  // Trae todos los cortes y los pinta en input para que sean seleccionables
  //const { inputCortes } = Cortes();
  //Trae la informacion del corte actual
  const { corteName } = CurrentCut();
  const { datos } = corteName;
  //setCorteActual(...corteActual,{fecha_i: datos.})

  const [showHX, setShowHX] = React.useState(false);
  const handleCloseHX = () => setShowHX(false);
  const handleShowHX = () => setShowHX(true);
  const handleSubmi = () => {
    window.alert("queeeeeeeeee");
  }

  const funcionesModalGeneral = {
    handleSubmi,
    handleCloseHX,
    showHX,
    title: "Personal del área",
    size: "lg"
  }


  return (
    <>
      <ModalCopiarHr data={funcionesModalGeneral} />
      <div className="pc-container">
        <div className="pc-content">
          <div className="row">
            <div className="col-sm-6">
              <TableCard nombreCard="Personal" contenido={<Datatable columns={columns} data={users} />} />
            </div>
            <div className="col-sm-6">
              <ProgresoCorte datos={datos} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <DataTableComponent rowss={rows} columns={columnss} nombreCard='Creación de horas extras' seleccion={true} handleShowHX={handleShowHX} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
