import { Skeleton } from "@/components/ui/skeleton"; // Importando Skeleton do shadcn
import { useProfile } from "./hooks/useProfile";
import ShowMetrics from "./ShowMetrics";

interface Username {
    username: string;
}

const ProfileShow = ({ username }:Username) => {

    const { data, isLoading, isError } = useProfile(username);

    if (isLoading) {
        return (
            <div className="flex w-full gap-6 bg-gray-800 rounded-xl p-6 mx-12">
                <Skeleton className="w-[200px] h-[200px] rounded-full" />
                <div className="flex flex-col gap-4">
                    <Skeleton className="w-40 h-6" />
                    <Skeleton className="w-72 h-32" />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex w-full gap-6 bg-gray-800 rounded-xl p-6 mx-12 min-m-[300px]">
                <div className="flex w-full justify-center  bg-red-900 text-white p-6 rounded-xl mx-12">
                    <p className="text-xl  font-bold">Erro ao carregar o perfil. Tente novamente mais tarde.</p>
                </div>
            </div >
        )
    }

    if (!data) return null

    return (
        <>
            <div className="flex w-full gap-6 bg-gray-800 rounded-xl p-6 mx-12 justify-start">
                <div className=" w-[200px] h-[200px]">
                    <img
                        src={data.avatar_url}
                        className="rounded-full border-4 border-gray-400"
                        width={200}
                        height={200}
                        alt="Avatar"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-blue-500 text-3xl font-bold">{data.name || "Usuário não encontrado"}</h1>
                    <p className="text-gray-200 text-xl">{data.bio || "Nenhuma bio disponível."}</p>
                </div>
            </div>
            <ShowMetrics username={username}/>
        </>
    );
};

export default ProfileShow;
