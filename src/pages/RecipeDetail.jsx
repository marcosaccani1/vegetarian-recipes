import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getRecipeDetails } from "../api/spoonacular";
import Loader from "../components/Loader";

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await getRecipeDetails(id);

      if (!data) {
        setErrorMessage("Dettagli della ricetta non disponibili.");
      }

      setRecipe(data);
      setLoading(false);
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  return (
    <main className="page-container">
      <Link to="/" className="back-link">
        ← Torna alla ricerca
      </Link>

      <section className="recipe-detail">
        <img src={recipe.image} alt={recipe.title} />

        <div className="recipe-detail-content">
          <h1>{recipe.title}</h1>

          <div className="recipe-info">
            <p>
              <strong>Tempo:</strong> {recipe.readyInMinutes} minuti
            </p>

            <p>
              <strong>Porzioni:</strong> {recipe.servings}
            </p>
          </div>

          <div
            className="summary"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />

          <section className="detail-section">
            <h2>Ingredienti</h2>

            {recipe.extendedIngredients?.length > 0 ? (
              <ul className="ingredients-list">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Ingredienti non disponibili.</p>
            )}
          </section>

          <section className="detail-section">
            <h2>Preparazione</h2>

            {recipe.instructions ? (
              <div
                className="instructions"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            ) : (
              <p>Istruzioni non disponibili.</p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetail;