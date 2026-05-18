import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import useRecipes from "../hooks/useRecipes";

function Home() {
  const {
    searchTerm,
    setSearchTerm,
    recipes,
    loading,
    errorMessage,
    handleSearch,
  } = useRecipes();

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