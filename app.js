const express = require('express');
const app = express();

// var jsdom = require("jsdom");
// var JSDOM = jsdom.JSDOM;



PORT = 8000;

// Register view engine 
app.set('view engine', 'ejs');

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})