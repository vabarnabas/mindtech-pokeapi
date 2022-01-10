import { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { HiBan, HiSearch } from 'react-icons/hi'

interface PokeTypes {
    name: string
    url: string
}

interface Pokemon {
    pokemon: {
        name: string
        url: string
    }
    slot: number
}

const Main = () => {

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [types, setTypes] = useState<PokeTypes[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([])

    //Fetching Initial Data on First Render
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/type')
        .then(res => res.json())
        .then(data => setTypes(data.results))
    },[])

    //Fetching on Selection Change
    const onTypeClick = (url: string) => {
        setSelectedType(url);
        fetch(url)
        .then(res => res.json())
        .then(data => setFilteredPokemon([...data.pokemon]))
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div id='selection-div' className="w-full h-12 flex items-center justify-center border-b border-slate-200 text-slate-600  select-none px-6">
                <p className="font-semibold text-sm mr-2">Select Type(s):</p>
                <ScrollContainer className="w-full grid grid-flow-col gap-x-2">
                    {types.map(type => (
                        <p key={type.name} onClick={() => onTypeClick(type.url)} className={`px-1 py-0.5 text-sm font-semibold text-center rounded-full text-white cursor-pointer ${selectedType === type.url ? 'bg-blue-500' : 'bg-slate-400'}`}>{type.name}</p>
                    ))}
                </ScrollContainer>
                <div className='flex items-center justify-center ml-2 space-x-2'>
                    <HiBan onClick={() => setSelectedType('')} className='text-xl cursor-pointer hover:text-blue-500'/>
                    <HiSearch className='text-xl cursor-pointer hover:text-blue-500'/>
                </div>
            </div>
            <div className="h-full w-full grid grid-cols-5 gap-2 select-none px-6 py-4 overflow-y-scroll">

                {filteredPokemon.map(item => (
                    <div className="bg-slate-100 border border-slate-200 rounded-lg px-4 py-2">
                        <p className="font-bold text-blue-500 capitalize">{item.pokemon.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main
