import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,

    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { RepoItem } from './models/RepoItem';
import { Skeleton } from "@/components/ui/skeleton"

const BarGraph = ({ data, isLoading }: { data?: RepoItem[], isLoading: boolean }) => {

    if (isLoading) {
        return (
            <Card className="bg-gray-800 dark border-0">
                <CardHeader>
                    <CardTitle>Estrelas por Repositórios</CardTitle>
                    <CardDescription>Gráfico de Barra</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    const chartData = data?.map((data, index) => ({
        name: data.name,
        stars: data.stargazers_count,
        fill: `hsl(var(--chart-${(index % 5) + 1}))`
    })).sort((a, b) => b.stars - a.stars)
        .slice(0, 5);

    const chartConfig: ChartConfig = {}
    chartData?.forEach((item) => {
        const key = item.name.toLowerCase().replace(/\s+/g, "_")
        chartConfig[key] = {
            label: item.name,
        }
    })


    return (
        <Card className="bg-gray-800 dark border-0">
            <CardHeader>
                <CardTitle>Estrelas por Repositórios</CardTitle>
                <CardDescription>Gráfico de Barra</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] h-full min-w-[200px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 60,
                            left: 80,
                        }}


                    >
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                String(chartConfig[value as keyof typeof chartConfig]?.label ?? value)
                            }
                        />
                        <XAxis dataKey="stars" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="stars" layout="vertical" radius={5}>
                            <LabelList
                                dataKey="stars"
                                position="right"
                                offset={8}
                                className="fill-foreground font-medium"
                                fontSize={16}
                            />
                        </Bar>

                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
}

export default BarGraph
