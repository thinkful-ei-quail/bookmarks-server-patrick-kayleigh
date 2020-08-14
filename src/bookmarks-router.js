const bookmarks = require('./store');
const logger = require('./logger');
const express = require('express');
const { v4: uuid } = require('uuid');
const bookmarksRouter = express.Router();
const bodyParser = express.json();

const listBookmarks = (req, res) => {
  res.status(200).send(bookmarks);
};

const findBookmark = (req,res) =>{
  const {id} = req.params;
  // eslint-disable-next-line eqeqeq
  const bookmarkIndex= bookmarks.findIndex(item => item.id == id);
  if (bookmarkIndex === -1){
    logger.error(`Bookmark with id ${id} does not exist`);
    res.status(404).send('Bookmark does not exist');
    return;
  }

  res.status(200).send(bookmarks[bookmarkIndex]);
};

const postBookmark = (req, res) => {
  let {title, description = '', rating, url} = req.body;
  if(!title) {
    logger.error(`Title: ${title} not valid`);
    res.status(400).send('Must provide title');
    return;
  }
  if(!rating) {
    logger.error(`Rating: ${rating} not valid`);
    res.status(400).send('Must provide rating');
    return;
  }
  if(!url) {
    logger.error(`URL: ${url} not valid`);
    res.status(400).send('Must provide url');
    return;
  }
  if(title.length < 3) {
    logger.error(`Title: ${title} not valid`);
    res.status(400).send('Title must be at least 3 characters');
    return;
  }
  rating = parseInt(rating);
  if(rating < 1 || rating > 5 || isNaN(rating) || (rating / Math.floor(rating) !== 1)) {
    logger.error(`Rating: ${rating} not valid`);
    res.status(400).send('Rating must be an integer between 1 and 5');
    return;
  }
  if(url.length < 5 || url.substring(0, 4) !== 'http') {
    logger.error(`URL: ${url} not valid`);
    res.status(400).send('Url must be at least 5 characters and begin with http');
    return;
  }

  const bookmark = {
    id: uuid(),
    title,
    rating,
    description,
    url
  };
  bookmarks.push(bookmark);

  res.status(200).send(bookmark.id);
  return;
};

const deleteBookmark= (req,res)=>{
  const {id}= req.params;
  const index =bookmarks.findIndex(bookmark => bookmark.id === id);
  if (index === -1){
    logger.error(`Bookmark id : ${id} not found`);
    return res
      .status (404).send ('Bookmark not found');
  }
  bookmarks.splice(index, 1);
  res.send('Deleted');
};


bookmarksRouter.get('/bookmarks', listBookmarks);

bookmarksRouter.get('/bookmarks/:id', findBookmark);

bookmarksRouter.post('/bookmarks', bodyParser, postBookmark);

bookmarksRouter.delete('/bookmarks/:id', deleteBookmark);
module.exports = bookmarksRouter;
