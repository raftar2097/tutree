const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
// load question model

require('../models/question');
question = mongoose.model('question');
require('../models/user');
user = mongoose.model('user');


router.get('/',(req,res)=>{
	question.find()
	.sort({date:-1})
	.populate('user')
	.then((questions)=>{
		res.render('questions/index',{
			questions:questions
		})
	});
});

router.get('/show/:id',ensureAuthenticated,(req,res)=>{
	question.findOne({
		_id: req.params.id
	})
	.populate('user')
	.populate('answerUser')
	.then(question=>{
		res.render('questions/show',{
			question:question
		});
	})
});

router.post('/',ensureAuthenticated,(req,res)=>{
 	const newQuestion = new question({
 		title:req.body.title,
 		body: req.body.body,
 		user: req.user.id
 	});
 	newQuestion.save()
	.then((question)=>{
		//req.flash('success_msg','logged in successfully');
		res.redirect(`/questions/show/${question.id}`);
	}).catch(err=>{
		console.log(err);
		return;
	});
 });

router.post('/answers/:id',(req,res)=>{
 	question.findOne({
		_id:req.params.id
	}).then(questions=>{
		var newcomment={
			answerBody:req.body.comments,
			answerUser:req.user.id
		};
		questions.answers.unshift(newcomment);
		questions.save()
		.then((question)=>{
			res.redirect(`/questions/show/${question.id}`);
		});
	});
 });
 router.get('/add',ensureAuthenticated,(req,res)=>{
 	res.render('questions/add');
 });

 router.get('/show',ensureAuthenticated,(req,res)=>{
 	res.render('questions/show');
 });

router.get('/edit',ensureAuthenticated ,(req,res)=>{
 	res.render('questions/edit');
 });

module.exports = router;