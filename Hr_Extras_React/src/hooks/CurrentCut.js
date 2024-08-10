import { useEffect, useState } from "react";
import { sendRequest } from "./functions"
import { useContext } from "react";
import { CurrentCutContext } from "../context/CurrentCutContext";


export const CurrentCut = () => {
    const [corteName, setCortName] = useState({
        datos: null
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { corteActual, setCorteActual } = useContext(CurrentCutContext);


    const consultar = async () => {
        try {
            const rest = await sendRequest('GET', '', '/api/current_cut', '', true);
            if (rest.data[0] != []) {
                setCortName({ datos: rest.data[0] });
                setCorteActual({...corteActual, 
                    fechaI: rest.data[0].date_i,
                    fechaF: rest.data[0].date_f,
                    nombreCorte: rest.data[0].name,
                    id: rest.data[0].id
                });
            }
        } catch (error) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (corteName.data !== null) {
            consultar();
        }
    }, []);


    return { corteName, loading, error };
};