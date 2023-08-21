import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import ViewSold from "./ViewSold.js";

function CollapsibleSold(props){
    let [sales, setSales] = useState([]);
    let [net, setNet] = useState(0);

    useEffect(() => {
        console.log(props.date);
    }, [props.date])

    useEffect(() => {
        fetchInvest();
    }, [props.date, props.type]);

    async function fetchInvest(){
            try{
                console.log(`http://localhost:5001/sales/${Number(window.localStorage.getItem("authenticated"))}/${props.date.toISOString().split('T')[0]}/${props.type.toLowerCase()}`);
            const allInvests = await fetch(`http://localhost:5001/sales/${Number(window.localStorage.getItem("authenticated"))}/${props.date.toISOString().split('T')[0]}/${props.type.toLowerCase()}`).then((res) => res.json()).then((data) => JSON.stringify(data)).then((results) => JSON.parse(results));
            let list = [];
            let total = 0;
            for(let i = 0; i < allInvests.length; i++){
                list.push(allInvests[i]);
                total += Number(allInvests[i].profit);
            }
            setNet(total.toFixed(2));
            setSales(list);
        } catch(err){
            console.error(err);
        }
    }
    return (
        <>
        <h1>{net}</h1>
        <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn btn-light w-100" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <div style={{display:"flex", justifyContent:"center"}}><h4 style={{margin:"0"}}>Sold Investments</h4><div class="ms-4 my-auto"><FaArrowDown size={20}/></div></div>
            </button>
          </h5>
        </div>
    
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
        <div class="row mx-2">
                    <div class="col-md-12">
                        <div class="table-wrap">
                            <table class="table table-striped">
                              <thead>
                                <tr>
                                  <th>Ticker</th>
                                  <th>Quantity</th>
                                  <th>Purchase Date</th>
                                  <th>Sale Date</th>
                                  <th>Purchase Price</th>
                                  <th>Sale Price</th>
                                  <th>Profit/Loss %</th>
                                  <th>Profit/Loss $</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                sales.map((sale, i)=> {
                                    return(
                                        <ViewSold ticker={sale.ticker} quantity={sale.quantity} purchase_date={sale.purchase_date} sale_date={sale.sell_date} purchase_price={sale.purchase_price} sale_price={sale.sale_price} profit={sale.profit} />
                                    )
                                })
                                }                            
                              </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
      </div>
      </>
    )    
}

export default CollapsibleSold;