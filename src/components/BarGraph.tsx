import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts'
import { RepoItem } from './models/RepoItem';

const BarGraph = ({ data } : {data?: RepoItem[]}) => {

    const transformedData = data?.map(data => ({
        name: data.name,
        stars: data.stargazers_count
    })).sort((a, b) => b.stars - a.stars)
        .slice(0, 5);



    return (
        <BarChart
            width={600}
            height={350}
            data={transformedData}
            margin={{ top: 30, right: 0, bottom: 40, left: 0 }}
            reverseStackOrder={false}
        >
            <XAxis
                dataKey="name"
                tick={{ textAnchor: "end" }}
                angle={-20}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stars" fill="#8884d8" />
        </BarChart>
    )
}

export default BarGraph
