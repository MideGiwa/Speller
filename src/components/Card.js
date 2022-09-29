import React from 'react';


export default function Card(data) {
    console.log(data);

    if (!(data[0].shortdef)) {
        const dataArr = data.map(data => <li className="lst--item" > {data}</li>);

        
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
    }
    else {
        setDef1(data[0].shortdef[0]);
        setDef2(data[1].shortdef[0]);
    }

    return (
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
    )
}