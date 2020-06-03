//carregando Modulos
    const express = require('express');
    const handlebars = require('express-handlebars');
    const app = express();
    const morgan = require('morgan');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');    
    const admin = require('./routes/admins');//rotas
    const path = require("path") //bootstrap

//configurações
//mongoose
    mongoose.connect('mongodb+srv://GuilhermeCesar029:edgard3229@programacaoweb-guilhermecesar-mjk8w.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

//handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'handlebars');
    

//body parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

//
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Resquested-With, Content-Type, Accept, Authorization"
    );
    if(req.method == "OPTIONS"){
        req.header("Access-Control-Allow-Methods", "PUT, POST, PATH, GET, DELETE");
        return res.status(200).json({});
    }
    next();
});

//rotas
app.get('/', function(req, res){
    res.send("página de Inicial")
})
app.use('/admin', admin)     



module.exports = app;