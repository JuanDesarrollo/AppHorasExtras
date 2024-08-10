import { useState } from "react";
import { DeleteEmployeeHrContext } from "./DeleteEmployeeHrContext";

export const DeleteEmployeeHrProvider = ({ children }) => {
    const [eliminarHr, setEliminarHr] = useState(0);

    return (
        <DeleteEmployeeHrContext.Provider value={{ setEliminarHr, eliminarHr }}>
            {children}
        </DeleteEmployeeHrContext.Provider>
    );
};