const express = require('express');
const morgan = require('morgan');
const expresshbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');


//Inicializaciones
const app = express();
require('./lib/passport');

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
app.use(session({
    secret:'faztmysqlnodesession',
    resave:false,
    saveUninitialized:false,
    store:new MySqlStore(database) //con esto las sessiones se almacenan en la BBDD
}));
app.use(flash()); //Para mensajes en pantalla despues de eventos.
app.use(morgan('dev')); //Muestra las peticiones que llegan a server
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());/**Inicia Passport, pero no sabe donde guardar los datos, como va manejar esto */
app.use(passport.session());/**Donde guardar los datos, como va manejar esto */


//Global Variables
app.use((req, res, next) => {    
    app.locals.success = req.flash('success');
    next();
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