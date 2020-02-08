import React from 'react';
import Bar from 'react-chartjs-2';

class BarChart extends React.Component {

    state = {
        chartData : {
            labels : [],
            datasets : [
                {
                    label : '7 Day Trend',
                    data : [
                        
                    ],
                    backgroundColor : [

                    ]
                }
            ]
        }
    }

    render() {

        const updatedChartData = this.state.chartData;
        updatedChartData.datasets[0].data = this.props.dataPoints;
        updatedChartData.labels = this.props.dataLabels;

        return (
            <Bar data={updatedChartData} type='bar' width='500' height = '350'/>
        )
    }
}

export default BarChart;