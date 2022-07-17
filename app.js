const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const sessionsRouter = express.Router()
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');/* allow us to set variables inside the context of our app*/
app.set('view engine', 'ejs');

sessionsRouter.route('/').get((req, res)=> {
    res.render('sessions', { sessions: [
        {title: 'Session 1', description:'This is session 1'},
        {title: 'Session 2', description:'This is session 2'},
        {title: 'Session 3', description:'This is session 4'},
        {title: 'Session 4', description:'This is session 4'}
    ]})
});

app.use('/sessions', sessionsRouter);

app.get('/',(req, res)=>{
    res.render('index', {title: ' Surymantics', data: ['First','Second','Third']})
})

app.listen(PORT, ()=>{
    debug(`listening on port  ${chalk.green(PORT)}`);
})