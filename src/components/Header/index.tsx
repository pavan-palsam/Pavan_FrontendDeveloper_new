import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SiSwiggy } from "react-icons/si";
import axios from 'axios'
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputAdornment } from '@mui/material';
import { IoMdSearch } from "react-icons/io";
import { useFoodContext } from '../../context.tsx';


const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: 'white',
        color: 'white',
        width: '100%',
        height: '10vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '2vw',
        marginLeft:'15vw'
    },
    headerContainer: {
        textAlign: 'start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    paragraph: {
        fontWeight: 'bold',
        color: '#fc8019'
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '2vw',
        marginRight:'15vw'
    },
    searchInput: {
        width: '20vw',
        borderRadius: '5px',
        height: '40px',
        backgroundColor: '#F8F8F8',
        marginRight:'15vw'
    },
}));


const Header = () => {
    const classes = useStyles()
    const { setFoodItems} = useFoodContext();

    const handleSearch = async (event) => {
        try {
            const searchValue = event.target.value;
            if(!searchValue){
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=s')
                setFoodItems(response.data)
            }else{
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`); // Implementing search functionality
                setFoodItems(response?.data)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    return (
        <header className={classes.header}>
            <div className={classes.headerContainer}>
                <SiSwiggy size='2vw' color='#fc8019' />
                <p className={classes.paragraph}>Swiggy</p>
            </div>
            <div className={classes.searchContainer}>
            <OutlinedInput className={classes.searchInput} placeholder='Search for restaurant and food' 
                endAdornment={
                    <InputAdornment position='end'>
                        <IoMdSearch />
                    </InputAdornment>
                }
                onChange = {handleSearch}
                />

            </div>
        </header>
    );
};

export default Header;