import React from 'react';
import useDarkMode from 'use-dark-mode';

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);
    
    if (darkMode.value == true) {
        return (
            <button type="button" className='button-29 box-shadow-dark' onClick={darkMode.disable}>
                <i className="fa fa-lightbulb-o" style={{color: "black"}} aria-hidden="true"></i> {' '}Modo diurno
            </button>);
            
    } else {


        return (


            <button type="button" className='button-29' onClick={darkMode.enable}>
                <i className="fa fa-moon-o" aria-hidden="true"></i> {' '}Modo noturno
            </button>
        );
    }
    
};

export default DarkModeToggle;