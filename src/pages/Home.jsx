import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import { searchRecipes } from "../api/spoonacular";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
  const loadRecipes = async () => {
    setLoading(true);

    const data = await searchRecipes("pasta");

    setRecipes(data);
    setLoading(false);
  };

  loadRecipes();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setErrorMessage("Inserisci il nome di una ricetta.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const data = await searchRecipes(searchTerm);

    if (data.length === 0) {
      setErrorMessage("Nessuna ricetta trovata.");
    }

    setRecipes(data);
    setLoading(false);
  };

  return (
    <main className="page-container">
      <section className="hero">
        <h1>Vegetarian Recipes</h1>
        <p>Cerca ricette vegetariane semplici, gustose e facili da preparare.</p>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </section>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {loading && <Loader />}

      <section className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </main>
  );
}

export default Home;