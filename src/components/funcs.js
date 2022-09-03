import audioFile from '../images/Voice 002 (2).m4a'

var audio = audioFile

export function Transcribe(audio) {
    const data = {
    'content': audio,
    'languageCode': "en"
    }

    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': '03c2f21495mshc69a27613a65599p1459f3jsn678351de7ee6',
            'X-RapidAPI-Host': 'google-cloud-speech-to-text-automatic-speech-recognition.p.rapidapi.com'
        },
        body: data
    };

    fetch('https://google-cloud-speech-to-text-automatic-speech-recognition.p.rapidapi.com/longRunningRecognize', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));


}

export function GetResults(id) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '03c2f21495mshc69a27613a65599p1459f3jsn678351de7ee6',
            'X-RapidAPI-Host': 'google-cloud-speech-to-text-automatic-speech-recognition.p.rapidapi.com'
        }
    };
    
    fetch('https://google-cloud-speech-to-text-automatic-speech-recognition.p.rapidapi.com/results/' + id, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        


}
//TODO
export function RecordAudio() {
    const player = document.getElementById('player');
    
    const handleSuccess = function (stream) {
        if (window.URL) {
            player.srcObject = stream;
        } else {
            player.src = stream;
        }
    };

    navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(handleSuccess);

}


/*
{8 items
    "uuid":"3ab9e2d8-bbf8-438c-89ce-b85980f6bc0d"
    "language_code":"en"
    "webhook_url":NULL
    "multi_channel":false
    "punctuation":false
    "accuracy":"high"
    "status":"queued"
    "seconds_remaining":3585
    }



    {8 items
"uuid":"3ab9e2d8-bbf8-438c-89ce-b85980f6bc0d"
"status":"completed"
"language_code":"en"
"webhook_url":NULL
"multi_channel":false
"punctuation":false
"accuracy":"high"
"results":{2 items
"channels":[1 item
0:{5 items
"channel":0
"json":"http://ns3030433.ip-149-202-88.eu/3ab9e2d8-bbf8-438c-89ce-b85980f6bc0d/text-0.json"
"srt":"http://ns3030433.ip-149-202-88.eu/3ab9e2d8-bbf8-438c-89ce-b85980f6bc0d/text-0.srt"
"txt":"http://ns3030433.ip-149-202-88.eu/3ab9e2d8-bbf8-438c-89ce-b85980f6bc0d/text-0.txt"
"vtt":"http://ns3030433.ip-149-202-88.eu/3ab9e2d8-bbf8-438c-89ce-b85980f6bc0d/text-0.vtt"
}
]
"analyze":"http://ns3030433.ip-149-202-88.eu/3ab9e2d8-bbf8-438c-89ce-b85980f6bc0d/analyze.json"
}
}
*/


/*document.querySelector('#transcription').addEventListener('click', (e) => {
  navigator.clipboard.writeText(e.target.innerText).then( () => {
    document.getElementById('tooltip').classList.add('active');
    setTimeout( () => {
      document.getElementById('tooltip').classList.remove('active');
    }, 3100);
  });
  
});

setTimeout( () => {
  document.getElementById('tooltip').classList.remove('init');
}, 3100); */