const express = require('express');

const multer = require('multer');

const app = express();

const fs = require('fs');

// var jsdom = require("jsdom");
// var JSDOM = jsdom.JSDOM;


app.use(express.urlencoded({ extended: false }));
PORT = 5000;

// Register view engine 
app.set('view engine', 'ejs');

// Set Storage for image upload 
let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let dir = "./uploads";

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },

    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

let upload = multer({ storage: storage }).array('file', 1)

app.get('/', (req, res) => {
    const blogs = [{
            title: 'Front End Development Trends to Watch in 2022',
            snippet: 'Front end development hasnt always gotten the respect it deserves compared to back end development. Many engineers used to look down on JavaScript. But times have changed. Web applications are growing rapidly, mainly due to the development of open-source tools.',
            image: '/views/assets/images/frontend.png'
        },
        { title: 'RESELLING GIG WORK IS TIKTOK’S NEWEST SIDE HUSTLE', snippet: 'Service resellers find cheap labor on freelancer platforms like Fiverr, and flip services like graphic design or copywriting for profit. teenager on TikTok with 156,000 followers wants to help you change your life, starting with making real money. In his videos, he talks about how he went from being broke and working at Starbucks, to moving into a high rise in Miami and planning to retire by 30.' },
        { title: 'Is ‘realityOS’ Apple’s newest operating system?', snippet: 'Apple’s long-rumored virtual or augmented reality headset might not launch until 2023, but developers have spotted additional mentions of a new “realityOS” that could power it. First referenced as “rOS” in 2017 by Bloomberg News, realityOS was also spotted as part of some pre-release iOS 13 builds. 9to5Mac reports that developers have now found references to realityOS in GitHub repos and in App Store upload logs' },
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

app.post('/post', (req, res, next) => {
    upload(req, res, err => {
        if (err) {
            return res.send('Something went wrong');
        }
    });
    console.log(req.body);
    res.redirect('/');

})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));