import React, { useState, useEffect } from 'react';
import { Modal, Fade,  Button } from '@mui/material';
import { useFoodContext } from '../../context.tsx';
import axios from 'axios'
import { SortingDropdown } from './SortingDropdown/index.tsx';
import { Puff } from 'react-loader-spinner';
import { FaChevronDown } from "react-icons/fa";


const Filters = ({ applyFilters }) => {
  const { foodItems, setFoodItems } = useFoodContext();
  const [initialFoodItems, setInitialFoodItems] = useState([])
  const [selectedSortingOption, setSelectedSortingOption] = useState('default');
  const [areas, setSelectAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState(null);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterLoader, setFilterLoader] = useState(false);
  const filtersArray = ["Fast Delivery", "New on Swiggy", "Rating 4.0+", "Pure Veg", "Offers", "Rs. 300 - Rs. 600", "Less than Rs. 300"]


  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const foodItemsData = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=s'); // as there is no API for Default Fooditems here i used this API call
        setFoodItems(foodItemsData.data);
        setInitialFoodItems(foodItemsData.data)
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  const handleApplyFilter = async () => {
    setOpenFilterModal(false);
    try {
      // Displaying loader while waiting for the API response
      setFilterLoader(true);
  
      // Making API call with the selected area
      if (selectedArea) {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea.strArea}`);
        setFoodItems(response.data);
      }
    } catch (error) {
      console.error('Error applying filter:', error);
    } finally {
      // Hiding loader after API response or error
      setFilterLoader(false);
    }
  };
  

  const handleCancelFilter = () => {
    // Reseting the selected area
    setSelectedArea(null);
    // Closing the modal
    setOpenFilterModal(false);
  };

  const handleSort = (sortingOption) => {
    // Implementing sorting logic based on the sortingOption
    setSelectedSortingOption(sortingOption);
    if (sortingOption === 'alphabetical') {
      const sortedFoodItems = [...foodItems.meals].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
      setFoodItems({ meals: sortedFoodItems });
    } else if (sortingOption === 'default') {
      setFoodItems(initialFoodItems)
    }

  };


  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        setSelectAreas(response.data)
      } catch (error) {
        console.log('error while listing areas:', error)
      }
    }
    fetchAreas();
  }, [])

  console.log(areas, 'areas')

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '5px', marginLeft: '16vw', marginRight: '15vw', textAlign: 'start' }}>
      <h1 style={{ margin: '0', padding: '0' }}>Restaurants With Great Offers Near Me</h1>
      <div>
        <Button variant="outlined" style={{ marginTop: '2vh', borderRadius: '50px', color: 'black', textTransform: 'none' }} endIcon={<FaChevronDown />}
          onClick={() => setOpenFilterModal(true)}
        >Filter</Button>
        <Modal
          open={openFilterModal}
          onClose={() => setOpenFilterModal(false)}
          closeAfterTransition
          style={{maxHeight:'100vh',overflow:'scroll'}}
        >
          <Fade in={openFilterModal}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxWidth: '300px', margin: 'auto', marginTop: '50px' }}>
              <h2>Select Area</h2>
              {areas?.meals?.map((area) => (
                <div key={area.strArea} style={{ margin: '10px', cursor: 'pointer',overFlow:'scroll' }}>
                  <input
                    type="radio"
                    name="area"
                    style={{ margin: '10px', cursor: 'pointer' }}
                    onClick={() => handleAreaSelect(area)}
                    checked={selectedArea && selectedArea.strArea === area.strArea}
                  />
                  {area.strArea}
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button variant="outlined" onClick={handleApplyFilter}>
                  Apply
                </Button>
                <Button variant="outlined" onClick={handleCancelFilter}>
                  Cancel
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
        <SortingDropdown handleSort={handleSort} selectedSortingOption={selectedSortingOption} />
        {filtersArray.map((filter) => (
          <Button variant="outlined" style={{ marginTop: '2vh', marginLeft: '0.6vw', borderRadius: '50px', color: 'black', textTransform: 'none' }} >{filter}</Button>
        ))}

      </div>
    </div>
    {filterLoader && (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, 0.8)' }}>
    <Puff color="#00BFFF" height={100} width={100} />
  </div>
)}

    </>
  );
};

export default Filters;
