import React from 'react';



export default function Header() {
    return (
        <header className="header">
            <h1>Speller</h1>
            <div className="search">
                <input type="text" placeholder='Try to type it out..'></input>
            </div>
            <a href="#">Word of the day!</a>
        </header>
    )
}