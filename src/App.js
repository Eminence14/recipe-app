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
        <h3>Built by Ibidunmoye Victor </h3>
        <a href="https://recipe-database.pages.dev/">live</a>
        <a href="https://github.com/Eminence14/recipe-app">github</a>
      </footer>

    </div >
  );
}

export default App;
