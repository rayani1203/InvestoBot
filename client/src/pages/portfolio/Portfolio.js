import React from "react";
import Navbar from "../../components/Navbar";
import CollapsibleSold from "../../components/CollapsibleSold";
import DateRange from "../../components/DateRange";

function Portfolio(){
    let [date, setDate] = React.useState();
    let [type, setType] = React.useState('Purchase');
    React.useEffect(() => {
        console.log(date);
    }, [date])
    return (
        <>
        <Navbar/>
        <DateRange state={setDate} type ={setType}/>
        <CollapsibleSold date={date} type={type}/>
        </>
    )
}

export default Portfolio;