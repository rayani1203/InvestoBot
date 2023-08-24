const pool = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
    try{
        const allUsers = await pool.query('SELECT * FROM login;');
        res.json(allUsers.rows)
    } catch(e) {
        console.error(e.message);
    }
})

app.post('/users/wallet', async (req, res) => {
    try{
        const {id, add,amount} = req.body;
        if(Boolean(add)){
            const newWallet = await pool.query(`UPDATE login SET wallet = wallet + ${amount} WHERE user_id = ${id} RETURNING *`);
            res.json(newWallet.rows);
        } else {
            const newWallet = await pool.query(`UPDATE login SET wallet = wallet - ${amount} WHERE user_id = ${id} RETURNING *`);
            res.json(newWallet.rows);
        }
    }catch(e){
        console.error(e.message);
    }
})

app.put('/users/assets', async (req, res) => {
    try{
        const {id, add,amount} = req.body;
        if(Boolean(add)){
            const newAsset = await pool.query(`UPDATE login SET assets = assets + ${amount} WHERE user_id = ${id} RETURNING *`);
            res.json(newAsset.rows);
        } else {
            const newAsset = await pool.query(`UPDATE login SET assets = assets - ${amount} WHERE user_id = ${id} RETURNING *`);
            res.json(newAsset.rows);
        }
    }catch(e){
        console.error(e.message);
    }
})

app.post('/user/assets', async (req, res) => {
    try{
        const {id, amount} = req.body;
        const updateAsset = await pool.query(`UPDATE login SET assets = ${amount} WHERE user_id = ${id} RETURNING *`);
        res.json(newAsset.rows);
    } catch(e){
        console.error(e.message);
    }
});

app.post('/users', async (req, res) => {
    try{
        let {username, password, email, name} = req.body;
        const newUser = await pool.query(`INSERT INTO login(username, password, email, name) VALUES('${username}', '${password}', '${email}', '${name}') RETURNING *;`);
        res.json(newUser.rows);
    }catch(err){
        console.error(err.message);
    }
})

app.delete('/users/:id', async(req, res) => {
    try{
        let {id} = req.params;
        const newUsers = await pool.query(`DELETE FROM login WHERE user_id = ${id} RETURNING *`);
        res.json(newUsers.rows);
    } catch(err){
        console.error(err.message);
    }
});

app.get('/users/getuser/:username', async (req, res) => {
    try{
        let {username} = req.params;
        const passInfo = await pool.query(`SELECT * FROM login WHERE username = '${username}'`);
        if( passInfo.rowCount > 0 ){
            const password = passInfo.rows[0].password;
            const id = passInfo.rows[0].user_id;
            res.json({
                password: password,
                id: id
            });
        }
        res.json();
    } catch(e){
        console.error(e.message);
    }
});

app.get('/users/getid/:id', async (req, res) => {
    try{
        let {id} = req.params;
        const info = await pool.query(`SELECT * FROM login WHERE user_id = ${id}`);
        if(info.rowCount > 0){
        const password = info.rows[0].password?info.rows[0].password:null;
        const username = info.rows[0].username?info.rows[0].username:null;
        const wallet = info.rows[0].wallet;
        const assets = info.rows[0].assets;
        res.json({
            password: password,
            username: username,
            wallet: wallet,
            assets: assets
        });
        }
        res.json();
    } catch(e){
        console.error(e.message);
    }
});

app.get('/investments', async (req, res) => {
    try{
        const allInvests = await pool.query('SELECT * FROM investments;');
        res.json(allInvests.rows);
    } catch(e){
     console.error(e.message);   
    }
});

app.get('/investments/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const allInvests = await pool.query(`SELECT * FROM investments WHERE invest_id = ${id};`);
        res.json(allInvests.rows);
    } catch(e){
     console.error(e.message);   
    }
})

app.post('/investments', async (req, res) => {
    const {ticker, date, price, user_id, quantity} = req.body;
    if(user_id && ticker && price && quantity){
        if(date){
        try{
            const newInvest = await pool.query(`INSERT INTO investments (ticker, date, user_id, price, quantity) VALUES ('${ticker}', '${date}', ${user_id}, ${price}, ${quantity}) RETURNING *`);
            res.json(newInvest.rows)
        } catch(err){
            console.error(err);
        }
    } else {
        try{
            const newInvest = await pool.query(`INSERT INTO investments (ticker, price, user_id, quantity) VALUES ('${ticker}', ${price}, ${user_id}, ${quantity}) RETURNING *`);
            res.json(newInvest.rows)
        } catch(err){
            console.err(err);
        }
    }
    } else{
        res.end('Not enough information to make investment')
    }
})

