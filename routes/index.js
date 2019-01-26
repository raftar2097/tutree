
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
// load question model
require('../models/post');
const post= mongoose.model('post');
require('../models/user');
const user= mongoose.model('user');

router.get('/',(req,res)=>{
	res.render('index/welcome');
});

router.get('/dashboard',(req,res)=>{
	res.render('index/dashboard');
});

router.get('/about',(req,res)=>{
	res.render('index/about');
});
router.get('/locality',(req,res)=>{
	user.find({
		"status":"1",
		"city":res.locals.user.city
	})
	.sort({rating:-1})
	.then((users)=>{
		res.render('index/locality',{
			users:users
		})
	});
});

module.exports = router;