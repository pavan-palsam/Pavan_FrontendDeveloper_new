import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/index.tsx'
import Filters from './components/Filters/index.tsx'
import FoodItems from './components/FoodItems/index.tsx'
import Footer from './components/Footer/index.tsx'
import { FoodItemContext } from './context.tsx';

function App() {
  const [foodItems, setFoodItems] = useState([])
  return (
    <FoodItemContext.Provider value={{foodItems,setFoodItems}}>
    <div className="App">     
        <Header />
        <Filters />
        <FoodItems />
        <Footer />
    </div>
    </FoodItemContext.Provider>
  );
}

export default App;
