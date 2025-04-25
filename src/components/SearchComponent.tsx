import { useState } from "react";

interface SearchComponentProps {
    onSearch: (login: string) => void; // <-- define a função que será chamada ao buscar
}

const SearchComponent = ({ onSearch }: SearchComponentProps) => {
    const [login, setLogin] = useState("");

    const handleSearch = () => {
        if (login.trim()) {
            onSearch(login); // <-- chama a função recebida por props
        }
    };

    return (
        <div className='bg-gradient-to-br w-full from-blue-900 to-cyan-900 p-6 flex rounded-2xl outline-gray-500 focus-within:outline-2 focus-within:outline-white transition-all'>
            <input
                type="text"
                placeholder='Escreva um login de Usuário'
                className='text-bold text-xl bg-white p-4 placeholder-black rounded-l-2xl w-full outline-0'
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
                onClick={handleSearch}
                className='bg-blue-600 p-4 rounded-r-2xl cursor-pointer hover:bg-blue-700 active:bg-blue-400 focus:outline-white transition-all'
            >
                <img src="search.svg" alt="" width={48} />
            </button>
        </div>
    );
};

export default SearchComponent;