import { useProfile } from "./ProfileContext";
import { Skeleton } from "@/components/ui/skeleton"; // Importando Skeleton do shadcn

const ProfileShow = () => {
    const { name, avatar_url, bio, isLoading, isError } = useProfile();

    if (isError) {
        return (
            <div className="flex w-full gap-6 bg-gray-800 rounded-xl p-6 mx-12 min-m-[300px]">
                <div className="flex w-full justify-center  bg-red-900 text-white p-6 rounded-xl mx-12">
                    <p className="text-xl  font-bold">Erro ao carregar o perfil. Tente novamente mais tarde.</p>
                </div>
            </div >
        )
    }

    if (!name) {
        return (
            ""
        )
    }

    return (
        <div className="flex w-full gap-6 bg-gray-800 rounded-xl p-6 mx-12">


            {isLoading ? (
                <Skeleton className="w-[200px] h-[200px] rounded-full" />
            ) : (
                <img
                    src={avatar_url}
                    className="rounded-full border-2 border-cyan-800"
                    width={200}
                    height={200}
                    alt="Avatar"
                />
            )}

            <div className="flex flex-col gap-4">
                {isLoading ? (
                    <>
                        <Skeleton className="w-40 h-6" />
                        <Skeleton className="w-72 h-32" />
                    </>
                ) : (
                    <>
                        <h1 className="text-blue-600 text-3xl font-bold">{name || "Usuário não encontrado"}</h1>
                        <p className="text-gray-200 text-xl">{bio || "Nenhuma bio disponível."}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileShow;
