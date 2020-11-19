import React from 'react';

const ChartElement = ({
    date, open, high, low, close, stockIsUp
}) => {
    return (
        <tr>
            <td>{date}</td>
            <td>{open}</td>
            <td>{high}</td>
            <td>{low}</td>
    <td className={!!stockIsUp ? 'text-success' : 'text-danger'}> {!!stockIsUp ? String.fromCharCode(9650)+ ' '+close : String.fromCharCode(9660)+ ' '+close}</td>
        </tr>
    )
}

export default ChartElement