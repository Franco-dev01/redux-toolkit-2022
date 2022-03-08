import { createSlice } from "@reduxjs/toolkit";

// initial state

export const initialState = {
  loading: false,
  hasError: false,
  recipes: [],
};

//slice
const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    getRecipes(state) {
      state.loading = true;
    },

    getRecipesSuccess: (state, { payload }) => {
      state.recipes = payload;
      state.loading = false;
    },
    getFailure(state, action) {
      state.loading = false;
      state.hasError = action.payload;
    },
  },
});

//useSelector

export const recipesSelector = (state) => state.recipes;

export default recipesSlice.reducer;

// Three actions generated from the slice
export const { getRecipes, getRecipesSuccess, getFailure } =
  recipesSlice.actions;

// Asynchronous thunk action
export function fetchRecipes() {
  return async (dispatch) => {
    dispatch(getRecipes());

    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      const data = await response.json();

      dispatch(getRecipesSuccess(data.meals));
    } catch (error) {
      dispatch(getFailure(error));
    }
  };
}
