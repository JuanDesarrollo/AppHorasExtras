import { useState } from "react";
import { DeleteAddConext } from "./DeleteAddConext";

export const DeleteAddProvider = ({ children }) => {
    const [deleteAdd, setDeleteAdd] = useState(0);

    return (
        <DeleteAddConext.Provider value={{ deleteAdd, setDeleteAdd }}>
            {children}
        </DeleteAddConext.Provider>
    );
};