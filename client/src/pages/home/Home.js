import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css'
import ChartComponent from "../../components/ChartComponent.js";
import ViewSold from "../../components/ViewSold.js";
import ViewInvest from "../../components/ViewInvest.js";

function Home (){
    function currAuth(){
        const value = Number(window.localStorage.getItem("authenticated"));
        if (value > 0) {
            return value;
        } else {
            return 0;
        }
    }
    let [auth] = React.useState(currAuth());
    let today = new Date();
    today.setDate(today.getDate() - 30);

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

    React.useEffect(() => {
        fetchInvest();
    }, []);

    return (
        <>
        {(auth==0) && <Navigate to='./login'></Navigate>}
        <Navbar/>
        <div className="my-2">
            <h2 style={{fontWeight: "550", textAlign: "center"}}>Welcome to your portfolio!</h2>
        </div>
        <div className="me-auto ms-5 mt-4" style={{display:"flex"}}>
            <div style={{minWidth: "40%", marginRight: "20px"}}>
            <ChartComponent user_id = {window.localStorage.getItem('authenticated')} date={today} type={'Sell'}/>
            </div>
            <div class="row w-50 ms-5">
                <h4 style={{margin:"0", textAlign: "center"}}>Current Investments</h4>
                    <div class="col-md-12">
                        <div class="table-wrap">
                            <table class="table table-striped" id="table">
                              <thead>
                                <tr>
                                  <th>Ticker</th>
                                  <th>Current Price</th>
                                  <th>Profit/Loss</th>
                                </tr>
                              </thead>
                              {investments.map((investment, i) =>{
                                    return (<ViewInvest small={true} user_id={auth} index = {i} id={investment.invest_id} ticker = {investment.ticker} quantity={investment.quantity} date={investment.date.split('T')[0]} price={investment.price}/>)
                                })}
                            </table>
                        </div>
                    </div>
                </div>
        </div>
        
        </>
    )
}

export default Home;