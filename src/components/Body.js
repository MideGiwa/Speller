import React, { useState } from 'react';
import microphone from '../images/microphone.png';

function isDef(data) {
    if (Object.keys(data).length > 10) {
        return false;
    }
    else {
        return true;
    }
}


// function hideloader() {
//     document.getElementById('loading').style.display = 'none';
// };



export default function Body() {
    //Initializing values...
    const Dict_Api_Key = "affcc4fe-86cc-493f-98b2-22549306b986";
    const Thes_Api_Key = "";

    const [transcribed, setTranscribed] = useState('Just say the word!')
    const [def1, setDef1] = useState('Press the microphone button to speak!');
    const [def2, setDef2] = useState('');

    async function Search(word) {
        // Storing response...
        const response = await fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=' + Dict_Api_Key);

        // Storing data in form of JSON...
        var data = await response.json();
        setDef1(data[0].shortdef[0]);
        setDef2(data[1].shortdef[0]);

    };
    // Adding functionality to record button...
    function Start() {
        // Initiate speach recognition api...
        const recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new recognitionSvc();

        const startBtn = document.querySelector('#transcription');
        recognition.lang = 'en';
        recognition.continuous = true;
        // return transcribed text
        recognition.onresult = (event) => {
            recognition.stop();
            const accumulatedResult = [];
            for (const result of event.results) {
                accumulatedResult.push(`${result[0].transcript}`);
            }
            setTranscribed(accumulatedResult);
            Search(accumulatedResult);

        };

        // Start/stop recording audio...
        if (startBtn.classList.contains('listening')) recognition.stop();
        else {
            recognition.start();
        }
        startBtn.classList.toggle('listening');
    };

    return (
        <main>
            <section className='mid--section'>
                <div id="startBtn" onClick={Start} className="microphone--button">
                    <img src={microphone} title="record" className="microphone--image" />
                </div>
            </section>
            <section className='right--section'>
                <div id="card" >
                    <h1 id="transcription" > {transcribed}</h1>
                    {/* <div class="spinner-border"
                        role="status" id="loading">
                        <span class="sr-only">Loading...</span>
                    </div> */}

                    <div className="definition">{def1}</div>
                    <div className="definition">{def2}</div>
                </div>

            </section>
        </main>
    )
}