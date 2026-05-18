import { useEffect, useState } from "react";
import { searchRecipes } from "../api/spoonacular";

function useRecipes(defaultSearch = "pasta") {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await searchRecipes(query);

      if (data.length === 0) {
        setErrorMessage("Nessuna ricetta trovata.");
      }

      setRecipes(data);
    } catch (error) {
      setErrorMessage(
        "Si è verificato un errore durante il caricamento delle ricette."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setErrorMessage("Inserisci il nome di una ricetta.");
      return;
    }

    fetchRecipes(searchTerm);
  };

  useEffect(() => {
    fetchRecipes(defaultSearch);
  }, [defaultSearch]);

  return {
    searchTerm,
    setSearchTerm,
    recipes,
    loading,
    errorMessage,
    handleSearch,
  };
}

export default useRecipes;