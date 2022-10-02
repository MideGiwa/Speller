import React from 'react';
import WOD from './Body.js';
export default function Header() {

    return (
        <header className="header">
            <h1>Speller</h1>
            {/* <div className="search">
                <input type="text" placeholder='Try to type it out..'></input>
            </div> */}
            <h3 onClick={WOD}>Word of the day!</h3>
        </header>
    );
}