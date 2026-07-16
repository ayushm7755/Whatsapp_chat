require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chats.js");
const methodOverride = require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


const port = process.env.PORT || 8080;
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

main()
.then(()=>{
    console.log("connection successful");

    app.listen(port , ()=>{
        console.log(`server is listening to port no:${port}`);
        
    });
})
.catch((err)=>{
    console.log( "DB ERROR",err);
    process.exit(1);
});




app.get("/",(req,res)=>{
    res.redirect("/chats");
})

//Going To Use (CRUD OPERATION)==>>

// Index Route(Read Operation)==>
app.get("/chats", async(req,res)=>{
    try{
    let chats = await chat.find();
    res.render("index.ejs",{chats});

    }catch(err){
        console.log(err);
        res.send(err.message);
    }
   
});

// New chat(Create Operation)==>
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

// Create Post
app.post("/chats",(req,res)=>{
    let{from , to , msg} = req.body;
    let newChat = new chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date(),
    })
    
    // console.log(newChat);
    // res.send("working");
    
    newChat.save()
    .then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

//edit Route(Update Operation)==>>

app.get("/chats/:id/edit",async(req,res)=>{
    let{id} = req.params;
    let Chat = await chat.findById(id);
    res.render("edit.ejs",{Chat}); 
})

//update Route
app.put("/chats/:id",async(req,res)=>{
    let{id} = req.params;
    let{msg:newMsg} = req.body;
    console.log(newMsg);
    
    let UpdatedChat = await chat.findByIdAndUpdate(
        id,
        {msg : newMsg},
        {runValidators:true , new:true});

        console.log(UpdatedChat);
        res.redirect("/chats");

})

//Destroy Route(Delete Operation)==>>

app.delete("/chats/:id",async(req,res)=>{
    let{id} = req.params;
    let deletedChat = await chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

