const express = require('express');
const mongoose = require('mongoose');
 
require('./models/User');
require('./models/Track');

const authRoutes= require('./routes/authRoutes')
const trackRoutes= require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes);
app.use(trackRoutes);


const mongoURI='mongodb+srv://track:track@cluster0.9la2o.mongodb.net/tracker?retryWrites=true&w=majority'
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
mongoose.connection.on('connected',()=>{
    console.log('MongoDB connection Successful')
})
mongoose.connection.on('error',(err)=>{
    console.error('Error Connecting to MongoDB Server',err)
})

app.get('/',requireAuth,(req,res) => {
    res.send({email:req.user.email})
});

app.listen(3000,()=>{
    console.log('App Started on Port 3000')
});