var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyparser.json());
app.listen('3000',()=>{
console.log('server is running....');
})

// mysql database connection 

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'gestionst'
});

// check db connection 
db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('database connected ....');
    }
});


// REST API CURD

app.get('/create',(req,res)=>{
    res.send('Api working');
});


// Create data 

app.post('/insert',(req,res)=>{

    console.log(req.body);

    // sql query 

    let sql = ` INSERT INTO utilisateur (id,nom)
                VALUES('${req.body.id}','${req.body.title}')
               `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data inserted');
    });        


});


// Read data 
app.get('/all',(req,res)=>{
    // sql query 
    let sql = `SELECT * FROM utilisateur `;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})

// Read single data 
app.get('/:id',(req,res)=>{
    console.log(req.params.id);
    // sql query 
    let sql = `SELECT * FROM utilisateur  WHERE nom = '${req.params.id}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });          


});

// update single data 

app.put('/update/:id',(req,res)=>{
        console.log(req.params.id);
        // sql query 
        let sql = `UPDATE utilisateur  SET   nom = '${req.body.title}' WHERE id = '${req.body.id}'
                    `;
        // run query 
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('data updated');
        })            
})


// delete single data 

app.delete('/delete/:id',(req,res)=>{

    // sql query 
    let sql = `DELETE FROM utilisateur  WHERE id = '${req.params.id}'
              `;
    //    run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('data deleted');
    });         
});
