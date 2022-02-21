const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const fs = require('fs');

// connect to mongodb 
const dbURI = 'mongodb+srv://admin:admin@blog-ejs.39nke.mongodb.net/Blog-EJS?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`)))
    .catch((err) => console.log(err));

// var jsdom = require("jsdom");
// var JSDOM = jsdom.JSDOM;


app.use(express.urlencoded({ extended: false }));
PORT = 5000;

// Register view engine 
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Set Storage for image upload 
// let storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         let dir = "./uploads";

//         if (!fs.existsSync(dir)) {
//             fs.mkdirSync(dir);
//         }
//         callback(null, dir);
//     },

//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// });

// let upload = multer({ storage: storage }).array('file', 1)

// ROUTES 

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes 
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {
                title: 'all Blogs',
                blogs: result
            })
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/blogs', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', {
                blog: result,
                title: 'Blog Details'
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(result => {
            res.json({
                redirect: '/blogs'
            });
        })
        .catch(err => {
            console.log(err);
        });
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

app.post('/post', (req, res, next) => {
    // upload(req, res, err => {
    //     if (err) {
    //         return res.send('Something went wrong');
    //     }
    // });
    console.log(req.body);
    res.redirect('/');

})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})