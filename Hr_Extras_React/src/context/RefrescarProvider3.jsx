import { useState } from "react";
import { RefrescarContext3 } from "./RefrescarContext3";


export const RefrescarProvider3 = ({ children }) => {
    const [Refrescar3, setRefrescar3] = useState(0);

    return (
        <RefrescarContext3.Provider value={{
            Refrescar3, setRefrescar3
        }}>
            {children}
        </RefrescarContext3.Provider>
    );
}
