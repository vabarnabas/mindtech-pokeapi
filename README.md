# vabarnabas - pokéAPI

## Executive Summary

This project is powered by [pokeAPI](https://pokeapi.co/), a public REST API which is used to get data about different Pokémon.

The goals of this project were the followings:

- List every Pokemon by default ✓
- List the different types of Pokemon ✓
- When one of these types are selected filter the list to only Pokemon with that specific type ✓
- When selecting a Pokemon, open a profile card, which shows the Pokemon's name, weight, height, default and shiny sprites, and not hidden abilities ✓
- On the profile card show a button, which let's users catch that specific Pokemon, and adds it to a list ✓
- If the Pokemon is already captured, change the button to release ✓
- When a Pokemon is captured show an indication on the profile card and on the main list as well ✓
- Provide navigation on the page ✓
- Show a loader, when fetching data ✗
*(fetching data on the main list can be so fast, that using it would cause more problems than removing it)*

## Setup

In case of cloning/forking this directory the setup is pretty easy.
To clone write the followind in a terminal:

```zsh
git clone https://github.com/vabarnabas/pokeapi.git
```

After cloning use `npm install` or `yarn add` to install the packages then just run `npm start` or `yarn start` in a terminal, and the page will load on *localhost:3000*.

*sidenote: if you want to clone to a specific directory use this code instead:*

```zsh
git clone https://github.com/vabarnabas/pokeapi.git selected-directory
```

## API Usage

As aforementioned this project uses [pokeAPI](https://pokeapi.co/), which means that a full documentation is already on their website, but the different endpoints used in this project will be mentioned briefly.

```
GET https://pokeapi.co/api/v2/type
```
This endpoint is used to every Pokemon type's name and endpoint URL.

```
GET https://pokeapi.co/api/v2/pokemon?limit=2000
```
This endpoint is used to get every Pokemon's name and endpoint URL.

```
GET https://pokeapi.co/api/v2/type/{id or name}
```
This endpoint is used to get a specific type.

```
GET https://pokeapi.co/api/v2/pokemon/{id or name}
```
This endpoint is used to get a specific Pokemon.

## Used Technologies

This project is based on the CRA (Create React App) Typescript template.

```zsh
npx create-react-app app-name --template typescript
```

Besides that, the following technologies or packages were included:

- [TailwindCSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind Scrollbar Hide](https://www.npmjs.com/package/tailwind-scrollbar-hide)
- [React Router](https://www.npmjs.com/package/react-router-dom)
- [Github Pages](https://www.npmjs.com/package/gh-pages)

## Functions

### onXPressed

> `onXPressed() => void`

**Description:**
onXPressed is used for hiding the search bar on the first click, and removing any filtering on the second.

**Parameters:**

**Return:**

### onTypeChange

> `onTypeChange(url: string) => void`

**Description:**
onTypeChange is used for fetching every Pokemon of a certain type.

**Parameters:**
`url: string`

**Return:**

### onCatch

> `onCatch() => void`

**Description:**
onCatch is used for adding a Pokemon to a the capture list, and saving the list to localStorage.

**Parameters:**

**Return:**

### onRelease

> `onRelease() => void`

**Description:**
onRelease is used for removing a Pokemon from the capture list, and saving the list to localStorage.

**Parameters:**

**Return:**

## Variables

### navigate

> `const navigate`

**Description:**
navigate is a `useNavigate()` variable (provided from react-router-dom) and it is used to add specific query parameters to the URL.

### query

> `const [query]`

**Description:**
query is a `useSearchParams()` variable (provided from react-router-dom) and it is used to retrieve specific query parameters from the URL.

### url, setUrl

> `const [url, setUrl]`

**Description:**
url and setUrl is a `useState()` variable (provided from react) and it's value is the current URL query parameter.

### captureList, setCaptureList

> `const [captureList, setCaptureList]`

**Description:**
captureList and setCaptureList is a `useState()` variable (provided from react) and it's value is either and empty array or a string array parsed from localStorage.

### types, setTypes

> `const [types, setTypes]`

**Description:**
types and setTypes is a `useState()` variable (provided from react) and it's value is an array fetched from the `GET https://pokeapi.co/api/v2/type` endpoint.

### selectedType, setSelectedType

> `const [selectedType, setSelectedType]`

**Description:**
selectedType and setSelectedType is a `useState()` variable (provided from react) and it's value is the currently selected type.

### initialPokemon, setInitialPokemon

> `const [initialPokemon, setInitialPokemon]`

**Description:**
initialPokemon and setInitialPokemon is a `useState()` variable (provided from react) and it is the initially fetched list of Pokemon, which contains every Pokemon, and only fetched once.

### filteredPokemon, setFilteredPokemon

> `const [filteredPokemon, setFilteredPokemon]`

**Description:**
filteredPokemon and setFilteredPokemon is a `useState()` variable (provided from react) and it's the initially fetched list of Pokemon, which contains every Pokemon, and only fetched once.

### isLoading, setIsLoading

> `const [isLoading, setIsLoading]`

**Description:**
isLoading and setIsLoading is a `useState()` variable (provided from react) and it is used to track wether or not to show a loader.

### showSearch, setShowSearch

> `const [showSearch, setShowSearch]`

**Description:**
showSearch, setShowSearch is a `useState()` variable (provided from react) and it is used to track wether or not to show the search bar.

### searchString, setSearchString

> `const [searchString, setSearchString]`

**Description:**
searchString and setSearchString is a `useState()` variable (provided from react) and it's value is what is filtering the list of Pokemon.

### capturedOnly, setCapturedOnly

> `const [capturedOnly, setCapturedOnly]`

**Description:**
capturedOnly and setCapturedOnly is a `useState()` variable (provided from react) and it's value dictates wether or not show only capture Pokemon.

## Components

This project only contains Functional Components, since with hooks `React.FC` can use lifecycle events, and state management.

### App.tsx

The `App.tsx` file is used for initializing most of the variables used. It is also the one which structures the main components.

### Navbar.tsx

The `Navbar.tsx` file is just the navigation bar component.

### Loader.tsx

The `Loader.tsx` file is just a Loader, which fills it's given space completely.

### Main.tsx

The `Main.tsx` file holds the type selection, the search bar and also the list of Pokemon. It maybe could've been beneficial to split this component, but because fear of prop drilling, it was kept together.

### Profile.tsx

The `Profile.tsx` file is responsible for fetching and showing information about a specific Pokemon.

## Regrets

This project was a challenging and fun experience and with this said, I am really proud of myself, that I created this page, but that doesn't mean, that I don't have regrets.

1. This was my first project with Typescript and to be honest it wasn't easy. But now I understand why a lot of developers love this technology even though I don't fully understand it yet.

2. The state management of this project could've been much better if I use Redux or the Context API.

3. Connecting to the previous point, prop drilling could've been a really big issue, but thankfully it was not that nested.