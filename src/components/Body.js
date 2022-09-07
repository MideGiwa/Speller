import React from 'react';
import microphone from '../images/microphone.png';
import { Start } from './funcs';

const Dict_Api_Key = "affcc4fe-86cc-493f-98b2-22549306b986";
const Thes_Api_Key = "";

/*
function parse(json) {
    return JSON.parse(json);
}
*/
function show(data) {
    if (Object.keys(data).length > 10) {
        const dataArr = data.map(data => <li className="lst--item" onClick={Search(data)}> {data}</li>
        );

        return (
            <div>
                <h3>Did you mean:</h3>
                <h5> {dataArr} </h5>
            </div>);
    }
    else
        return (
            <div className='card--content'>
                <h1 className='definition'>
                    {data[0].shortdef}
                    {data[1].shortdef}
                </h1>
            </div>
        );
}

export async function Search(word) {
    // Storing response
    const response = await fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=' + Dict_Api_Key)
    /*.then((response) => response.json())
    .then((data) => console.log(data));
    // Storing response
    const response = await fetch(url);*/

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
        const definition = document.createElement('div');
        var card =document.getElementsByClassName('card');
        card.appendChild(show(data));
    }
};


function hideloader() {
    document.getElementById('loading').style.display = 'none';
};



export default function Body() {
    return (
        <main>
            <section className='mid--section'>
                <div id="startBtn" onClick={ Start } className="microphone--button">
                    <img src={microphone} title="record" className="microphone--image" />
                </div>
            </section>
            <section className='right--section'>
                <div id="card" >
                    <h1 id="transcription" ></h1>
                    {/* <div class="spinner-border"
                        role="status" id="loading">
                        <span class="sr-only">Loading...</span>
                    </div> */}
                </div>

            </section>
        </main>
    )
}