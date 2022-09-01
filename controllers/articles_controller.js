// Importing Statements
const express = require('express');
const router = express.Router();

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Model Import
const db = require('../models')
router.get('/ourstory', async(req, res, next) => {
    const userSession = await db.User.find(req.session.currentUser)
    const context = {username: userSession, routes: res.locals.routes}
    res.render('ourstory.ejs', context)
})



// New Route
router.get('/new', async (req, res) => {
    const userSession = await db.User.find(req.session.currentUser)
    const context = {username: userSession, routes: res.locals.routes}
    res.render('new.ejs', context)
})

// Create Route
router.post('/', async (req, res, next) => {
    //res.send('hi')
    const createdArticle = req.body
    //articles.push(createdArticle)

    try{
        const newArticle = await db.Articles.create(createdArticle);
        //console.log(newArticle)
        //console.log(req.body)

        res.redirect('/')

    }catch(err) {
        console.log(err);
        res.redirect('/404');
        return next();
    }
})

// Show Route
router.get('/:id', async (req ,res, next) => {
    //res.send('howdy')
    
    try{
        const foundArticle = await db.Articles.findById(req.params.id)
        const articleReview = await db.Reviews.find({articles: req.params.id})
        const userSession = await db.User.find(req.session.currentUser)
        
        const context = {articles: foundArticle, id: foundArticle._id, reviews: articleReview, username: userSession, routes: res.locals.routes}
      //! change to reviews: articleReview
        //console.log(articleReview)
        res.render('show.ejs', context)
    }catch(err) {
        console.log(err);
        res.redirect('/404');
        return next();
    }
})

// Index Route
router.get('/', async (req, res, next) => {
    //res.send('hey hey hey')
    
    try{
        const allArticles = await db.Articles.find()
        const userSession = await db.User.find(req.session.currentUser)
        
        //console.log(res.locals.routes)
        //console.log(req.session)
        //console.log(`user:  ${res.locals.routes}`)
        //console.log(`userSession:  ${userSession}`)
        const context = {articles: allArticles, username: userSession, routes: res.locals.routes};
        
        res.render("index.ejs", context);
    }catch(err) {
        console.log(err);
        res.redirect('/404');
        return next();
    }
})

// Destroy Route
router.delete('/:id', async (req, res, next) =>{
    //res.send('delete')
    
    try{
        const foundArticle = await db.Articles.findByIdAndDelete(req.params.id);
        //const deleteReview = await db.Articles.findByIdAndDelete({article: foundArticle._id})
        //console.log(foundArticle);
        return res.redirect('/');
    }catch(err) {
        console.log(err);
        res.redirect('/404');
        return next();
    }
})

// Edit Route
router.get('/:id/edit', async (req, res, next) => {
    //res.send('edit')
    // const foundArticle = articles[req.params.id];
    // const context = {article: foundArticle, id: req.params.id };
    // res.render('edit.ejs', context)
    
    try{
        const foundArticle = await db.Articles.findById(req.params.id);
        const userSession = await db.User.find(req.session.currentUser);
        //console.log(foundArticle);
        //let article = articles[req.params.id];
        res.render('edit.ejs', {articles: foundArticle, id: foundArticle._id, username: userSession, routes: res.locals.routes});
    }catch(err) {
        console.log(err);
        res.redirect('/404');
        return next();
    }
})

// Update Route
router.put('/:id', async (req, res, next) => {
    //res.send('hi')
    
    try{
        const updatedArticle = req.body;
        await db.Articles.findByIdAndUpdate(req.params.id, updatedArticle, {new:true})
        res.redirect(`/${req.params.id}`);
    }catch(err) {
        console.log(err);
        res.redirect('/404');
        return next();
    }
})

module.exports = router;