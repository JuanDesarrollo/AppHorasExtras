import { useState } from "react";
import { ModificarHrContext } from "./ModificarHrContext";

export const ModificarHrProvider = ({ children }) => {
    const [nominaHrModifi, setnominaHrModifi] = useState(0);
    return (
        <ModificarHrContext.Provider value={{ nominaHrModifi, setnominaHrModifi }}>
            {children}
        </ModificarHrContext.Provider>
    );
};