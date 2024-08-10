import { useState } from "react";
import { SidebarContext } from "./SidebarContext";

export const SidebarProvider = ({ children }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
  
    const toggleSidebar = () => {
      setSidebarVisible(!isSidebarVisible);
    };
    
  
    return (
      <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
        {children}
      </SidebarContext.Provider>
    );
  };