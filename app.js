const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const app = express();
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');

const PORT = process.env.PORT || 3000;

/**
 * These pieces of middleware need to flow in order
 */
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json())
app.use(express.urlencoded({ extended: false})); 
app.use(cookieParser());
app.use(session({secret: 'Sury'}))
/**
 * It has to be under cookieParse and session 
 */
require('./src/config/passport')(app);

app.set('views', './src/views');/* allow us to set variables inside the context of our app*/
app.set('view engine', 'ejs');


app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/',(req, res)=>{
    res.render('index', {title: ' Surymantics', data: ['First','Second','Third']})
})

app.listen(PORT, ()=>{
    debug(`listening on port  ${chalk.green(PORT)}`);
})