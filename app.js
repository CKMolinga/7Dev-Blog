const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
// const helpers = require('./helpers'); 

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
app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({ extended: true }));

// Set Storage 
// const storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, 'uploads/');
//     },

//     // By default, multer removes file extensions so lets add them back
//     filename: function(req, file, callback) {
//         callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
//     }
// });

// ROUTES 

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
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

    // // 'blog_image' is the name of our file input field in the HTML form
    // let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('blog_image');

    // upload(req, res, function(err) {
    //     // req.file contains information of uploaded file
    //     // req.body contains information of text fields, if there were any

    //     if (req.fileValidationError) {
    //         return res.send(req.fileValidationError);
    //     } else if (!req.file) {
    //         return res.send('Please select an image to upload');
    //     } else if (err instanceof multer.MulterError) {
    //         return res.send(err);
    //     } else if (err) {
    //         return res.send(err);
    //     }

    //     // Display uploaded image for user validation
    //     res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    // });

    // console.log(req.body); 

    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);
        });

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

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({
                redirect: '/blogs'
            });
        })
        .catch(err => {
            console.log(err);
        });
})


// app.post('/post', (req, res, next) => {
//     // upload(req, res, err => {
//     //     if (err) {
//     //         return res.send('Something went wrong');
//     //     }
//     // });
//     console.log(req.body);
//     res.redirect('/');

// })

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})