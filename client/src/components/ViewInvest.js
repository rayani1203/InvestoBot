import React, {useEffect} from "react";
import './styles/style.css';
import {API_KEY} from '../env.js';
import {FaArrowDown, FaArrowUp} from 'react-icons/fa/index.esm.js'

function ViewInvest(props){
    const {ticker, quantity, date, price} = props;
    const [currPrice, setPrice] = React.useState(0);
    const [profit, setProfit] = React.useState(0);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2);
    console.log(yesterday.getDay());
    if(yesterday.getDay() == 6){
        yesterday.setDate(yesterday.getDate() - 1);
    } else if (yesterday.getDay() == 0){
        yesterday.setDate(yesterday.getDate() - 2);
    }
    console.log(yesterday.getDay());
    async function fetchPrice(){
        try{
            const price = await fetch(`https://api.polygon.io/v1/open-close/${ticker}/${yesterday.toISOString().split('T')[0]}?apiKey=${API_KEY}`).then((res) => res.json()).then((data) => data.close);
            return price;
        } catch(e){
            console.error(e.message);
        }
    }
    useEffect(() => {
        fetchPrice().then((price) => {
            setPrice(price);
            props.assets((prev) => prev + price*quantity);
        })
    }, []);
    useEffect(()=>{
        setProfit(((currPrice/price - 1)*100).toFixed(1));
    }, [currPrice])
    useEffect(()=>{
        if(profit>0) {
            document.getElementById('profit' + props.index).style.color = '#5cb85c';
        } else if(profit<0) {
            document.getElementById('profit' + props.index).style.color = '#d9534f';
        }
    }, [profit])

    async function sell(){
        try{
            await fetch(`http://localhost:5001/investments/${props.id}`, {
                method: 'DELETE',
            });
            await fetch(`http://localhost:5001/users/wallet`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: props.user_id,
                    add: true,
                    amount: quantity*currPrice
                })
            });
            await fetch('http://localhost:5001/users/assets',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: props.user_id,
                    add: false,
                    amount: quantity*currPrice
                })
            });
            const profit = quantity*(currPrice-price);
            await fetch('http://localhost:5001/sales', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user_id: props.user_id,
                    ticker: ticker,
                    price: currPrice,
                    purchase_price: price,
                    quantity: quantity,
                    profit: profit,
                    purchase_date: date,
                    date: today.toISOString().split('T')[0]
                })
            });
            props.state((prev) => prev+1);
            props.assets((prev) => prev-(currPrice*quantity));
        } catch(e){
            console.error(e.message);
        }
    }


    return (
        <tr>
            <th scope="row">{ticker}</th>
            <td>{quantity}</td>
            <td>{date}</td>
            <td>${price}</td>
            <td id="currPrice">${currPrice}</td>
            <td id={"profit" + props.index}>{profit}% {(profit > 0) && <FaArrowUp/>} {(profit < 0) && <FaArrowDown/>} </td>
            <td><button onClick={sell} class="btn btn-danger">Sell</button></td>
        </tr>
    )
}

export default ViewInvest;