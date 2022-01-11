//Packages
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
//Interfaces
import { PokeData } from './interfaces'
import { HiX } from 'react-icons/hi';
//Packages
import Loader from './Loader';

interface Props {
    url: string | null
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
    captureList: string[]
    setCaptureList: (captureList: string[]) => void
}

const Profile: React.FC<Props> = ({ url, isLoading, setIsLoading, captureList, setCaptureList }) => {

    const [responseData, setResponseData] = useState<PokeData>({
        name: '',
        weight: 0,
        height: 0,
        id: 0,
        sprites: {
            back_default: '',
            back_shiny: '',
            front_default: '',
            front_shiny: '',
        },
        abilities: [{
            ability: {
                name: '',
                url: '',
            },
            is_hidden: false,
            slot: 0
        }]
    });

    const [loadedImages, setLoadedImages] = useState(0)

    useEffect(() => {
        if (url) {
            fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                  } else {
                    throw new Error('profile-card');
                  }
            })
            .then(data => setResponseData(data))
            .finally(() => setIsLoading(false))

        }
    },[setIsLoading, url])

    const onCatch = () => {
        let baseArray: string[] = JSON.parse(localStorage.getItem('capturedPokemon') || '[]');
        baseArray.push(responseData.name);
        localStorage.setItem('capturedPokemon', JSON.stringify(baseArray));
        setCaptureList(baseArray);
    }

    const onRelease = () => {
        let baseArray: string[] = JSON.parse(localStorage.getItem('capturedPokemon') || '[]');
        baseArray.splice(baseArray.indexOf(responseData.name), 1)
        localStorage.setItem('capturedPokemon', JSON.stringify(baseArray));
        setCaptureList(baseArray);
    }

    return (
        <div className='z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-slate-600 bg-opacity-70 px-6'>
            {isLoading ? <Loader /> : <div className={`relative gap-4 place-content-center place-items-center grid grid-cols-2 select-none bg-slate-100 border border-slate-200 rounded-lg pb-4 px-10 ${captureList.includes(responseData.name) ? 'border-2 border-blue-500' : ''}`}>
                <Link to='/'>
                    <HiX className='absolute right-3 top-3 cursor-pointer text-slate-600 hover:text-blue-500'/>
                </Link>
                <div className="col-span-2 flex flex-col items-center justify-center">
                    <p className="capitalize font-bold text-2xl text-blue-500">{responseData.name}</p>
                    <p className="capitalize text-xs text-slate-600">{'Weight: ' + (responseData.weight)/10 + 'kg'}</p>
                    <p className="capitalize text-xs text-slate-600">{'Height: ' + (responseData.height)/10 + 'm'}</p>
                </div>
                <div className="relative grid grid-cols-2 col-span-2 place-items-center">
                    <div className={`p-6 col-span-2 row-span-2 aspect-square ${loadedImages === 4 ? 'hidden' : 'block'}`}>
                        <Loader/>
                    </div>
                    <img onLoad={() => setLoadedImages(loadedImages+1)} src={responseData.sprites.front_default} alt="" className={`aspect-square ${loadedImages !== 4 ? 'hidden' : 'block'}`} />
                    <img onLoad={() => setLoadedImages(loadedImages+1)} src={responseData.sprites.front_shiny} alt="" className={`aspect-square ${loadedImages !== 4 ? 'hidden' : 'block'}`} />
                    <img onLoad={() => setLoadedImages(loadedImages+1)} src={responseData.sprites.back_default} alt="" className={`aspect-square ${loadedImages !== 4 ? 'hidden' : 'block'}`} />
                    <img onLoad={() => setLoadedImages(loadedImages+1)} src={responseData.sprites.back_shiny} alt="" className={`aspect-square ${loadedImages !== 4 ? 'hidden' : 'block'}`} />
                </div>
                <div className="w-full flex items-center justify-center space-x-4 col-span-2">
                    {responseData.abilities.filter((item: any) => item.is_hidden !== true).map((item: any) => (
                        <div key={item.ability.name} className="h-max flex items-center justify-between bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg px-4 py-1">
                            <p className="text-sm font-bold text-blue-500 capitalize">{item.ability.name}</p>
                        </div>
                    ))}
                </div>
                {captureList.includes(responseData.name) ? 
                <button onClick={onRelease} className='col-span-2 text-white bg-slate-500 hover:bg-rose-500 w-full rounded-lg py-0.5'>Release</button> :
                <button onClick={onCatch} className='col-span-2 text-white bg-blue-500 hover:bg-blue-600 w-full rounded-lg py-0.5'>Catch</button>
                }
            </div>}
        </div>
    )
}

export default Profile
