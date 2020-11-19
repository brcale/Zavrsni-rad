import React from 'react';
import {Line as LineChart} from 'react-chartjs-2';

const ChartGraph = ({
    title,
    chartLabels,
    chartData
}) => {
    const data = {
        labels: chartLabels,
        datasets: [{ label: title,
                     data: chartData,
                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2}]
    }
    const options = {
        scales: {
            yAxes: [{
                ticks:{
                    beginAtZero: true
                }
            }]
        }
    }
    return (
        <div>
    {!!chartLabels ? <LineChart data={data} options={options} /> : console.log("error")}
    </div>
    )
}

export default ChartGraph;