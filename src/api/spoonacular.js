import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const api = axios.create({
  baseURL: "https://api.spoonacular.com",
});

export const searchRecipes = async (query) => {
  try {
    const response = await api.get("/recipes/complexSearch", {
      params: {
        apiKey: API_KEY,
        query: query,
        diet: "vegetarian",
        number: 12,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Errore API:", error);
    return [];
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await api.get(`/recipes/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Errore dettagli ricetta:", error);
    return null;
  }
};