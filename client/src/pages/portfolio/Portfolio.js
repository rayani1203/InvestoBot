import React from "react";
import Navbar from "../../components/Navbar.js";
import CollapsibleSold from "../../components/CollapsibleSold.js";
import DateRange from "../../components/DateRange.js";
import ChartComponent from "../../components/ChartComponent.js";
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

function Portfolio(){
    let [date, setDate] = React.useState();
    let [type, setType] = React.useState('Purchase');
    let [dummy, setDummy] = React.useState(0);
    React.useEffect(() => {
        setDummy(dummy => dummy+1);
    }, [date, type]);
    return (
        <>
        <Navbar/>
        <DateRange state={setDate} type ={setType}/>
        <CollapsibleSold date={date} type={type} dummy={dummy}/>
        </>
    )
}

export default Portfolio;