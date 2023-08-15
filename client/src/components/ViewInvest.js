import React, {useEffect} from "react";

function ViewInvest(){
    let [investments, setInvestments] = React.useState();

    async function fetchInvest(){
        const allInvests = await fetch('http://localhost:5001/investments').then((res) => res.json()).then((data) => JSON.stringify(data));
        console.log(allInvests);
        setInvestments(allInvests);
        return allInvests;
    }

    useEffect(() => {
        fetchInvest();
    }, []);
    return (
        <div class = "investments">
            {investments}
        </div>
    )
}

export default ViewInvest;