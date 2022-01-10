import { useState, useEffect } from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';

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

function App() {

  document.title = 'mindtech - PokéAPI'

  const [types, setTypes] = useState<PokeTypes[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [initialPokemon, setInitialPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('fetch')
    setIsLoading(true);
    fetch('https://pokeapi.co/api/v2/type')
    .then(res => res.json())
    .then(data => setTypes(data.results))

    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
    .then(res => res.json())
    .then(data => {
        let bufferArray:Pokemon[] = []
        data.results.forEach((item: {name: string, url: string}) =>
            {bufferArray.push({
                pokemon: {
                    name: item.name,
                    url: item.url
                },
                slot: 1
            })}
        )
        setInitialPokemon([...bufferArray])
    })
    .finally(() => setIsLoading(false))
  },[])

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="pt-12 w-full h-full">
        <Main initialPokemon={initialPokemon} types={types} isLoading={isLoading} setIsLoading={(isLoading: boolean) => setIsLoading(isLoading)} filteredPokemon={filteredPokemon} setFilteredPokemon={(filteredPokemon: Pokemon[]) => setFilteredPokemon(filteredPokemon)} selectedType={selectedType} setSelectedType={(selectedType: string) => setSelectedType(selectedType)}/>
      </div>
    </div>
  );
}

export default App;
