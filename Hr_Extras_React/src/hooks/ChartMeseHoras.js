import { useEffect, useState } from "react";

export const ChartMeseHoras = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });


    // Simulación de una llamada a la API para obtener datos
    const fetchData = async () => {
        // Suponiendo que la respuesta de la API tiene la estructura { label: "Votes", values: [12, 19, 3, 5, 2, 3] }
        const data = { label: "Dinero", values: [1800000, 9000000, 34334343, 5555555, 24343434, 3222232, 6646464, 4552354, 3433556, 254464, 56356547, 34576346] }
        setChartData({
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: data.label,
                    data: data.values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        });
    };


    useEffect(() => {
        fetchData();
    }, [])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                /*text: 'Gráfico de Barras por Mes',*/
            },
        },
    };

    return { chartData, options }
}
