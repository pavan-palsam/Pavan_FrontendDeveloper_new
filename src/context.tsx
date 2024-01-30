import { createContext, useContext, Dispatch, SetStateAction } from 'react';

export const FoodItemContext = createContext<{
    foodItems: Array<string>;
    setFoodItems: Dispatch<SetStateAction<Array<string>>>;
}>({} as any);

export const useFoodContext = () => useContext(FoodItemContext);
