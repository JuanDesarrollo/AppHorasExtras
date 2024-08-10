import { useState } from "react";
import { CurrentCutContext } from "./CurrentCutContext";

export const CurrentCutProvider = ({ children }) => {
    const [corteActual, setCorteActual] = useState({
        fechaI: "",
        fechaF: "",
        nombreCorte: "",
        id: ""
    });
    return (
        <CurrentCutContext.Provider value={{ corteActual, setCorteActual }} >
            {children}
        </CurrentCutContext.Provider>
    )
};
