import React from 'react';
import ChartElement from './ChartElement';

const ChartTable = ({ chart }) => (
    <div>
        <table className="table text-light">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Open</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Close</th>
                </tr>
            </thead>
            <tbody>
                {chart.map((chartElement, index) => {
                    return (chartElement.change < 0 ? (
                        <ChartElement key={"chartTable" + index} {...chartElement} stockIsUp />) : (<ChartElement key={"chartTable" + index} {...chartElement} />)
                    )
                })}
            </tbody>
        </table>
    </div>
)

export default ChartTable