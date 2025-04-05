import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpStatusCode } from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface ProfileContextType {
    login: string;
    name: string,
    avatar_url: string;
    bio: string;
    fetchUsuario: (name: string) => void
    isLoading: boolean
    isError: boolean
}

interface ProfileInterface {
    login: string,
    name: string,
    avatar_url: string,
    bio: string
}

const ProfileContext = createContext<ProfileContextType | null>(null);

type ContextProviderProps = {
    children?: ReactNode;
};

export const ProfileProvider = ({ children }: ContextProviderProps) => {
    const [login, setLogin] = useState("");
    const [name, setName] = useState("")
    const [avatar_url, setAvatarUrl] = useState("");
    const [bio, setBio] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const APIUrl: string = "https://api.github.com/users/"

    const fetchUsuario = async (login: string) => {
        setIsLoading(true)
        setIsError(false)
        
        await axios.get(`${APIUrl}${login}`)
            .then((response: AxiosResponse) => {
                setIsLoading(true);
                const { login, name, avatar_url, bio }: ProfileInterface = response.data;
                setLogin(login)
                setName(name);
                setAvatarUrl(avatar_url)
                setBio(bio || "Sem biografia")

            })
            .catch((error: AxiosError) => {
                if (error.response?.status === HttpStatusCode.NotFound) {
                    setTimeout(() => setIsError(true), 1200) // para o loading ficar mais aparente
                }
            })
            .finally(() => {
                setTimeout(() => setIsLoading(false), 1200) // para o loading ficar mais aparente
            }
            )
    }

    return (
        <ProfileContext.Provider value={{ login, name, avatar_url, bio, fetchUsuario, isLoading, isError }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile deve ser usado dentro de um ProfileProvider");
    }
    return context;
};
