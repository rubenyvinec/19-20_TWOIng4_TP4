var express = require('express');
var router = express.Router();

const hostname= 'localhost';
const port = 3000;

const app = express();

/* Home page */

router.get('/', function(req, res, next){
	res.render('index',{title: 'express'});
});
module.exports = router;