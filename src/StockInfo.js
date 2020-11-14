import React from 'react';

const StockInfo = ({
    symbol,
    companyName,
    exchange,
    latestPrice,
    latestSource,
    weekHighest,
    weekLowest,
    logo
}) => {
    return (
        <div className="card">
            <div className="card-body flex-wrap d-flex">
                <img className="p-2" src={logo} alt="" />
                <h2 className="p-2 card-title"> {symbol} - {companyName}</h2>
            </div>
            <ul className="list-group-flush list-group">
    <li className="list-group-item">{latestSource} <span className="text-primary">{latestPrice}</span></li>
    <li className="list-group-item"> High: <span className="text-success">{weekHighest}</span></li>
    <li className="list-group-item"> Low: <span className="text-danger">{weekLowest}</span></li>
    <li className="list-group-item">Exchange {exchange}</li>
            </ul>
        </div>
    )
}

export default StockInfo;