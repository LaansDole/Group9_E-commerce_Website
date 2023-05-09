const express = require('express');
const {dbConnect} = require('./utils/dbConnect');
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 9000;
const authRouter = require("./server/routes/authRoute");
const { errorHandler, notFound } = require('./middlewares/errorHandler.js');
const cookiesParser = require('cookie-parser');
const { authMiddleware, checkUserRole, authUser, checkCustomerRole } = require('./middlewares/authMiddleware.js');

//Connect to MongoDB database, Dir: config/MongoDB.js
dbConnect();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookiesParser());
//Check port running
// app.use('/', (req, res) => {
//     res.send("Hello from server side");
// });

//Connect authorize user
app.use("/api/user", authRouter);
app.use(express.static('public'));
app.get('/register-customer', (req, res) => {
    res.render('signup-customer');
});
app.get('/register-vendor', (req, res) => {
    res.render('signup-vendor');
});
app.get('/register-shipper', (req, res) => {
    res.render('signup-shipper');
});
app.get('/login', (req, res) => {
    res.render('login');
});



//Define the ejs file success and unsuccess
app.get('/success', (req, res) => {
    res.render('success');
});

app.get('/unsucess', (req, res) => {
    res.render('unsuccess');
});


// app.get("/register", (req,res) => {
//     return res.redirect(index.html);
// });
// app.get("/register", (req, res) => {
//     return res.sendFile(__dirname + "/public/index.html");
//   });
// app.get("/login", (req, res) => {
//     return res.sendFile(__dirname + "/public/login.html");
//   });
//Middleware
app.use(notFound);
app.use(errorHandler);



//Create and check port
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})