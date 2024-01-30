import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SiSwiggy } from "react-icons/si";
import {AiTwotoneCopyright } from "react-icons/ai";


const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: 'black',
      color: 'white',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '10vh',
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-start',
      paddingLeft:'2vw',
      margin:0,
    },
    headerContainer:{
        textAlign: 'start',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    paragraph:{
        fontWeight:'bold'
    },
    copyContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop: '-1vw'
    }
  }));

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <div className={classes.headerContainer}>
      <SiSwiggy size='2vw' />
      <p className={classes.paragraph}>Swiggy</p>
      </div>
      <div className={classes.copyContainer}>
      <AiTwotoneCopyright style={{ fontSize: '1.5vw', color: '#606361', backgroundColor: 'black' }} />
        <p  style={{color:'#606361'}}>2023 Bundi Technologies Pvt Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;
