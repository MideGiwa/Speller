import React, { useState } from 'react';
import microphone from '../images/microphone.png';
import DictionApi from '../Api/ApiKeys';


export function WOD() {
    const word = fetch('get find word random url');

}

export function Card() {
};
export default function Body() {
    //Initializing values...
    const [transcribed, setTranscribed] = useState('Just say the word!')
    const [def1, setDef1] = useState('Press the microphone button to speak!');
    const [def2, setDef2] = useState('');
    const microphoneButton = <img src={microphone} title="record" className="microphone--image" />;
    const loadingIcon1 = "Loading..." //<img src={microphone} title="record" className="microphone--image" />
    const loadingIcon2 = "Loading..." //<img src={microphone} title="record" className="microphone--image" />
    const [buttonIcon, setButtonIcon] = useState(microphoneButton)

    function hideloader() {
        const startBtn = document.querySelector('#transcription');
        if (startBtn.classList.contains('listening')) {
            setButtonIcon(loadingIcon1);
        } else {
            setButtonIcon(microphoneButton)
        }
    };

    const screenSize  = window.innerWidth;
    const ShowCard = () => {
        if (screenSize <= 760) {
            const showCard = document.querySelector("card");
        showCard.style.cssText(" display: flex");
        }
        
    }


    async function Search(word) {
        setTranscribed(word);
        // Storing response...
        const response = await fetch(DictionApi.url + word + '?key=' + DictionApi.dict);

        // Storing data in form of JSON...
        var data = await response.json();
        console.log(data);

        if (!(data[0].shortdef)) {
            const dataArr = data.map(data => {
                return <li className="lst--item" onClick={() => Search(data)}> {data}</li>
            });
            // const dataArr = [];
            // for (let i = 0; i < data.length; i++) {
            //     dataArr.push(
            //         <li className="lst--item" onClick={Search(data.i)}> {data.i}</li>
            //     )
            // }
            setDef1(<h5>Did you mean:</h5>)
            setDef2(
                <ul id="sug--list">
                    {dataArr}
                </ul>
            )
        } else if (data.length < 2) {
            setDef1(data[0].shortdef[0]);
            setDef2('');
        }
        else {
            setDef1(data[0].shortdef[0]);
            setDef2(data[1].shortdef[0]);
        }

        ShowCard();

        

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

            Search(accumulatedResult);

        };

        // Start/stop recording audio...
        if (startBtn.classList.contains('listening')) recognition.stop() && hideloader();
        else {
            recognition.start();
            hideloader();
        }
        startBtn.classList.toggle('listening');
    };

    return (
        <main>
            <div id="startBtn" onClick={Start} className="microphone--button">
                {buttonIcon}
            </div>
            <div id="card" >
                <h1 id="transcription" > {transcribed}</h1>
                {/* <div class="spinner-border"
                        role="status" id="loading">
                        <span class="sr-only">Loading...</span>
                    </div> */}
                <div className='def--box'>
                    <div id="def1" className="definition">{def1}</div>
                    <div id="def2" className="definition">{def2}</div>
                </div>
            </div>
        </main >
    )
};
