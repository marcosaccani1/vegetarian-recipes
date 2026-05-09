import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />

      <div className="recipe-card-content">
        <h3>{recipe.title}</h3>
      </div>
    </Link>
  );
}

export default RecipeCard;