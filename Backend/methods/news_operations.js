const News = require('../model/NewsSchema');
const asyncHandler = require("express-async-handler");

exports.allNews = asyncHandler( async(req, res, next ) => {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
})

exports.allNewsHome = asyncHandler( async(req, res, next ) => {
    const perPage = 6;
    const page = parseInt(req.query.page) || 1; // Get the page from the query parameters or default to 1

    try {
        const news = await News.find()
        .sort({ date: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage);

        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

exports.getNews = asyncHandler ( async(req, res, next ) => {
    const news = await News.findById(req.params.id);
    if(!news){
        res.status(400).json({message: 'News not found'})
    }
    res.json(news)
})

exports.create_News_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  asyncHandler(async (req, res, next) => {
    try {
      const news = News({
        heading: req.body.heading,
        subheading: req.body.subheading,
        article: req.body.article,
        author: req.body.author,
        date: new Date(),
        img: req.body.img_url,
        category: req.body.category
      });
  
      const result = await news.save();
      console.log(result)
      res.status(200).json({
        message: 'New record is saved',
        data: result,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }),
];


exports.delete_news = asyncHandler (async (req, res, next) => {
  const delete_news = await News.findByIdAndDelete(req.params.id)
})