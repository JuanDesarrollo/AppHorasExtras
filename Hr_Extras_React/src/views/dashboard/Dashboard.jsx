import React from "react";
import { SideMenu } from "../../components/SideMenu";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SidebarProvider } from "../../context/SidebarProvider";
import { SidebarProviderMob } from "../../context/SiderbarProviderMob";

export const Dashboard = () => {
  return (
    <>
      <SidebarProvider>
        <SidebarProviderMob>
          <SideMenu/>
          <Header/>
          <div className="pc-container">
           <div className="pc-content">
            
           </div>
          </div>
          <Footer />
        </SidebarProviderMob>
      </SidebarProvider>
    </>
  );
};
