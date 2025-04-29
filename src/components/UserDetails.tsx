import { BookMarked, type LucideIcon, PinIcon, SendToBack, SquareCode, UserPlus, UserRoundSearch, UsersRound } from "lucide-react"
import { useProfile } from "./hooks/useProfile"
import { Skeleton } from "./ui/skeleton"

// Definindo a interface para os itens do array
interface UserDetailItem {
    icon: LucideIcon
    bgColor: string
    borderColor: string
    iconColor: string
    dataKey: keyof UserData | string
    label: string
}

interface UserData {
    public_repos: number
    followers: number
    public_gists: number
    following: number
}

const UserDetails = ({ username }: { username: string }) => {
    const { data, isLoading } = useProfile(username)

    const detailItems: UserDetailItem[] = [
        {
            icon: BookMarked,
            bgColor: "bg-cyan-600",
            borderColor: "border-cyan-200",
            iconColor: "white",
            dataKey: "public_repos",
            label: "Repositórios",
        },
        {
            icon: UsersRound,
            bgColor: "bg-purple-300",
            borderColor: "border-purple-200",
            iconColor: "#404040",
            dataKey: "followers",
            label: "Seguidores",
        },
        {
            icon: SquareCode,
            bgColor: "bg-amber-300",
            borderColor: "border-amber-200",
            iconColor: "#404040",
            dataKey: "public_gists",
            label: "Gists",
        },
        {
            icon: UserPlus,
            bgColor: "bg-emerald-900",
            borderColor: "border-emerald-400",
            iconColor: "white",
            dataKey: "following",
            label: "Seguindo",
        },
    ]

    const renderDetailCard = (item: UserDetailItem, index: number) => {
        const Icon = item.icon
        const value = data?.[item.dataKey as keyof typeof data]

        return (
            <div
                key={index}
                className="flex xl:flex-col 2xl:flex-row w-full break-all p-2 gap-4 items-center border-3 border-gray-500 rounded-xl bg-gray-700"
            >
                <div className={`flex gap-2 items-center rounded-xl p-3 ${item.bgColor} border-2 ${item.borderColor}`}>
                    <Icon stroke={item.iconColor} width={19} height={26} enableBackground={"true"} />
                </div>
                <div className="flex flex-col">
                    <p className="">{value}</p>
                    <p className="lg:text-sm text-gray-200 font-medium">{item.label}</p>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex bg-gray-600 p-2 rounded-xl gap-4 items-center">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-6 w-full rounded-xl bg-gray-700" />
                    </div>
                    <div className="flex bg-gray-600 p-2 rounded-xl gap-4 items-center">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-6 w-full rounded-xl bg-gray-700" />
                    </div>
                    <div className="flex bg-gray-600 p-2 rounded-xl gap-4 items-center">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-6 w-full rounded-xl bg-gray-700" />
                    </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-2 text-white text-2xl font-bold mt-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex xl:flex-col 2xl:flex-row w-full break-all p-2 gap-4 items-center border-3 border-gray-500 rounded-xl bg-gray-700"
                        >
                            <Skeleton className="w-12 h-12 rounded-xl" />
                            <div className="flex flex-col w-full">
                                <Skeleton className="h-6 w-16 rounded-md" />
                                <Skeleton className="h-4 w-24 rounded-md mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    console.log(data)
    console.log(data?.company)
    console.log(data?.blog)

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex bg-gray-600 p-2 rounded-xl gap-4 items-center">
                    <PinIcon width={32} height={32} stroke="white" />
                    <p className="text-gray-300 text-xl rounded-xl bg-gray-700 w-full p-1">
                        {data?.location || "Indisponível"}
                    </p>
                </div>
                <div className="flex bg-gray-600 p-2 rounded-xl gap-4 items-center">
                    <UserRoundSearch width={32} height={32} stroke="white" />
                    <p className="text-gray-300 text-xl rounded-xl bg-gray-700 w-full p-1">
                        {data?.company || "Indisponível"}
                        
                    </p>
                </div>
                <div className="flex bg-gray-600 p-2 rounded-xl gap-4 items-center">
                <SendToBack  width={32} height={32} stroke="white" />
                    <p className="text-gray-300 text-xl rounded-xl bg-gray-700 w-full p-1">
                        {data?.blog || "Indisponível"}
                        
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 text-white text-2xl font-bold mt-6">
                {detailItems.map((item, index) => renderDetailCard(item, index))}
            </div>
        </div>
    )
}

export default UserDetails
