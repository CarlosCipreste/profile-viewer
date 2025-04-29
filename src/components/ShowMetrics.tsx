import { useRepos } from './hooks/useRepos';
import BarGraph from './BarGraph';
import PieGraph from './PieGraph';
import UserDetails from './UserDetails';

interface Username {
    username: string;
}

const ShowGraphs = ({ username }: Username) => {

    const { data, isLoading } = useRepos(username);



    return (
        <div className="flex flex-col xl:flex-row w-full gap-6 rounded-xl mx-12 justify-center">
            <div className="flex-1 flex-col w-full items-center bg-gray-800 border-2 text-center duration-700 hover:border-white border-transparent p-4 rounded-xl">
                <h1 className="text-white text-2xl font-bold text-center mb-6">Informações</h1>
                <UserDetails username={username} />
            </div>
            <div className="flex-1 justify-center items-center text-center bg-gray-800  duration-700 hover:border-white border-2 border-transparent p-4 rounded-xl">
                <PieGraph data={data} isLoading={isLoading} />
            </div>
            <div className="flex-2 justify-center items-center text-center bg-gray-800 duration-700 hover:border-white border-2 border-transparent  p-4 rounded-xl">
                <BarGraph data={data} isLoading={isLoading}/>
            </div>

        </div>
    )
}

export default ShowGraphs