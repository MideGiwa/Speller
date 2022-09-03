import React from 'react';
import microphone from '../images/microphone.png';
import Show from './Show';

const Dict_Api_Key = "affcc4fe-86cc-493f-98b2-22549306b986";
const Thes_Api_Key = "";

/*
function parse(json) {
    return JSON.parse(json);
}
*/

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
    }
};


function hideloader() {
    document.getElementById('loading').style.display = 'none';
};

// Initiate speach recognition api
const recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new recognitionSvc();

// Adding functionality to record button
function start() {
    recognition.lang = 'en';
    recognition.continuous = true;
    // return transcribed text
    recognition.onresult = (event) => {
        recognition.stop();
        const accumulatedResult = [];
        for (const result of event.results) {
            accumulatedResult.push(`${result[0].transcript}`);
        }
        document.querySelector('#transcription').innerHTML = accumulatedResult;
        Search(accumulatedResult);
    };
    
    // Start/stop recording audio
    if (startBtn.classList.contains('listening')) recognition.stop();
    else {
        recognition.start();
    }
    startBtn.classList.toggle('listening');
};

export default function Body() {
    return (
        <main>
            <section className='mid--section'>
                <div onClick={ start() } className="microphone--button">
                    <img src={microphone} title="record" className="microphone--image" />
                </div>
            </section>
            <section className='right--section'>
                <div id="card" >
                    <h1 id="transcription" ></h1>
                    <div class="spinner-border"
                        role="status" id="loading">
                        <span class="sr-only">Loading...</span>
                        {/* <Show data={`{ data }`}/> */}
                    </div>
                </div>

            </section>
        </main>
    )
}