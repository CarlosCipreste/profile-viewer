import { BookMarked, type LucideIcon, SquareCode, UserPlus, UsersRound } from "lucide-react"
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

  // Array com as informações de cada card
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
          <Icon stroke={item.iconColor} width={32} height={32} enableBackground={"true"} />
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
      <div className="flex flex-col w-full h-full justify-center gap-6 bg-gray-800 rounded-xl p-6 mx-12">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 text-white text-2xl font-bold">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex xl:flex-col 2xl:flex-row w-full break-all p-2 gap-4 items-center border-3 border-gray-500 rounded-xl bg-gray-700"
              >
                <Skeleton className="h-14 w-14 rounded-xl" />
                <div className="flex flex-col w-full">
                  <Skeleton className="h-6 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full justify-center gap-6 bg-gray-800 rounded-xl p-6 mx-12">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 text-white text-2xl font-bold">
        {detailItems.map((item, index) => renderDetailCard(item, index))}
      </div>
    </div>
  )
}

export default UserDetails
