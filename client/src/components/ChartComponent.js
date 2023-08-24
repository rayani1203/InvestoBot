import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    defaults
  } from 'chart.js';
  import {
    Chart
  } from 'react-chartjs-2';
  import 'chart.js/auto';



function ChartComponent(props){
    let [data, setData] = React.useState([]);
    async function getData(){
        try{
            const apiData = await fetch(`http://localhost:5001/sales/graph/${props.user_id}/${props.date.toISOString().split('T')[0]}/${props.type}`).then((res) => res.json());
        // const apiData = await fetch(`http://localhost:5001/sales/graph/4/2023-07-13/purchase`).then((res) => res.json());
            console.log(apiData);
            setData(apiData);
        }catch(err) {
                console.log(err);
            }
    }
    useEffect(() => {
        getData();
    }, [props.dummy]);

    

    const labels = data?.dates?.reverse();

    const graphData = {
    labels: labels,
    datasets: [
        {
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: data.arr?.reverse(),
        },
    ],
    };

    return (
        <Chart type='line' data={graphData} options={{
            plugins: {
                title: {
                    display: 'true',
                    text: `Profits since ${props.date?.toLocaleDateString()}`,
                    font:{
                        size: 18
                    },
                    padding:{
                        bottom: 30
                    }
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                       label: function(tooltipItem) {
                              return tooltipItem.yLabel;
                       }
                    }
                }
            },
            responsive: true
        }}/>
    )
}

export default ChartComponent;