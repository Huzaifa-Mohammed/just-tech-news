const express = require('express');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const sequelize = require('./config/connection');
const { json } = require('express/lib/response');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//turn on Routes
app.use(routes);

// turn on connection to db and server
// we use the sequelize.sync() method to establish the connection to the database
// The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables.
// If it doesn't find a table, it'll create it for you!
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});