const express = require('express');
const morgan = require('morgan');
const expresshbs = require('express-handlebars');
const path = require('path');

//Inicializaciones
const app = express();


//Setting
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expresshbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', 'hbs');


//MIDDLEWARES
app.use(morgan('dev')); //Muestra las peticiones que llegan a server
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global Variables
app.use((req, res, next) => {
    mext();
});


//Routers (URL del server)
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));


//Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});