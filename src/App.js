import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, recipesSelector } from "./redux/slices/recipes";
import "./index.css";
const App = () => {
  const dispatch = useDispatch();
  const { recipes, loading, getFailure } = useSelector(recipesSelector);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const renderRecipes = () => {
    if (loading) return <p>Loadnd recipe...</p>;
    if (getFailure) return <p>Cannot display recipe...</p>;

    return (
      recipes &&
      recipes.map((recipe) => (
        <div key={recipe.idMeal} className="tile">
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt="" width={400} height={400} />
        </div>
      ))
    );
  };

  return (
    <section>
      <h1>Recipe</h1>
      <div className="content">{renderRecipes()}</div>
    </section>
  );
};

export default App;
