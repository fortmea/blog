import React from 'react';
import useDarkMode from 'use-dark-mode';

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);
    if (darkMode.value == true) {
        return (
            <button type="button" className='button-30' onClick={darkMode.disable}>
                ☀
            </button>);
    } else {


        return (


            <button type="button" className='button-30' onClick={darkMode.enable}>
                ☾
            </button>
        );
    }
};

export default DarkModeToggle;