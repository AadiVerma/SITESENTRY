import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
}
    from "chart.js";
ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
function BarChart({ ChartData }: any) {
    const options = {}
    return (
        <Bar className="" height={200} data={ChartData} options={options} />
    )
}
export default BarChart;