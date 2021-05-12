const Chat = require('./request/message')
const express = require('express')
const ChatRouter = express.Router();

ChatRouter.get('/myHistoric', Chat.myHistory);
ChatRouter.get('/question',Chat.getQuestionByUser);
ChatRouter.get('/reponse/:id',Chat.getReponseByUser);
ChatRouter.get('/:id', Chat.myHistoryWith);
ChatRouter.post('/last_visit', Chat.updateLastVisit);
ChatRouter.post('/question', Chat.insertQuestion);
ChatRouter.post('/reponse', Chat.insertReponse);
ChatRouter.put('/question/:id', Chat.updateQuestion);
ChatRouter.delete('/question/:id', Chat.deleteQuestion);

module.exports = ChatRouter;