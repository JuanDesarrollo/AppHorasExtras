
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./views/dashboard/Login";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { CreacionHr } from "./views/creador/Index";
import { Jefe } from "./views/jefe/Index";
import { CrearProgramacion } from "./views/creador/CrearProgramacion";
import { Footer } from "./components/Footer";
import { SidebarProvider } from "./context/SidebarProvider";
import { SidebarProviderMob } from "./context/SiderbarProviderMob";
import { SideMenu } from "./components/SideMenu";
import { Header } from "./components/Header";
import { InformeHorasExtras } from "./views/general/InformeHorasExtras";
import { InformeProgramaciones } from "./views/general/InformeProgramaciones";
import { SeendHourProvider } from "./context/SeendHourProvider";
import { CurrentCutProvider } from "./context/CurrentCutProvider";
import { NominaControlInterno } from './views/Nomina_ControlInterno/Index'
import { ShowMNGmodalProvider } from "./context/ShowMNGmodalProvider";
import { LoadingProvider } from "./context/LoadingProvider";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { HorasPorcentajesProvider } from "./context/HorasPorcentajesProvider";
import { PorcentajeExtras } from "./views/Nomina_ControlInterno/PorcentajeExtras";
import { Cortes } from "./views/Nomina_ControlInterno/Cortes";
import { Agregar_corte } from "./views/Nomina_ControlInterno/Agregar_corte";
import { RefrescarProvider } from "./context/RefrescarProvider";
import { RefrescarProvider2 } from "./context/RefrescarProvider2";
import { RefrescarProvider3 } from "./context/RefrescarProvider3";
import { Admin } from "./views/admin/Index";
import { Usuarios } from "./views/admin/Usuarios";
import {PageNotFound} from "./views/PageNotFound"

function App() {
  const location = useLocation();

  return (
    <>
      <LoadingProvider>
        <LoadingOverlay />
        <RefrescarProvider >
          <RefrescarProvider2 >
            <RefrescarProvider3 >
              <SidebarProvider>
                <SidebarProviderMob>
                  <ShowMNGmodalProvider>
                    <CurrentCutProvider>
                      <SeendHourProvider>
                        <HorasPorcentajesProvider>
                          <SideMenu show={location.pathname == "/login" ? false : true} />
                          <Header show={location.pathname === "/login" ? false : true} />
                          <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/*" element={<PageNotFound />} />
                            <Route element={<ProtectedRoutes allowedPermissions={['CrearHr']} />}>
                              <Route path="/CrearHr" element={<CreacionHr />} />
                            </Route>
                            <Route element={<ProtectedRoutes allowedPermissions={['AprobarHr']} />}>
                              <Route path="/AprobarHr" element={<Jefe />} />
                            </Route>
                            <Route element={<ProtectedRoutes allowedPermissions={['NominaControl']} />}>
                              <Route path="/NominaControl" element={<NominaControlInterno />} />
                            </Route>
                            <Route element={<ProtectedRoutes allowedPermissions={['CrearProgramacion']} />}>
                              <Route path="/CrearProgramacion" element={<CrearProgramacion />} />
                            </Route>
                            <Route element={<ProtectedRoutes allowedPermissions={['InformeProgramaciones']} />}>
                              <Route path="/InformeProgramaciones" element={<InformeProgramaciones />} />
                            </Route>
                            <Route element={<ProtectedRoutes allowedPermissions={['VerInformeHr']} />}>
                              <Route path="/InformeHorasExtras" element={<InformeHorasExtras />} />
                            </Route>
                            <Route element={<ProtectedRoutes allowedPermissions={['PorcentajeExtras']} />}>
                              <Route path="/PorcentajeExtras" element={<PorcentajeExtras />} />
                            </Route>
                            <Route element={<ProtectedRoutes allowedPermissions={['Administrador']} />}>
                              <Route path="/Administrador" element={<Admin />} />
                              <Route path="/Usuarios" element={<Usuarios />} />
                            </Route>
                            <Route element={<ProtectedRoutes allowedPermissions={['CrearCortes']} />}>
                              <Route path="/Cortes" element={<Cortes />} />
                              <Route path="/Agregar_corte" element={<Agregar_corte />} />
                            </Route>
                          </Routes >
                          <Footer show={location.pathname === "/login" ? false : true} />
                        </HorasPorcentajesProvider>
                      </SeendHourProvider>
                    </CurrentCutProvider>
                  </ShowMNGmodalProvider>
                </SidebarProviderMob>
              </SidebarProvider>
            </RefrescarProvider3>
          </RefrescarProvider2>
        </RefrescarProvider>
      </LoadingProvider>
    </>
  );
}


export default App;
