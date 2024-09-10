const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express(); 


const PORT = process.env.PORT || 8070;
// Allow requests from the specified origin
const corsOptions = {
    origin: 'http://localhost:3000', // Change this to your frontend URL
    credentials: true, // Include credentials (cookies, authorization headers, etc.)
};
  
app.use(cors(corsOptions));
app.use(bodyParser.json());

const CustomerRouter = require("./routes/sandeep/user/customer.js");

const LoyaltyRouter = require("./routes/sandeep/loyalty/loyalty.js");


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true, 
    //useFindAndModify: false
});


app.use("/customer", CustomerRouter);

app.use("/loyalty", LoyaltyRouter);



const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("Mongodb Connection Success!");

})


app.listen(PORT,() =>{

    console.log(`Server is up and running on port number: ${PORT}`);
})