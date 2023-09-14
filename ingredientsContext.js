import { createContext } from 'react';
const IngredientsContext = createContext({
    ingredients: [],
    setIngredients: () => { }
});
export default IngredientsContext;