app.delete('/investments/:id', async (req, res) => {
    let {id} = req.params;
    try{
        const deleteInvest = await pool.query(`DELETE FROM investments WHERE invest_id = ${id} RETURNING *`);
        res.json(deleteInvest.rows);
    } catch(e){
        console.error(e);
    }

})

app.get('/investments/:user_id/:ticker', async (req, res) => {
    const {user_id, ticker} = req.params;
    try{
        const investInfo = await pool.query(`SELECT * FROM investments WHERE user_id = ${user_id} AND ticker = '${ticker}'`);
        res.json(investInfo.rows);
    } catch(e){
        console.error(e);
    }
})

app.post('/sales', async(req, res) => {
    const {user_id, ticker, price, quantity, profit, purchase_date, date, purchase_price} = req.body;
    try{
        const addSale = await pool.query(`INSERT INTO sales (user_id, ticker, sale_price, quantity, profit, purchase_date, sell_date, purchase_price) VALUES (${user_id}, '${ticker}', ${price}, ${quantity}, ${profit}, '${purchase_date}', '${date}', ${purchase_price}) RETURNING *`);
        res.json(addSale.rows);
    } catch(err){
        console.error(err);
    }
})

app.get('/sales', async (req, res) => {
    const {user_id} = req.params;
    try{
        const getSales = await pool.query(`SELECT * FROM sales`);
        res.json(getSales.rows);
    } catch(err){
        console.error(err);
    }
})

app.get('/sales/:user_id', async (req, res) => {
    const {user_id} = req.params;
    try{
        const getSales = await pool.query(`SELECT * FROM sales WHERE user_id = ${user_id}`);
        res.json(getSales.rows);
    } catch(err){
        console.error(err);
    }
})

app.get('/sales/:user_id/:date/:sell_purchase', async (req, res) => {
    const {user_id, date, sell_purchase} = req.params;
    try{
        const getSales = await pool.query(`SELECT * FROM sales WHERE user_id = ${user_id} AND ${sell_purchase}_date >= '${date}'::date;`);
        res.json(getSales.rows);
    } catch(err){
        console.error(err);
    }
})

app.get('/sales/graph/:user_id/:date/:sell_purchase', async (req, res) => {
    try{
    const {user_id, date, sell_purchase} = req.params;
    let profit = await pool.query(`SELECT SUM(profit) AS profit FROM sales WHERE user_id = ${user_id} AND ${sell_purchase}_date >= '${date}'::date;`);
    profit = Number(profit.rows[0].profit).toFixed(2);
    let arr = [profit];
    const passDate = new Date(date);
    let today = new Date();
    let dates= [today.toISOString().split('T')[0]];
    const days = (today.getTime()-passDate.getTime())/(1000*60*60*24);
    let period = Math.floor(days);
    while(Math.floor(days)/period < 10 && period > 1){
        period /= 2;
    }
    period = Math.round(period)
    let periodDate = new Date();
    let temp = new Date();
    temp.setDate(periodDate.getDate() - period);
    while(periodDate.getTime() > (passDate.getTime()+(1000*60*60*24*1))){
        const periodInfo = await pool.query(`SELECT SUM(profit) AS profit FROM sales WHERE user_id = ${user_id} AND ${sell_purchase}_date >= '${temp.toISOString().split('T')[0]}'::date AND ${sell_purchase}_date < '${periodDate.toISOString().split('T')[0]}'::date;`)
        const newProfit = Number(periodInfo.rows[0].profit).toFixed(2);
        profit = parseFloat(profit) - parseFloat(newProfit);
        console.log(profit);
        arr.push(parseFloat(profit).toFixed(2));
        dates.push(temp.toISOString().split("T")[0]);
        periodDate.setDate(periodDate.getDate() - period);
        temp.setDate(temp.getDate() - period);
    }
    res.json({arr, dates});
} catch (e) {
console.error(e.message);
}
})

app.delete('/sales/:sale_id', async (req, res) => {
    const {sale_id} = req.params;
    try{
        const deleteSale = await pool.query(`DELETE FROM sales WHERE sale_id = ${sale_id} RETURNING *`);
        res.json(deleteSale.rows);
    } catch(err){
        console.error(err);
    }
})


app.listen(5001, () =>{
    console.log('listening on port 5001');
});