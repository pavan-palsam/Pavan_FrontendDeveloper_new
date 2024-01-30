import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { FaChevronDown } from "react-icons/fa";

export const SortingDropdown = ({ handleSort, selectedSortingOption }) => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleSortingOption = (option) => {
      handleClose();
      handleSort(option);
    };
  
    return (
      <>
        <Button
          variant="outlined"
          style={{ marginTop: '2vh', marginLeft: '0.6vw', borderRadius: '50px', color: 'black', textTransform: 'none' }}
          endIcon={<FaChevronDown />}
          onClick={handleClick}
        >
          Sort By
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleSortingOption('default')}>
            <input type="radio" name="sortingOption" checked={selectedSortingOption === 'default'} /> Default
          </MenuItem>
          <MenuItem onClick={() => handleSortingOption('alphabetical')}>
            <input type="radio" name="sortingOption" checked={selectedSortingOption === 'alphabetical'} /> Alphabetical
          </MenuItem>
        </Menu>
      </>
    );
  };
  