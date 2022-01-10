import { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { HiBan, HiSearch, HiExternalLink } from 'react-icons/hi'
import Loader from './Loader';

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

interface Props {
    initialPokemon: Pokemon[]
    types: PokeTypes[]
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
    filteredPokemon: Pokemon[]
    setFilteredPokemon: (filteredPokemon: Pokemon[]) => void
    selectedType: string
    setSelectedType: (selectedType: string) => void
}

const Main: React.FC<Props> = ({ initialPokemon, types, isLoading, setIsLoading, filteredPokemon, setFilteredPokemon, selectedType, setSelectedType }) => {
    
    useEffect(() => {
        if(filteredPokemon.length === 0) {
            setFilteredPokemon(initialPokemon)
        }
    },[filteredPokemon, initialPokemon, setFilteredPokemon, selectedType])

    const onTypeChange = (url: string) => {
        setIsLoading(true);
        setSelectedType(url);
        fetch(url)
        .then(res => res.json())
        .then(data => setFilteredPokemon([...data.pokemon]))
        .finally(() => setIsLoading(false))
    }

    const onTypeRemove = () => {
        setSelectedType('');
        setFilteredPokemon(initialPokemon);
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div id='selection-div' className="mb-auto w-full h-12 flex items-center justify-center border-b border-slate-200 text-slate-600  select-none px-6">
                <ScrollContainer className="w-full grid grid-flow-col gap-x-2">
                    {types.map(type => (
                        <p key={type.name} onClick={() => onTypeChange(type.url)} className={`capitalize px-1 py-0.5 text-sm font-semibold text-center rounded-full text-white cursor-pointer ${selectedType === type.url ? 'bg-blue-500' : 'bg-slate-400'}`}>{type.name}</p>
                    ))}
                </ScrollContainer>
                <div className='flex items-center justify-center ml-2 space-x-2'>
                    <HiBan onClick={() => onTypeRemove()} className='text-xl cursor-pointer hover:text-blue-500'/>
                    <HiSearch className='text-xl cursor-pointer hover:text-blue-500'/>
                </div>
            </div>
            {/* {isLoading ?
                <div className="w-full h-full flex items-center justify-center">
                    <Loader />
                </div>: */}
                <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 select-none px-6 py-4 overflow-y-scroll scrollbar-hide">
                {filteredPokemon.map(item => (
                    <div key={item.pokemon.name} className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-lg px-4 py-2">
                        <p className="font-bold text-blue-500 capitalize">{item.pokemon.name}</p>
                        <HiExternalLink onClick={() => {window.open(item.pokemon.url, '_blank')}} className='text-lg cursor-pointer text-slate-600 hover:text-blue-500'/>
                    </div>
                ))}
            </div>
            {/* } */}
        </div>
    )
}

export default Main
