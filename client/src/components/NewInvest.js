import React, {useState} from "react";
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";

function NewInvest(props){
    console.log(props);
    let [error, setError] = React.useState(false);
    let [success, setSuccess] = React.useState(false);
    const [startDate, setStartDate] = useState(new Date());

    async function submit(){
        const ticker = document.getElementById('ticker').value.toUpperCase();
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;
        const date = startDate.toISOString().split('T')[0];
        const user_id = props.user_id;
        if(isNaN(price) || isNaN(quantity)){
            setError(true);
            setSuccess(false);
            return;
        }
        const data = {
            ticker: ticker,
            quantity: quantity,
            price: price,
            date: date,
            user_id: user_id
        }
        try{
            const valid = await fetch(`https://api.polygon.io/v1/open-close/${ticker}/${date}?apiKey=IiIcEpGbpJmYzVXvJiJIKJnZOGjvIBtJ`).then((res) => res.json());
            if(valid.status == 'OK'){
            await fetch('http://localhost:5001/investments', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then((res) => res.json());
            await fetch(`http://localhost:5001/users/wallet`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: user_id,
                    add: false,
                    amount: quantity*price
                })
            });
            await fetch('http://localhost:5001/users/assets',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: user_id,
                    add: true,
                    amount: quantity*price
                })
            })
            setError(false);
            setSuccess(true);
            props.state((prev) => prev+1);
        } else {
            setError(true);
            setSuccess(false);
        }
        }catch(e){
            console.error(e.message);
            setError(true);
            setSuccess(false);
        }
    }

    async function getPrice(){
        const ticker = document.getElementById('ticker').value.toUpperCase();
        const date = startDate.toISOString().split('T')[0];
        try{
            const price = await fetch(`https://api.polygon.io/v1/open-close/${ticker}/${date}?apiKey=IiIcEpGbpJmYzVXvJiJIKJnZOGjvIBtJ`).then((res) => res.json()).then((data) => data.close);
            if(price){
            document.getElementById('price').value = price;
            setError(false);
            } else {
                document.getElementById('price').value = '';
                setError(true);
                setSuccess(false);
            }
        } catch(e){
            console.error(e);
            setError(true);
            setSuccess(false);
        }
    }

    return (
        <div style={{backgroundColor:"#EEEEEE",borderRadius:"15px"}} class="m-3 p-1 mb-5">
            {error && <div class="alert alert-danger" role="alert">
                Insufficient or incorrect data provided to the fields. Please review the provided information and try again!
                </div>}
                {success && <div class="alert alert-success" role="alert">
                Investment added successfully!
                </div>}
        <h3 style={{
            margin: '20px 0 10px 30px'
        }}>Add a new investment here!</h3>
        <div class="row " style={{marginBottom:"20px",marginTop:"30px"}}>
            <div class="col mb-2 me-sm-2 ms-sm-4">
            <input type="text" class="form-control" id="ticker" placeholder="Ticker" />
            </div>

            <div class=" mb-2 me-sm-2 col">
                <input type="text" class="form-control" id="quantity" placeholder="Quantity"/>
            </div>

            <div class="mb-2 me-sm-2 col">
                <input type="text" class="form-control" id="price" placeholder="Price"/>
                <button class="btn btn-info mx-auto mt-2" onClick={getPrice}>Get Price</button>
            </div>

            <div id="date-picker" class="md-form md-outline input-with-post-icon datepicker mb-2 me-sm-2 col" inline="true">
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
            </div>

            <div class = "col">
            <button type="submit" class="btn btn-primary mb-2" onClick={submit}>Submit</button>
            </div>
        </div>
        </div>
    )
}

export default NewInvest;