const pool = require('./db');
const express = require('express');
const cors = require('cors');
const app = express()

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


app.listen(5001, () =>{
    console.log('listening on port 5001');
});