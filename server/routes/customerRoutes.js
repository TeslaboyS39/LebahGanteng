const express = require('express');
const pubRouter = express.Router();
const CustomerController = require('../controllers/customerController')
const authenticationCustomer = require('../middlewares/authenticationCustomer');
const errorHandler = require('../middlewares/errorHandlers');

pubRouter.post('/register', CustomerController.customerRegister);
pubRouter.post('/login', CustomerController.customerLogin);
pubRouter.post('/google-login', CustomerController.customerGoogleLogin);


pubRouter.get('/movies', CustomerController.customerShowAllMovies);
pubRouter.get('/movies/:id', CustomerController.customerShowOneMovie);

pubRouter.use(authenticationCustomer);

pubRouter.get('/bookmarks', CustomerController.customerShowAllBookmarks);
pubRouter.post('/bookmarks', CustomerController.customerAddBookmark);

pubRouter.use(errorHandler);

module.exports = pubRouter;