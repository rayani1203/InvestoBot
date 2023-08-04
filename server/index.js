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
        res.json({
            password: password,
            username: username
        });
        }
        res.json();
    } catch(e){
        console.error(e.message);
    }
});


app.listen(5001, () =>{
    console.log('listening on port 5001');
});