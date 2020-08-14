const bookmarks = require('./store');
const logger = require('./logger');
const express = require('express');
const { v4: uuid } = require('uuid');
const bookmarksRouter = express.Router();

const listBookmarks = (req, res) => {
  res.status(200).send(bookmarks);
};

const findBookmark = (req,res) =>{
  const {id} = res.params;
  // eslint-disable-next-line eqeqeq
  const bookmarkIndex= bookmarks.findIndex(item => item.id == id);
  // if (bookmarkIndex === -1){
  //   logger.error(`LIst with id $`)
  // }


  res.status(200).send(bookmark);
};


bookmarksRouter.get('/bookmarks', listBookmarks);

bookmarksRouter.get('/bookmarks/:id', findBookmark);

module.exports = bookmarksRouter;
