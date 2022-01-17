//Packages
import { menuItem } from '../../interfaces/interfaces'

const Navbar = () => {

    const menuItems: menuItem[] = [
        {
            name: 'Documentation',
            url: 'https://github.com/vabarnabas/pokeapi',
        },
    ]

    return (
        <div className='fixed top-0 left0 w-full h-12 border-b bg-white border-slate-200 text-slate-600 px-6 flex items-center justify-center'>
            <p className="mr-auto font-bold cursor-pointer select-none"><span className='text-blue-500'>vabarnabas</span> PokéAPI</p>
            <div className="ml-auto flex items-center justify-center space-x-6">
                {menuItems.map(item => (
                    <p key={item.name} onClick={() => {
                        if (item.url) window.open(item.url, '_blank')
                    }} className="cursor-pointer text-sm font-semibold hover:text-blue-500">{item.name}</p>
                ))}
            </div>
        </div>
    )
}

export default Navbar
