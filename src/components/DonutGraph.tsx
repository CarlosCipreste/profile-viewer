import { ChartData } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useRepos } from "./hooks/useRepos";

const generateColors = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
        const matiz = Math.round((360 / count) * i);
        return `hsl(${matiz}, 80%, 55%)`;
    })
}

const DonutGraph = () => {

    const { data, isLoading, isError } = useRepos('DennisBozzi')

    ChartJS.register(ArcElement, Tooltip, Legend);

    const languageCount: Record<string, number> = {};

    data?.forEach((repo) => {
        const lang = repo.language || 'Outros';
        languageCount[lang] = (languageCount[lang] || 0) + 1;
    })

    const labels = Object.keys(languageCount);
    const colors = generateColors(labels.length);
    const values = Object.values(languageCount);
    const borderColors = colors.map(c => c.replace('55%', '30%'));

    const chart: ChartData<"doughnut"> = {
        labels,
        datasets: [
            {
                label: 'Dataset',
                data: values,
                backgroundColor: colors,
                borderColor: borderColors
            }
        ],
    }

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Erro ao buscar repositórios.</p>;

    return (
        <div>
            <Doughnut data={chart} />
        </div>
    )
}

export default DonutGraph