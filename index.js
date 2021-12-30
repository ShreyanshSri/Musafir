var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/musafir_records", { useNewUrlParser: true, useUnifiedTopology: true  }) 
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));



app.get('index.html',function(req,res){
	res.set({
		'Access-control-Allow-Origin': '*'
		});
	return res.redirect('index.html');
	}).listen(3000)

const userSchema2 = new mongoose.Schema({
    name:"string",
    email:"string",
    phone:"number",
    subject:"string",
    message: "string"
});

const Musafir_contact = new mongoose.model("Musafir_contact",userSchema2);

app.post("/contact",async(req,res)=>{ 
    try{
        console.log(req.body);
        const userData = new Musafir_contact({      // collection name
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            subject: req.body.subject,
            message: req.body.message
        });
        await userData.save();
        res.redirect("index.html");
    } catch(err){
        res.status(500).send(err);
    }
})

const userSchema = new mongoose.Schema({
    name:"string",
    count:"number",
    email:"string",
    phone:"number",
    address: "string",
    fdate:"date",
    ldate:"date",
    package: "string"
});

const Musafir_booking = new mongoose.model("Musafir_booking",userSchema);

app.post("/bookdetail",async(req,res)=>{ 
    try{
        console.log(req.body);
        const userData = new Musafir_booking({      // collection name
            name:req.body.place,
            count:req.body.count,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            fdate:req.body.fdate,
            ldate: req.body.ldate,
            package: req.body.package
        });
        await userData.save();
        res.redirect("index.html");
    } catch(err){
        res.status(500).send(err);
    }
})



console.log("server listening at port 3000");
