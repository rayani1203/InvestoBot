import React, {useEffect} from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa/index.esm.js";

function ViewSold(props) {
    const {ticker, quantity, purchase_date, sale_date, purchase_price, sale_price, profit} = props;
    useEffect(()=>{
        if(profit>0) {
            document.getElementById('profit' + props.index).style.color = '#5cb85c';
            document.getElementById('profitval' + props.index).style.color = '#5cb85c';
        } else if(profit<0) {
            document.getElementById('profit' + props.index).style.color = '#d9534f';
            document.getElementById('profitval' + props.index).style.color = '#d9534f';
        }
    }, [profit])
    return (
        <tr>
            <th scope="row">{ticker}</th>
            <td>{quantity}</td>
            <td>{purchase_date.split('T')[0]}</td>
            <td>{sale_date.split('T')[0]}</td>
            <td>${purchase_price}</td>
            <td>${sale_price}</td>
            <td id={"profit" + props.index}>{(profit/purchase_price*100.0).toFixed(2)}% {(profit > 0) && <FaArrowUp/>} {(profit < 0) && <FaArrowDown/>} </td>
            <td id={"profitval" + props.index}>${Number(profit).toFixed(2)} {(profit > 0) && <FaArrowUp/>} {(profit < 0) && <FaArrowDown/>}</td>
        </tr>
    )
}

export default ViewSold;