import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { RepoItem } from './models/RepoItem';



const generateColors = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
        const hue = Math.round((360 / count) * i);
        return `hsl(${hue}, 70%, 60%)`;
    });
};



const PieGraph = ({ data }: { data?: RepoItem[] }) => {

    const languageCount: Record<string, number> = {};
    if (data) {
        data?.forEach(repo => {
            const lang = repo.language || 'Outros';
            languageCount[lang] = (languageCount[lang] || 0) + 1;
        });
    }

    const values = Object.entries(languageCount).map(([name, value]) => ({
        name,
        value,
    }));
    const COLORS = generateColors(values.length);

    return (
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={values}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        dataKey="value"
                    >
                        {values.map((_,index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};


export default PieGraph;
