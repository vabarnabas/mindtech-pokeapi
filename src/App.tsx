//Packages
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
//Interfaces
import { PokeTypes, Pokemon } from './components/interfaces';
//Components
import Main from './components/Main';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

const App:React.FC = () => {

  document.title = 'vabarnabas - PokéAPI'

  const navigate = useNavigate(); 
  const [query] = useSearchParams();
  const [url, setUrl] = useState<string | null>(query.get('url'));
  const [captureList, setCaptureList] = useState<string[]>(JSON.parse(localStorage.getItem('capturedPokemon') || '[]'));
  const [types, setTypes] = useState<PokeTypes[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [initialPokemon, setInitialPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://pokeapi.co/api/v2/type')
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('type-list');
      }
    })
    .then(data => setTypes(data.results))
    .catch(err => console.log(err))

    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('initial-list');
      }
    })
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
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false))
  },[])

  useEffect(() => {
    setUrl(query.get('url'))
  },[navigate, query])

  return (
    <div className="w-screen h-screen overflow-hidden">
      {url ? <Profile isLoading={isLoading} setIsLoading={(isLoading: boolean) => setIsLoading(isLoading)} url={url} captureList={captureList} setCaptureList={(captureList: string[]) => setCaptureList(captureList)} /> : ''}
      <Navbar />
      <div className="pt-12 w-full h-full">
          <Main initialPokemon={initialPokemon} types={types} isLoading={isLoading} setIsLoading={(isLoading: boolean) => setIsLoading(isLoading)} filteredPokemon={filteredPokemon} setFilteredPokemon={(filteredPokemon: Pokemon[]) => setFilteredPokemon(filteredPokemon)} selectedType={selectedType} setSelectedType={(selectedType: string) => setSelectedType(selectedType)} url={url} captureList={captureList} setCaptureList={(captureList: string[]) => setCaptureList(captureList)} />
      </div>
    </div>
  );
}

export default App;
