import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import ProfileShow from './components/ProfileShow'
import SearchComponent from './components/SearchComponent'
import { useState } from 'react'
function App() {

    const [username, setUsername] = useState('');

    return (
        <QueryClientProvider client={new QueryClient()}>
            <div className='min-h-screen flex justify-center items-center bg-gray-900'>

                <div className='container mx-auto my-5 flex flex-col items-center gap-6 min-w-[700px]'>
                    <div className='flex items-center'>
                        <img src="github.svg" alt="" width={64} />
                        <h1 className='text-6xl text-white'>Perfil <strong>Github</strong></h1>
                    </div>
                    <SearchComponent onSearch={setUsername} />
                    <ProfileShow username={username} />

                    
                </div>
            </div>
        </QueryClientProvider>
    )
}

export default App
