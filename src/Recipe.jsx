import './Recipe.css'

const Recipe = ({ calories, image, title, ingredients, meal }) => {
    return (
        <div className="recipe" key={title}>
            <div className="recipe-img">
                <img src={image} alt="" />
                <h1>{title}</h1>
                <span className="calories">Calories: {Math.floor(calories)} KJ</span>
            </div>
            <div className="description">
                <ol>
                    {ingredients.map(ingredient => (
                        <li>{ingredient}</li>
                    ))}
                </ol>
                <span className="meal">
                    <ul>
                        {meal.map(meal => (
                            <li>{meal}</li>
                        ))}
                    </ul>
                </span>
            </div>
        </div>
    );
}

export default Recipe;