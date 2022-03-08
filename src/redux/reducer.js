import { combineReducers } from "redux";

import recipiensReducer from "./slices/recipes";

const rootReducer = combineReducers({
  recipes: recipiensReducer,
});

export default rootReducer;
