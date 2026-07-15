const mongoose = require("mongoose");
const chat = require("./models/chats.js");


main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const allchats = [
    {
    from : "neha",
    to : "Alina",
    msg : "Hey How are you",
    created_at : new Date(),
    },
    {
    from : "Alina",
    to : "priya",
    msg : "send me your resume ",
    created_at : new Date()
    },
    {
    from : "ALok",
    to : "Abhishek",
    msg : "How's the day man",
    created_at : new Date()
    },
    {
    from : "Jhunnu",
    to : "Sinuu",
    msg : "Long time sinuu, you don't missed me na?",
    created_at : new Date()
    }
]

chat.insertMany(allchats);