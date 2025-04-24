import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Tipagem básica para um repositório do GitHub
export type Repo = {
    id: number;
    name: string;
    html_url: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
};

// Função de fetch
const fetchRepos = async (username: string): Promise<Repo[]> => {
    const { data } = await axios.get<Repo[]>(`https://api.github.com/users/${username}/repos?per_page=100`);
    return data;
};

// Hook que recebe o username como parâmetro
export const useRepos = (username: string) => {
    return useQuery({
        queryKey: ['repos', username],
        queryFn: () => fetchRepos(username),
        enabled: !!username, // evita o fetch se username for vazio
    });
};
