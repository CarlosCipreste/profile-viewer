import { useRepos } from './hooks/useRepos';
import BarGraph from './BarGraph';
import PieGraph from './PieGraph';
import UserDetails from './UserDetails';
import { RepoItem } from './models/RepoItem';

interface Username {
    username: string;
}

const ShowGraphs = ({ username } : Username) => {

    const {data} : {data?: RepoItem[]} = useRepos(username);

    return (
        <div className="flex flex-col xl:flex-row h-fit  w-full gap-6  rounded-xl mx-12 justify-center">
            <div className="w-full flex flex-col items-center bg-gray-800 border-2 border-gray-600 p-4 rounded-xl">
                <h1 className="text-white text-2xl font-bold">Informações</h1>
                <UserDetails username={username} />
            </div>
            <div className="w-full flex flex-col justify-center items-center bg-gray-800 border-2 border-gray-600 p-4 rounded-xl">
                <h1 className="text-white text-2xl font-bold">Linguagens mais usadas</h1>
                <PieGraph data={data} />
            </div>
            <div className="w-full flex flex-col justify-center items-center bg-gray-800 border-2 border-gray-600 p-4 rounded-xl">
                <h1 className="text-white text-2xl font-bold">Repositórios Estrelados</h1>
                <BarGraph data={data} />
            </div>

        </div>
    )
}

export default ShowGraphs