import { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';
import Loader from './loader.gif'

function App() {
  const APP_ID = '6f398cc4';
  const APP_KEY = '9496c7bd008e8348bf1c2e4a3de11816';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('chicken');
  const [query, setQuery] = useState('chicken');
  const [loading, setLoading] = useState(true)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setRecipes([])
    setQuery(search);
    setSearch('')
  }

  useEffect(() => {
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      .then(res => res.json())
      .then(data => { setLoading(false); setRecipes(data.hits) })
      .catch(err => console.log(err.message))
  }, [query])

  return (
    <div className='App'>
      {loading && <div className='loading'><img src={Loader} alt="" /></div>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {
        recipes && <div className="recipe-container">
          {
            recipes.map(recipe => (
              <Recipe
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                title={recipe.recipe.label}
                ingredients={recipe.recipe.ingredientLines}
                meal={recipe.recipe.mealType}
              />
            ))
          }
        </div>
      }

      <footer className="attribution">
        Built by Ibidunmoye Victor
        <a href="https://recipe-database.pages.dev/">
          <img src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIsMi4yNDY3QTEwLjAwMDQyLDEwLjAwMDQyLDAsMCwwLDguODM3NTIsMjEuNzM0MTljLjUuMDg3NTIuNjg3NS0uMjEyNDcuNjg3NS0uNDc1LDAtLjIzNzQ5LS4wMTI1MS0xLjAyNS0uMDEyNTEtMS44NjI0OUM3LDE5Ljg1OTE5LDYuMzUsMTguNzg0MjMsNi4xNSwxOC4yMjE3M0EzLjYzNiwzLjYzNiwwLDAsMCw1LjEyNSwxNi44MDkyYy0uMzUtLjE4NzUtLjg1LS42NS0uMDEyNTEtLjY2MjQ4QTIuMDAxMTcsMi4wMDExNywwLDAsMSw2LjY1LDE3LjE3MTY5YTIuMTM3NDIsMi4xMzc0MiwwLDAsMCwyLjkxMjQ4LjgyNUEyLjEwMzc2LDIuMTAzNzYsMCwwLDEsMTAuMiwxNi42NTkyM2MtMi4yMjUtLjI1LTQuNTUtMS4xMTI1NC00LjU1LTQuOTM3NWEzLjg5MTg3LDMuODkxODcsMCwwLDEsMS4wMjUtMi42ODc1LDMuNTkzNzMsMy41OTM3MywwLDAsMSwuMS0yLjY1cy44Mzc0Ny0uMjYyNTEsMi43NSwxLjAyNWE5LjQyNzQ3LDkuNDI3NDcsMCwwLDEsNSwwYzEuOTEyNDgtMS4zLDIuNzUtMS4wMjUsMi43NS0xLjAyNWEzLjU5MzIzLDMuNTkzMjMsMCwwLDEsLjEsMi42NSwzLjg2OSwzLjg2OSwwLDAsMSwxLjAyNSwyLjY4NzVjMCwzLjgzNzQ3LTIuMzM3NTIsNC42ODc1LTQuNTYyNSw0LjkzNzVhMi4zNjgxNCwyLjM2ODE0LDAsMCwxLC42NzUsMS44NWMwLDEuMzM3NTItLjAxMjUxLDIuNDEyNDgtLjAxMjUxLDIuNzUsMCwuMjYyNTEuMTg3NS41NzUuNjg3NS40NzVBMTAuMDA1MywxMC4wMDUzLDAsMCwwLDEyLDIuMjQ2N1oiLz48L3N2Zz4=" alt="" />
        </a>
        <a href="">live repo</a>
      </footer>
    </div>
  );
}

export default App;
