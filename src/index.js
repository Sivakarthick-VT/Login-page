const express=require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const collection=require("./config");

//initialize express as app
const app = express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));




app.get("/"),(req,res)=>{
    res.render("login");
};
app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.post( "/signup",async(req,res)=>{
    
    const data={
        name:req.body.username,
        password:req.body.password


    }
    const existinguser = await collection.findOne({name:data.name});

    if(existinguser){
        res.send("user name already exists.try another user name");
    }else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);
        data.password = hashedPassword;
    constuserdata=await collection.insertMany(data);
    console.log(userdata);
    }    
})

app.post("/login", async(req,res)=>{
    try{
const check = await collection.findOne({name:req.body.username});
if(!check){
    res.send("invalid username");
}
//compare the hashpassword from the database with the plain text
const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
if(isPasswordMatch){
    res.render("home");
}
else{
    res.send("password does not match");
}
    }
    catch{
      res.send("wrong details");
    }
})



const port = 5000;
app.listen(port,()=>{
    console.log(`Server running on Port:  ${port}`);
})