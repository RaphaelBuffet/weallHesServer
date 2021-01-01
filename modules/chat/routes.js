const Chat = require('./request/message')
const express = require('express')
const ChatRouter = express.Router();

ChatRouter.get('/myHistoric', Chat.myHistory);
ChatRouter.get('/:id', Chat.myHistoryWith);
ChatRouter.post('/last_visit', Chat.updateLastVisit);

module.exports = ChatRouter;