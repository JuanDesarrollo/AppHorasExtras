import { useState } from "react";
import { RefrescarContext2 } from "./RefrescarContext2";


export const RefrescarProvider2 = ({ children }) => {
    const [Refrescar2, setRefrescar2] = useState(0);

    return (
        <RefrescarContext2.Provider value={{
            Refrescar2, setRefrescar2
        }}>
            {children}
        </RefrescarContext2.Provider>
    );
}
