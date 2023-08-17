import React, {useEffect} from "react";
import Navbar from "../../components/Navbar";
import NewInvest from "../../components/NewInvest";
import { Navigate } from "react-router-dom";
import ViewInvest from "../../components/ViewInvest";
import '../../components/styles/style.css';
import { use } from "swup/lib/modules/plugins";

function Investments(){
    let [auth] = React.useState(currAuth());
    let [dummy, setDummy] = React.useState(0);
    let [assets, setAssets] = React.useState(0);
    function currAuth(){
        const value = Number(window.localStorage.getItem("authenticated"));
        if (value > 0) {
            return value;
        } else {
            return 0;
        }
    }

    let [investments, setInvestments] = React.useState([]);

    async function fetchInvest(){
        try{
        const allInvests = await fetch('http://localhost:5001/investments').then((res) => res.json()).then((data) => JSON.stringify(data)).then((results) => JSON.parse(results));
        let list = []
        for(let i = 0; i < allInvests.length; i++){
            list.push(allInvests[i]);
        }
        setInvestments(list);
    } catch(err){
        console.error(err);
    }
    }

    useEffect(() => {
        fetchInvest();
    }, [dummy]);

    async function postAssets(){
        await fetch('http://localhost:5001/users/assets',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: {auth},
                    amount: {assets}
                })
            });
    }
    useEffect(() => {
        postAssets();
    }, [assets]);
    
    return (
        <>
        {(auth==0) && <Navigate to='./login'></Navigate>}
        <Navbar dummy={dummy}/>
        <NewInvest user_id={auth} state={setDummy}/>
        <section class="ftco-section pt-2">
        <div class="alert alert-info mx-auto mt-5" style={{width: "50%", textAlign:"center"}} role="alert">
            <h5 className="m-0">Total value of assets: </h5><h3>${assets}</h3>
        </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6 text-center mb-3 mt-4">
                        <h2 class="heading-section">All Investments</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-wrap">
                            <table class="table table-striped">
                              <thead>
                                <tr>
                                  <th>Ticker</th>
                                  <th>Quantity</th>
                                  <th>Purchase Date</th>
                                  <th>Purchased Price</th>
                                  <th>Current Price</th>
                                  <th>Profit/Loss</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {investments.map((investment, i) =>{
                                    return (<ViewInvest assets = {setAssets} state = {setDummy} user_id={auth} index = {i} id={investment.invest_id} ticker = {investment.ticker} quantity={investment.quantity} date={investment.date.split('T')[0]} price={investment.price}/>)
                                })}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        </>
    )
}

export default Investments;