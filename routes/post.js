const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
// load question model
require('../models/post');
const post= mongoose.model('post');
require('../models/user');
const user= mongoose.model('user');



router.get('/besttutors',(req,res)=>{
	user.find({
		"status":"1"
	})
	.sort({rating:-1})
	.then((users)=>{
		res.render('posts/besttutors',{
			users:users
		})
	});
});
router.get('/',(req,res)=>{
	post.find()
	.sort({date:-1})
	.populate('user')
	.then((posts)=>{
		res.render('posts/index',{
			posts:posts
		})
	});
});

router.get('/show/:id',(req,res)=>{
	post.findOne({
		_id: req.params.id
	})
	.populate('user')
	.populate('commentUser')
	.then(post=>{
		res.render('posts/show',{
			post:post
		});
	})
});
 router.get('/add',ensureAuthenticated,(req,res)=>{
 	res.render('posts/add');
 });

  router.post('/',(req,res)=>{
 	const newPost = new post({
 		title: req.body.title,
 		body: req.body.body,
 		user: req.user.id
 	});
 	newPost.save()
	.then((post)=>{
		//req.flash('success_msg','logged in successfully');
		res.redirect(`/posts/show/${post.id}`);
	}).catch(err=>{
		console.log(err);
		return;
	});
 });

  router.post('/like/:id',(req,res)=>{
  	post.findOne({
  		_id:req.params.id
  	})
  	.then(post1=>{
  		if(post1.userlist.length==0){
  			console.log(res.locals.user.email);
  			post1.like=post1.like+1;
  			post1.userlist.push(res.locals.user.email);
  			res.render('posts/show',{
					post:post
				});
  		}else{
  			if(typeof post1.userlist.find(res.locals.user.email) == undefined){
  			post1.userlist.push(res.locals.user.email);
  			console.log(post1.userlist);
  			post1.like=post1.like+1;
  			post1.save()
  			.then(post=>{
				res.render('posts/show',{
					post:post
					});
				})
  			}
  			else{
  				res.render('posts/show');
  			}
  		}
  	});
  });

  router.post('/comments/:id',(req,res)=>{
 	post.findOne({
		_id:req.params.id
	}).then(post1=>{
		var newcomment={
			commentBody:req.body.comments,
			commentUser:req.user.id
		};
		post1.comments.unshift(newcomment);
		post1.save()
		.then((post)=>{
			res.redirect(`/posts/show/${post.id}`);
		});
	});
 });

 router.get('/show',(req,res)=>{
 	res.render('posts/show');
 });

router.get('/edit',ensureAuthenticated,(req,res)=>{
 	res.render('posts/edit');
 });

module.exports = router;