import React from 'react'
import { useState } from 'react';
import { all_employees } from '../../request/admin/all_employees';
import { DataTableComponent } from '../../components/DataTableComponent';
import { RequestRoles } from '../../request/admin/RequestRoles';
import { RequestPuthRoles } from '../../request/admin/RequestPuthRoles';


export const Admin = () => {
  const [res, setres] = useState({
    rol: "",
    usuario: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [daUserID, setdaUserID] = useState([]);


  const handleRegistrase = async (e) => {
    e.preventDefault();
    RequestPuthRoles(res, daUserID);
  };


  const { columns, datos } = all_employees();
  const { roles } = RequestRoles();
  return (
    <>
      <div className="pc-container">
        <div className="pc-content">
          <div className="row">
            <div className="col-12">
              <div className='row'>
                <div className='col-sm-8'>
                  <DataTableComponent rowss={datos} despliegue={false} columns={columns} nombreCard='Empleados' url="export-actividades" setdaUserID={setdaUserID} seleccion={true} />
                </div>
                <div className='col-sm-4'>
                  <div className="auth-wrapper v1">
                    <div className="auth-form">
                      <div className="card-body">
                        <div className="saprator my-3">
                          <span></span>
                        </div>
                        <form
                          className="mx-1 mx-md-4"
                          onSubmit={handleRegistrase}
                        >
                          <h4 className="text-center f-w-500 mb-3">Registra nuevos usuarios</h4>

                          <div className="form-group mb-3">
                            <select
                              className="form-select form-control"
                              aria-label="Default select example"
                              onChange={(e) => setres({ ...res, rol: e.target.value })}
                              required>
                              <option key={1} selected
                                value=""
                                disabled
                              >Seleccione el rol</option>
                              {roles.map(element => {
                                return (
                                  <option key={element.id + 1} value={element.name}>{element.name}</option>
                                )
                              })}
                            </select>
                          </div>
                          <div className="form-group mb-3">
                            <input type="email" className="form-control" placeholder="Correo electronico"
                              required
                              autofocus
                              value={res.email}
                              onChange={(e) => setres({ ...res, email: e.target.value })}
                            />
                          </div>
                          <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="Usuario"
                              minLength={6}
                              required
                              autofocus
                              value={res.usuario}
                              onChange={(e) => setres({ ...res, usuario: e.target.value })}
                            />
                          </div>
                          <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="Contraseña"
                              minLength={4}
                              required
                              autofocus
                              value={res.password}
                              onChange={(e) => setres({ ...res, password: e.target.value })}

                            />
                          </div>
                          <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="Confirmar Contraseña"
                              password_confirmation
                              minLength={4}
                              required
                              autofocus
                              value={res.password_confirmation}
                              onChange={(e) => setres({ ...res, password_confirmation: e.target.value })}

                            />
                          </div>

                          <div className="d-grid mt-4">
                            <button type="submit" className="btn btn-primary">Registrarse</button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

