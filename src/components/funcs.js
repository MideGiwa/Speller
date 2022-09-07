import { Search } from './Body';


// Adding functionality to record button
export function Start() {
    // Initiate speach recognition api
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
