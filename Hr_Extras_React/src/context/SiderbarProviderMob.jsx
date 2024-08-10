import { useState } from "react";
import { SidebarContextMob } from "./SidebarContextMob";

export const SidebarProviderMob = ({ children }) => {
    const [isSidebarVisibleMob, setSidebarVisibleMob] = useState('');
  
    return (
      <SidebarContextMob.Provider value={{setSidebarVisibleMob, isSidebarVisibleMob}}>
        {children}
      </SidebarContextMob.Provider>
    );
  };