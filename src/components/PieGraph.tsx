"use client"

import { Pie, PieChart } from "recharts"
import type { RepoItem } from "./models/RepoItem"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "./ui/skeleton"

const PieGraph = ({ data, isLoading }: { data?: RepoItem[], isLoading: boolean }) => {

    if (isLoading) {
        return (
            <Card className="flex flex-col dark bg-gray-800 border-0">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Linguagens de Repositórios</CardTitle>
                    <CardDescription>Gráfico de Torta</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <div className="mx-auto aspect-square min-h-[200px] flex items-center justify-center">
                        <Skeleton className="w-full h-full" />
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none text-white text-center">
                        Carregando dados...
                    </div>
                </CardFooter>
            </Card>
        )
    }

    const languageCount: Record<string, number> = {}
    if (data) {
        data.forEach((repo) => {
            const lang = repo.language || "Outros"
            languageCount[lang] = (languageCount[lang] || 0) + 1
        })
    }

    const MAX_LANGUAGES = 6

    const sortedLanguages = Object.entries(languageCount).sort((a, b) => b[1] - a[1])

    const topLanguages = sortedLanguages.slice(0, MAX_LANGUAGES)
    const otherLanguages = sortedLanguages.slice(MAX_LANGUAGES)

    const limitedLanguageCount: Record<string, number> = {}


    topLanguages.forEach(([lang, count]) => {
        limitedLanguageCount[lang] = count
    })

    if (otherLanguages.length > 0) {
        const otherCount = otherLanguages.reduce((sum, [, count]) => sum + count, 0)
        
        if (limitedLanguageCount["Outros"]) {
            limitedLanguageCount["Outros"] += otherCount
        } else {
            limitedLanguageCount["Outros"] = otherCount
        }
    }

    // Create chart config
    const chartConfig: ChartConfig = {}
    Object.keys(limitedLanguageCount).forEach((lang, index) => {
        const key = lang.toLowerCase().replace(/\s+/g, "_")
        chartConfig[key] = {
            label: lang,
            color: `hsl(var(--chart-${(index % 5) + 1}))`,
        }
    })

    // Create chart data
    const chartData = Object.entries(limitedLanguageCount).map(([name, value], index) => {
        const key = name.toLowerCase().replace(/\s+/g, "_")
        return {
            language: key,
            count: value,
            fill: `hsl(var(--chart-${(index % 5) + 1}))`,
        }
    })

    return (
        <Card className="flex flex-col dark bg-gray-800 border-0">
            <CardHeader className="items-center pb-0">
                <CardTitle>Linguagens de Repositórios</CardTitle>
                <CardDescription>Gráfico de Torta</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square min-h-[200px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie data={chartData} dataKey="count" nameKey="language" strokeWidth={2} label />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="language" />}
                            className="text-white -translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none text-white text-center">
                    Quantidade de Repositorios que usam cada linguagem
                </div>
            </CardFooter>
        </Card>
    )
}

export default PieGraph
