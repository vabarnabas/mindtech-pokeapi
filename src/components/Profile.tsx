import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Profile = () => {

    const [query, setQuery] = useSearchParams();
    //Change Any
    const [responseData, setResponseData] = useState<any>({})

    useEffect(() => {
        const url  = query.get('url')
        fetch(url || '')
        .then(res => res.json())
        .then(data => setResponseData(data))
    },[query])

    const onCatch = () => {
        
    }

    return (
        <div className='w-full h-full grid gap-4 grid-cols-1 sm:grid-cols-2 auto-rows-max px-6 py-4 overflow-y-scroll scrollbar-hide'>
            <div className="gap-4 place-content-center place-items-center grid grid-cols-2 select-none bg-slate-100 border border-slate-200 rounded-lg py-4 px-4">
                <div className="col-span-2 flex flex-col items-center justify-center">
                    <p className="capitalize font-bold text-2xl text-blue-500">{responseData?.name}</p>
                    <p className="capitalize text-xs text-slate-600">{'Weight: ' + (responseData?.weight)/10 + 'kg'}</p>
                    <p className="capitalize text-xs text-slate-600">{'Height: ' + (responseData?.height)/10 + 'm'}</p>
                </div>
                <img src={responseData?.sprites?.back_default} alt="" className="aspect-square" />
                <img src={responseData?.sprites?.back_shiny} alt="" className="aspect-square" />
                <img src={responseData?.sprites?.front_default} alt="" className="aspect-square" />
                <img src={responseData?.sprites?.front_shiny} alt="" className="aspect-square" />
                <button className='col-span-2 text-white bg-blue-500 hover:bg-blue-600 w-full rounded-full py-0.5'>Catch</button>
            </div>
            <div className="grid grid-cols-1 auto-rows-max gap-4 overflow-y-scroll scrollbar-hide select-none">
                {responseData?.abilities?.filter((item: any) => item?.is_hidden !== true).map((item: any) => (
                    <div key={item?.ability?.name} className="h-max flex items-center justify-between bg-slate-100 border border-slate-200 rounded-lg px-4 py-2">
                        <p className="font-bold text-blue-500 capitalize">{item?.ability?.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile
