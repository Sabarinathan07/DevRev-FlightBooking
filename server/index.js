const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.get("/",(req,res) =>{
    res.json("Hello World!")
})

const dbConfig = require("./config/dbConfig");
const bodyParser = require("body-parser");

app.use(cors({
    origin: ['https://flight-booking-devrev.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT','DELETE','OPTIONS','PATCH'],
    headers: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/flights", require("./routes/flightsRoutes"));
app.use("/api/bookings", require("./routes/bookingsRoutes"));
app.use("/api/cities", require("./routes/citiesRoutes"));

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



