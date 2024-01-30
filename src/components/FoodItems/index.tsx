import React, { useState, useEffect } from 'react';
import { Grid, Modal, Fade, IconButton, Button } from '@mui/material';
import { Puff } from 'react-loader-spinner';
import axios from 'axios';
import StarInCircle from '../StarInCircle';
import CloseIcon from '@mui/icons-material/Close';
import { FaChevronDown } from "react-icons/fa";
import './index.css'
import { useFoodContext } from '../../context.tsx';

const FoodItem = ({ item, randomNumbers }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOpenModal = async (id) => {
    setOpenModal(true);
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const gridItemStyle = {
    margin: '10px',
    padding: '15px',
    width: '15vw',
    borderRadius: '10px',
    boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none',
    transition: 'box-shadow 0.3s ease-in-out',
    cursor: 'pointer',
  };

  return (
    <>
      <Grid
        item
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleOpenModal(item.idMeal)}
        sx={gridItemStyle}
      >
        <img src={item.strMealThumb} alt={item.strMeal} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
        <p style={{ fontWeight: 'bold', marginTop: '8px', height: '40px', overflow: 'hidden' }}>{item.strMeal}</p>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '-25px' }}>
          <StarInCircle />
          <p style={{ fontWeight: 'bold' }}>{randomNumbers.ratingNumber} </p>
          <span style={{ fontWeight: 'bold', marginBottom: '7px', marginLeft: '5px', marginRight: '5px' }}>. </span>
          <p style={{ fontWeight: 'bold' }}>{randomNumbers.firstNumber}-</p>
          <p style={{ fontWeight: 'bold' }}>{randomNumbers.secondNumber} mins</p>
        </div>

      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >

        <Fade in={openModal}>
          <div style={{ position: 'relative', backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '80vw', height: '100vh', margin: 'auto', marginTop: '50px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                <CloseIcon />
              </IconButton>
              <img src={item.strMealThumb} alt={item.strMeal} style={{ width: '60vw', height: '50vh', objectFit: 'cover', borderRadius: '8px' }} />
              <h2 id="transition-modal-title">{item.strMeal}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <StarInCircle />
                <p style={{ fontWeight: 'bold' }}>{randomNumbers.ratingNumber}</p>
              </div>
              <p className="tags">Tags: <span>{item.strTags || 'N/A'}</span></p>
              <p className="category">Category: <span>{item.strCategory}</span></p>
              <p className="area">Area: <span>{item.strArea}</span></p>
              <h3 className="instructions-heading">Instructions:</h3>
              <p className="instructions">{item.strInstructions}</p>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

const FoodItems = ({ selectedArea }) => {
  const { foodItems, setFoodItems } = useFoodContext();
  const [loading,setLoading] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(16);
  const itemsPerPage = 16;

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true)
        const foodItemsData = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=s');
        setFoodItems(foodItemsData.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }finally{
        setLoading(false)
      }
    };

    fetchFoodItems();
  }, []);

  const getRandomNumbers = () => {
    const firstNumber = Math.floor(Math.random() * (58 - 5)); // Generating a random number between 0 and (58 - 5)
  const secondNumber = firstNumber +1+  Math.floor(Math.random() * (6)); 
    return {
      ratingNumber: (Math.random() * (5 - 1) + 1).toFixed(1),
      firstNumber,
      secondNumber
    };
  };

  const handleShowMore = () => {
    setItemsToShow((prevItemsToShow) => prevItemsToShow + itemsPerPage);
  };

  return (
    <>
      <Grid container justify='flex-start' alignItems='flex-start' style={{ marginTop: '40px', width: '80vw', flexDirection: 'row', flexWrap: 'wrap', marginLeft: '15vw', cursor: 'pointer' }}>
        {foodItems.meals ? (
          foodItems.meals.slice(0, itemsToShow).map((item) => (
            <FoodItem key={item.idMeal} item={item} randomNumbers={getRandomNumbers()} />
          ))
        ) : (<div display='flex' justifyContent='center' textAlign='center'><h1 style={{textAlign:'center'}}>No FoodItem Found</h1></div>)}
      </Grid>
      {itemsToShow < foodItems.meals?.length && (
        <div>
          <Button variant="outlined" style={{ width: '10vw', margin: '5vh' }} endIcon={<FaChevronDown />} onClick={handleShowMore}>Show More</Button>
       </div>
      )}
      {loading && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, 0.8)' }}>
          <Puff color="#00BFFF" height={100} width={100} />
        </div>
        )}
    </>
  );
};

export default FoodItems;
