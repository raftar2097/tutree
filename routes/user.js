const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');

require('../models/user');
const user = mongoose.model('user');

router.get('/login',(req,res)=>{
	res.render('users/login');
});
router.post('/login',(req,res,next)=>{
	passport.authenticate('local',{
		successRedirect: '/questions',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req,res,next);
});

router.get('/register',(req,res)=>{
	res.render('users/register');
});
router.post('/register',(req,res)=>{
	let err=[];
	if(req.body.password!==req.body.password2){
		err.push({text:"Confirm password don't match"});
	}
	if(req.body.password.length<=4){
		err.push({text:"Password should be of more than 4 characters"});
	}
	if(err.length!=0){
		res.render('users/register',{
			err:err,
			email:req.body.email,
			password:req.body.password
		});
	}else{
		user.findOne({email:req.body.email})
		.then(result=>{
			if(result){
				req.flash('error_msg','Email has been registered before');
				res.redirect('/users/register');
			}else{
				const newUser = new user({
					status:req.body.status,
					email: req.body.email,
					password: req.body.password,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					class: req.body.class,
					organization: req.body.organization,
					city: req.body.city,
					dateOfBirth: req.body.DOB,
					gender: req.body.gender
				});
				bcrypt.genSalt(10,(err,salt)=>{
					bcrypt.hash(newUser.password,salt,(err,hash)=>{
						if(err){
							throw err;
						}
						newUser.password = hash;
						newUser.save()
						.then((result)=>{
							//req.flash('success_msg','logged in successfully');
							res.redirect('/users/login');
						}).catch(err=>{
							console.log(err);
							return;
						});
					})
				})
			}
		});
		
	}

});



router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/users/login');
});

module.exports = router;