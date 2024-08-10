import { useState } from "react";
import { RefrescarContext } from "./RefrescarContext";


export const RefrescarProvider = ({ children }) => {
    const [Refrescar1, setRefrescar1] = useState(0);


    return (
        <RefrescarContext.Provider value={{
            Refrescar1,
            setRefrescar1
        }}>
            {children}
        </RefrescarContext.Provider>
    );
}
