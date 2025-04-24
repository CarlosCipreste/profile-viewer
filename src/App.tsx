import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import DonutGraph from './components/DonutGraph'
import { ProfileProvider } from './components/ProfileContext'
import ProfileShow from './components/ProfileShow'
import SearchComponent from './components/SearchComponent'

function App() {

    return (
        <div className='h-screen flex justify-center items-center bg-gray-900'>

            <div className='flex flex-col items-center gap-6 min-w-[700px]'>
                <div className='flex items-center'>
                    <img src="github.svg" alt="" width={64} />
                    <h1 className='text-6xl text-white'>Perfil <strong>Github</strong></h1>
                </div>
                <ProfileProvider>
                    <SearchComponent />
                    <ProfileShow />
                </ProfileProvider>
                <QueryClientProvider client={new QueryClient()}>
                <DonutGraph />
                </QueryClientProvider>
            </div>

        </div>
    )
}

export default App
