const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express(); 


const PORT = process.env.PORT || 8070;
// Allow requests from the specified origin


// Import routes
const demandAnalysisRoutes = require("./routes/thilan/demandAnalysis");


const corsOptions = {
    origin: 'http://localhost:3000', // Change this to your frontend URL
    credentials: true, // Include credentials (cookies, authorization headers, etc.)
};
  
app.use(cors(corsOptions));
app.use(bodyParser.json());

const CustomerRouter = require("./routes/sandeep/user/customer.js");

const LoyaltyRouter = require("./routes/sandeep/loyalty/loyalty.js");
const ReviewsRouter = require("./routes/sandeep/feedback/reviews.js");
const OrderRouter = require("./routes/sandeep/order/orders.js");
const authRouter = require('./routes/sandeep/user/auth.js');

const ProductRouter = require('./routes/sandeep/products/products.js')
const CartRouter = require('./routes/sandeep/order/cart.js')


// Import and use routes
const inventoryRouter = require("./routes/inventory/inventoryRoutes.js");


const cookieParser = require("cookie-parser");

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true, 
    //useFindAndModify: false
});


app.use(cookieParser());

app.use("/customer", CustomerRouter);

app.use("/loyalty", LoyaltyRouter);
app.use("/reviews", ReviewsRouter);
app.use("/order", OrderRouter);
app.use("/authenti", authRouter);

app.use("/Item", inventoryRouter);

app.use("/product", ProductRouter);
app.use("/cart", CartRouter);

const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("Mongodb Connection Success!");

})


// Use routes
app.use("/api/demandAnalysis", demandAnalysisRoutes);


app.listen(PORT,() =>{

    console.log(`Server is up and running on port number: ${PORT}`);
})