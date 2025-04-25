import { useQuery } from "@tanstack/react-query"
import axios from "axios";

type GithubUser = {
    login: string;
    name: string;
    id: number;
    bio: string
    avatar_url: string;
    html_url: string;
    followers: number;
    following: number;
    public_repos: number;
    public_gists:number;
}

export const useProfile = (username:string) => {
  return useQuery({
    queryKey: ['github-user', username],
    queryFn: async () => {
        const {data} = await axios.get<GithubUser>(`https://api.github.com/users/${username}`);
        return data
    },
    enabled: !!username
  })
}
