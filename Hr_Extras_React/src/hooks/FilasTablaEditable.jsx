import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { IconButton } from '@mui/material';
import { SvgIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { RequestDeleteProgramcion } from "../request/RequestDeleteProgramcion";
import TooltipCell from '../components/TooltipCell';
import { useEffect } from 'react';
import { RequestPostProgramacion } from '../request/creador/RequestPostProgramacion';
import Swal from 'sweetalert2';
import { RequestUpdatePorcentaje } from '../request/nominaControlInterno/RequestUpdatePorcentaje';
import { RequestUpdateCorte } from '../request/nominaControlInterno/RequestUpdateCorte';


export const FilasTablaEditable = (rol, location, 
  handleEliminarProgramcion, handleShowLabor, UpdateEstadoProgramacion, 
porcentajes, Refrescar1, setRefrescar1, count,  setcount, data, setData) => {
    const [editIdx, setEditIdx] = useState(-1);

    const [row, setRow] = useState({});

    useEffect(() => {
      if (location.pathname == "/PorcentajeExtras") {
          if (porcentajes) {
              const Temp_porcentajes = porcentajes.map(element => ({
                  id: element.id,
                  company_code: element.company_code,
                  company_code_seg: element.company_code_seguridad,
                  concepto: element.conceptos,
                  porcentaje: element.porcentaje
              }));
              setData(Temp_porcentajes);
          }
      }
      else if (location.pathname == "/Cortes") {

          const Temp_porcentajes = porcentajes.map(element => ({
              id: element.id,
              company_code: element.name,
              company_code_seg: element.date_i,
              concepto: element.date_f,
              porcentaje: element.status
          }));
          setData(Temp_porcentajes);
      }
      else if (location.pathname == "/InformeProgramaciones") {

          const Temp_porcentajes = porcentajes.map(element => ({
              area: element.area_name,
              id: element.id,
              corte: element.corte,
              empleado: element.employee_name,
              fecha: element.date,
              hora: element.time_i + " - " + element.time_f,
              labor: element.word,
              estado: element.status == "" ? "Sin aprobar" : element.status
          }));
          console.log(Temp_porcentajes);
          setData(Temp_porcentajes);
      }

      else if (location.pathname == "/NominaControl") {
          const Temp_porcentajes = porcentajes.map(element => ({
              date: element.date,
              time_f: element.time_f,
              time_i: element.time_i,
              word: element.word,
          }));
          console.log(Temp_porcentajes);
          setData(Temp_porcentajes);
      }
      else {
          const Temp_porcentajes = porcentajes.map(element => ({
              id: element.id,
              empleado: element.name,
              fecha: "salash"
          }));

          const temp = { id: "general", empleado: "APLICAR A TODOS", fecha: "" };
          setData([temp, ...Temp_porcentajes]);

      }

  }, [porcentajes]);

  const handleCrearProgramcion = (index, id) => {

    RequestPostProgramacion(id, [...fecha_programcion][index], [...horai_programcion][index], [...horaf_programcion][index], [...labor_programcion][index],
        index, fecha_programcion, setFecha_programcion, horai_programcion,
        setHorai_programcion, horaf_programcion, sethoraf_programcion,
        labor_programcion, setlabor_programcion);
}

const handleEdit = (idx) => {
  setEditIdx(idx);
  setRow({ ...data[idx] });
};


const handleSave = (idx) => {

  Swal.fire({
      title: "Estas seguro?",
      text: "Se modificará este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Actualizar!"
  }).then((result) => {
      if (result.isConfirmed) {

          if (location.pathname == "/PorcentajeExtras") {
              RequestUpdatePorcentaje(row);
              setEditIdx(-1);
          } else {

              RequestUpdateCorte(row, count, setcount);
              setEditIdx(-1);

          }

      }
  });

};


  const handleEstado = (estado) => {
    if (estado == "Por aprobar") {
      return <span className="badge text-bg-warning">{estado}</span>;
    }
    else if (estado == "Aprobado") {
      return <span className="badge text-bg-success">{estado}</span>;
    }
    else {
      return <span className="badge text-bg-danger">{estado}</span>;

    }
  }

  const handleChange = (e, field) => {
    setRow({ ...row, [field]: e.target.value });
  };

  const handleElimianarPr = (id) => {
    RequestDeleteProgramcion(id, Refrescar1, setRefrescar1);
  }

  const [labor_programcion, setlabor_programcion] = useState(porcentajes.map(() => ''));
  const [fecha_programcion, setFecha_programcion] = useState(porcentajes.map(() => ''));
  const [horai_programcion, setHorai_programcion] = useState(porcentajes.map(() => ''));
  const [horaf_programcion, sethoraf_programcion] = useState(porcentajes.map(() => ''));



  const handleFecha_programcionChange = (index, value, id) => {
    // Crea una nueva copia del estado con el valor actualizado
    const newInputs = [...fecha_programcion];

    if (id == "general") {

      for (let i = 0; i < data.length; i++) {
        newInputs[i] = value;
      }
      setFecha_programcion(newInputs);
    }
    else {
      newInputs[index] = value;
      setFecha_programcion(newInputs);
    }
  };

  const handleHoraI_programcionChange = (index, value, id) => {
    // Crea una nueva copia del estado con el valor actualizado
    const newInputs = [...horai_programcion];

    if (id == "general") {

      for (let i = 0; i < data.length; i++) {
        newInputs[i] = value;
      }
      setHorai_programcion(newInputs);

    }
    else {
      newInputs[index] = value;
      setHorai_programcion(newInputs);
    }
  };


  const handleHoraF_programcionChange = (index, value, id) => {
    // Crea una nueva copia del estado con el valor actualizado
    const newInputs = [...horaf_programcion];

    if (id == "general") {

      for (let i = 0; i < data.length; i++) {
        newInputs[i] = value;
      }
      sethoraf_programcion(newInputs);

    } else {
      newInputs[index] = value;
      sethoraf_programcion(newInputs);
    }
  };

  const handleLabor_programcionChange = (index, value, id) => {
    // Crea una nueva copia del estado con el valor actualizado
    const newInputs = [...labor_programcion];

    if (id == "general") {
      for (let i = 0; i < data.length; i++) {
        newInputs[i] = value;
      }
      setlabor_programcion(newInputs);
    }
    else {
      newInputs[index] = value;
      setlabor_programcion(newInputs);
    }
  };



  const hableColums = () => {
    if (rol == "creador" && location.pathname == "/CrearProgramacion") {

      return [
        {
          name: 'empleado',
          label: "EMPLEADO",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.empleado}
                  onChange={(e) => handleChange(e, 'empleado')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'id',
          label: "FECHA",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type="date"
                />
              ) : (
                <input
                  required
                  type='date'
                  value={[...fecha_programcion][idx]}
                  onChange={(e) => handleFecha_programcionChange(idx, e.target.value, value)}
                  className='form-control' />
              );
            },
          },
        },
        {
          name: 'id',
          label: "HORA DE INGRESO",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type="time"
                />
              ) : (
                <input
                  required
                  type='time'
                  className='form-control'
                  value={[...horai_programcion][idx]}
                  onChange={(e) => handleHoraI_programcionChange(idx, e.target.value, value)}
                />
              );
            },
          },
        },
        {
          name: 'id',
          label: "HORA DE SALIDA",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type="time"

                />
              ) : (
                <input required type='time'
                  className='form-control'
                  value={[...horaf_programcion][idx]}
                  onChange={(e) => handleHoraF_programcionChange(idx, e.target.value, value)}
                />
              );
            },
          },
        },
        {
          name: 'id',
          label: "LABOR A DESEMPEÑAR",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                //  onChange={(e) => handleChange(e, 'company_code')}
                />
              ) : (

                <textarea
                  required
                  type='text'
                  className='form-control'
                  placeholder='Digite aqui la justificación'
                  maxLength={1000}
                  value={[...labor_programcion][idx]}
                  onChange={(e) => handleLabor_programcionChange(idx, e.target.value, value)}
                />
              );
            },
          },
        },
        {
          name: 'id',
          label: "ACCIÓN",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type={location.pathname == "/PorcentajeExtras" && "number"}
                // onChange={(e) => handleChange(e, 'company_code')}
                />
              ) : (
                value == "general" ? "SIN ACCIONES A REALIZAR" :
                  <>
                    <button type='submit' className='btn btn-outline-secondary  iconAprobar' id={value} onClick={(e) => handleCrearProgramcion(idx, value)} >Crear</button>
                    {/*  <button className='btn btn-light separacion' id={value} onClick={handleNewRow} >Más</button>*/}
                    <button className='btn btn-outline-danger ' id={value} onClick={handleEliminarProgramcion} >Borrar</button>
                  </>
              );
            },
          },
        },
      ];
    }
    else if (location.pathname == "/InformeProgramaciones" && rol != "Monitoreo_seg") {
      return [
        {
          name: 'corte',
          label: "CORTE",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.corte}
                  onChange={(e) => handleChange(e, 'corte')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'empleado',
          label: "EMPLEADO",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.empleado}
                  onChange={(e) => handleChange(e, 'empleado')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'fecha',
          label: "FECHA",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.fecha}
                  onChange={(e) => handleChange(e, 'fecha')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'hora',
          label: "HORA",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.hora}
                  onChange={(e) => handleChange(e, 'hora')}
                />
              ) : (
                value
              );
            }, filter: false

          },
        },

        {
          name: 'labor',
          label: "LABOR DESEMPEÑADO",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.labor}
                />

              ) : (
                <label onClick={() => handleShowLabor(value)}>
                  <TooltipCell text={value} />
                </label>
              );
            },
            filter: false
          },
        },
        {
          name: 'estado',
          label: "Estado",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.estado}
                  onChange={(e) => handleChange(e, 'estado')}
                />
              ) : (
                handleEstado(value)
              );
            },
          },
        },
        {
          name: 'id',
          label: "ACCIÓN",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type={location.pathname == "/PorcentajeExtras" && "number"}
                // onChange={(e) => handleChange(e, 'company_code')}
                />
              ) : (
                <>

                  {rol != "creador" && <>
                    <IconButton title='Aprobar hora extras' onClick={() => UpdateEstadoProgramacion("Aprobado", value)}>
                      <SvgIcon className='clic' id={value} component={ThumbUpIcon} inheritViewBox />
                    </IconButton>
                    <IconButton title='Desaprobar hora extras' onClick={() => UpdateEstadoProgramacion("Desaprobado", value)}>
                      <SvgIcon className='clic' id={value} component={ThumbDownAltIcon} inheritViewBox />
                    </IconButton>
                  </>
                  }

                  <IconButton title='Eliminar hora extra' id={value} onClick={(e) => handleElimianarPr(value)}>
                    <SvgIcon className='clic' component={DeleteIcon} inheritViewBox />
                  </IconButton>
                </>
              );
            }, filter: false

          },
        },
      ];
    }
    else if (location.pathname == "/NominaControl") {
      return [

        {
          name: 'date',
          label: "FECHA",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.date}
                  onChange={(e) => handleChange(e, 'date')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'time_f',
          label: "HORA INICIO",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.time_f}
                  onChange={(e) => handleChange(e, 'time_f')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'time_i',
          label: "HORA FINALIZACIÓN",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.time_i}
                  onChange={(e) => handleChange(e, 'time_i')}
                />
              ) : (
                value
              );
            }, filter: false

          },
        },

        {
          name: 'word',
          label: "LABOR DESEMPEÑADO",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.word}
                />

              ) : (
                <label onClick={() => handleShowLabor(value)}>
                  <TooltipCell text={value} />
                </label>
              );
            },
            filter: false
          },
        },

      ];
    }
    else if (rol == "Monitoreo_seg") {
      return [
        {
          name: 'area',
          label: "AREA",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.area}
                  onChange={(e) => handleChange(e, 'area')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'corte',
          label: "CORTE",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.corte}
                  onChange={(e) => handleChange(e, 'corte')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'empleado',
          label: "EMPLEADO",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.empleado}
                  onChange={(e) => handleChange(e, 'empleado')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'fecha',
          label: "FECHA",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.fecha}
                  onChange={(e) => handleChange(e, 'fecha')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'hora',
          label: "HORA",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.hora}
                  onChange={(e) => handleChange(e, 'hora')}
                />
              ) : (
                value
              );
            }, filter: false

          },
        },

        {
          name: 'labor',
          label: "LABOR DESEMPEÑADO",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type=""
                  value={row.labor}
                />

              ) : (
                <label onClick={() => handleShowLabor(value)}>
                  <TooltipCell text={value} />
                </label>
              );
            },
            filter: false
          },
        }
      ];
    }
    else {
      return [
        {
          name: 'company_code',
          label: location.pathname == "/PorcentajeExtras" ? 'Codigo MNG' : "CORTE",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type={location.pathname == "/PorcentajeExtras" && "number"}
                  value={row.company_code}
                  onChange={(e) => handleChange(e, 'company_code')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'company_code_seg',
          label: location.pathname == "/PorcentajeExtras" ? 'Codigo MNG Seguridad' : "FECHA INICIO",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type={location.pathname == "/PorcentajeExtras" ? "number" : "date"}
                  value={row.company_code_seg}
                  onChange={(e) => handleChange(e, 'company_code_seg')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'concepto',
          label: location.pathname == "/PorcentajeExtras" ? 'Nombre concepto' : "FECHA FINALIZACIÓN",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type={location.pathname == "/PorcentajeExtras" ? "" : "date"}
                  value={row.concepto}
                  onChange={(e) => handleChange(e, 'concepto')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'porcentaje',
          label: location.pathname == "/PorcentajeExtras" ? 'Porcentaje %' : "ESTADO",
          options: location.pathname == "/PorcentajeExtras" && {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <TextField
                  type="number"
                  value={row.porcentaje}
                  onChange={(e) => handleChange(e, 'porcentaje')}
                />
              ) : (
                value
              );
            },
          },
        },
        {
          name: 'actions',
          label: 'Acción',
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              const idx = tableMeta.rowIndex;
              return editIdx === idx ? (
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => handleSave(idx)}
                >
                  Guardar cambios
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => handleEdit(idx)}
                >
                  Editar
                </Button>
              );
            },
          },
        },
      ];
    }


  }

  return { hableColums }
}
