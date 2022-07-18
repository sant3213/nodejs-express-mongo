const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const app = express();
const path = require('path');
const sessionsRouter = require('./src/routers/sessionRouter');
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');/* allow us to set variables inside the context of our app*/
app.set('view engine', 'ejs');


app.use('/sessions', sessionsRouter);

app.get('/',(req, res)=>{
    res.render('index', {title: ' Surymantics', data: ['First','Second','Third']})
})

app.listen(PORT, ()=>{
    debug(`listening on port  ${chalk.green(PORT)}`);
})