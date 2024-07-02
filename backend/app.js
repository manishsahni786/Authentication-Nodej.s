require('dotenv').config();
const express = require ('express')
const mongoose = require ('mongoose')
const userRoute = require('./Routes/user')
// const staticRoute = require('./Routes/staticRouter') 


const app = express()

// app.get('/',(req,res)=>{
//     res.json('Hey there !')
// })

// Set EJS as the view engine
// app.set('view engine', 'ejs');
// // Serve static files from the 'public' directory
// app.use(express.static('public'));

app.use(express.json())
app.use('/user',userRoute)

// app.get('/signup',(req,res) => {
//     return res.render("signup");
// })
// app.get('/login',(req,res) => {
//     return res.render("login");
// })

const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));


// const connection = mongoose.connection();
// connection.once('open',()=>{
//     console.log("MongoDB database connection established successfully");
// })



app.listen(process.env.PORT, (req, res) => {
    console.log("App Started on App:" + process.env.PORT );
  });