import React from 'react';
import { Search } from './Body';

export default function Show(data) {
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
