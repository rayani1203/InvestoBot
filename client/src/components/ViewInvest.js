import React, {useEffect} from "react";
import './styles/style.css';

function ViewInvest(props){
    const {ticker, quantity, date, price} = props;
    const [currPrice, setPrice] = React.useState(0);
    async function fetchPrice(){
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 2);
        console.log(yesterday);
        console.log(yesterday.toISOString().split('T')[0]);
        try{
            const price = await fetch(`https://api.polygon.io/v1/open-close/${ticker}/${yesterday.toISOString().split('T')[0]}?apiKey=IiIcEpGbpJmYzVXvJiJIKJnZOGjvIBtJ`).then((res) => res.json()).then((data) => data.close);
            return price;
        } catch(e){
            console.error(e.message);
        }
    }
    useEffect(() => {
        fetchPrice().then((price) => setPrice(price));
    }, []);
    return (
        <tr>
            <th scope="row">{ticker}</th>
            <td>{quantity}</td>
            <td>{date}</td>
            <td>{price}</td>
            <td id="currPrice">{currPrice}</td>
            <td id=""></td>
            <td><a href="#" class="btn btn-danger">Sell</a></td>
        </tr>
    )
}

export default ViewInvest;