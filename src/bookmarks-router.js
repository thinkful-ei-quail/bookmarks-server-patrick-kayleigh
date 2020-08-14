const bookmarks = require('./store');
const logger = require('./logger');
const express = require('express');
const { v4: uuid } = require('uuid');
const bookmarksRouter = express.Router();

const listBookmarks = (req, res) => {
  res.status(200).send(bookmarks);
};

bookmarksRouter.get('/bookmarks', listBookmarks);

module.exports = bookmarksRouter;
