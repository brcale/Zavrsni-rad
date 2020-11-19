import React from 'react';

const StockInfo = ({
    symbol,
    companyName,
    primaryExchange,
    latestPrice,
    latestSource,
    week52High,
    week52Low,
    logo
}) => {
    console.log(logo)
    return (
        <div className="row rounded-sm latest-info-div">
            <div className="col-2">
                <img className="info-img" src={logo.url} />
            </div>
            <div className="col-10">
                <h2 className="text-center">{symbol} - {companyName}</h2>
                <ul className="list-group-flush list-group">
                    <li className="">{latestSource} {latestPrice}</li>
                    <li className="">High: {week52High}</li>
                    <li className="">Low: {week52Low}</li>
                    <li className="">Exchange - {primaryExchange}</li>

                </ul>
            </div>
        </div>
        /*<div className="card bg-dark card-opacity">
            <div className="card-body flex-wrap d-flex">
                <img className="p-2" src={logo} alt="" />
                <h2 className="p-2 card-title text-opacity"> {symbol} - {companyName}</h2>
            </div>
            <ul className="list-group-flush list-group bg-dark">
    <li className="list-group-item text-opacity">{latestSource} <span className="text-primary text-opacity">{latestPrice}</span></li>
    <li className="list-group-item text-opacity"> High: <span className="text-success">{week52High}</span></li>
    <li className="list-group-item text-opacity"> Low: <span className="text-danger">{week52Low}</span></li>
    <li className="list-group-item text-opacity">Exchange {primaryExchange}</li>
            </ul>
    </div>*/
    )
}

export default StockInfo;