import { useEffect, useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll'
import { HiX, HiSearch, HiExternalLink, HiBackspace } from 'react-icons/hi'
import Loader from './Loader';
import Profile from './Profile'

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
    url: string | null
    captureList: string[]
    setCaptureList: (captureList: string[]) => void
}


const Main: React.FC<Props> = ({ initialPokemon, types, isLoading, setIsLoading, filteredPokemon, setFilteredPokemon, selectedType, setSelectedType, url, captureList, setCaptureList }) => {
    
    document.title = 'vabarnabas - PokéAPI'

    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');
    const [capturedOnly, setCapturedOnly] = useState<boolean>(false);

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

    const onXPressed = () => {
        setSelectedType('');
        setFilteredPokemon(initialPokemon);
        if (!showSearch) {
            setSearchString('');
        }
        setShowSearch(false);
        setCapturedOnly(false);
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            {url ? <Profile isLoading={isLoading} setIsLoading={(isLoading: boolean) => setIsLoading(isLoading)} url={url} captureList={captureList} setCaptureList={(captureList: string[]) => setCaptureList(captureList)} /> : ''}
            <div id='selection-div' className="w-full h-12 flex items-center justify-center border-b border-slate-200 text-slate-600 select-none px-6">
                <ScrollContainer className="w-full grid grid-flow-col gap-x-2">
                    {types.map(type => (
                        <p key={type.name} onClick={() => onTypeChange(type.url)} className={`capitalize px-1 py-0.5 text-sm font-semibold text-center rounded-full text-white cursor-pointer ${selectedType === type.url ? 'bg-blue-500' : 'bg-slate-400'}`}>{type.name}</p>
                    ))}
                </ScrollContainer>
                <div className='flex items-center justify-center ml-2 space-x-2'>
                    <div className="relative">
                        {showSearch ? <div className=" right-0 top-[175%] flex items-center justify-center w-max rounded-lg">
                            <div className="mr-1 flex items-center justify-center accent-blue-500 text-xs">
                                <input defaultChecked={capturedOnly} onChange={() => setCapturedOnly(!capturedOnly)} className='mr-1' aria-label="checkbox" type="checkbox" name="check" id="check" />
                                <label htmlFor="check">Catched Only</label>
                            </div>
                            <div className="relative flex items-center justify-center">
                                <input value={searchString} onChange={(e) => setSearchString(e.target.value)}  placeholder='Search Pokémon' type="text" aria-label="search" className='text-sm placeholder:text-sm pl-2 px-5 bg-transparent outline-none' />
                                <HiBackspace onClick={() => setSearchString('')} className='absolute right-0 cursor-pointer hover:text-blue-500' />
                            </div>
                        </div> : <HiSearch onClick={() => setShowSearch(!showSearch)} className='text-xl cursor-pointer hover:text-blue-500'/>}
                    </div>
                    <HiX onClick={() => onXPressed()} className='text-xl cursor-pointer hover:text-blue-500'/>
                </div>
            </div>
            {/* {isLoading ?
                <div className="w-full h-full flex items-center justify-center">
                    <Loader />
                </div>: */}
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 auto-rows-max select-none px-6 py-4 overflow-y-scroll scrollbar-hide">
                {filteredPokemon.filter(part => capturedOnly ? captureList.includes(part.pokemon.name) : true).filter(part => part.pokemon.name.includes(searchString.toLocaleLowerCase())).map(item => (
                    <div key={item.pokemon.name} className={`h-max flex items-center justify-between bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 ${captureList.includes(item.pokemon.name) ? 'border border-blue-500' : ''}`}>
                        <p className="font-bold text-blue-500 capitalize">{item.pokemon.name}</p>
                        <HiExternalLink onClick={() => {navigate({
                            search: `?${createSearchParams({url: item.pokemon.url})}`
                        });setIsLoading(true)}} className='text-lg cursor-pointer text-slate-600 hover:text-blue-500'/>
                    </div>
                ))}
            </div>
            {/* } */}
        </div>
    )
}

export default Main
