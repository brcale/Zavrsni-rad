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
    return (
        <div className="row rounded-sm latest-info-div">
            <div className="col-2">
                <img className="info-img" src={logo.url} alt=""/>
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
    )
}

export default StockInfo;