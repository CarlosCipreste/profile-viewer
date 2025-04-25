import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { RepoItem } from '../models/RepoItem';

export const useRepos = (username: string) => {
    return useQuery({
        queryKey: ['github-repos', username],
        queryFn: async () => {
            const { data } = await axios.get<RepoItem[]>(`https://api.github.com/users/${username}/repos?per_page=100`);
            return data;
        },
        enabled: !!username
    });
};
