import React from "react";
import { SidebarProvider } from "../../context/SidebarProvider";
import { SidebarProviderMob } from "../../context/SiderbarProviderMob";
import { SideMenu } from "../../components/SideMenu";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ItemSidder } from "../../hooks/ItemSidder";

export const Revisor = () => {
  const creador = {
    Creacion: [
      {
        name: "Horas extras",
        path: "/creador",
        icon: "#custom-status-up",
      },
      {
        name: "Programación",
        path: "/crearProgramacion",
        icon: "#custom-fatrows",
      },
    ],
    Informes: [
      {
        name: "Mis programaciones",
        path: "/InformeProgramaciones",
        icon: "#custom-text-block",
      },
      {
        name: "Informe hr extras",
        path: "/InformeHorasExtras",
        icon: "#custom-mouse-circle",
      },
    ],
  };


  const Body = () => {
    return (
      <>
        <h1>CONTROL INTERNO / nomina</h1>
      </>
    );
  };

  const { ItemSider } = ItemSidder(creador);

  return (
    <>
      <SidebarProvider>
        <SidebarProviderMob>
          <SideMenu ItemSider={ItemSider} />
          <Header />
          <div className="pc-container">
            <div className="pc-content">
              <Body />
            </div>
          </div>
          <Footer />
        </SidebarProviderMob>
      </SidebarProvider>
    </>
  );
};

