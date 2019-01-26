const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();

const {
	truncate,stripTags
}=require('./helpers/hbs');
// mongoose connect
const keys = require('./config/keys');
mongoose.connect(keys.MongoURI)
.then(()=>{
	console.log('connected to the database');
}).catch(()=>{
	console.log("can't connect to the database");
}); 


// handle bars middlewares
app.engine('handlebars',exphbs({
	helpers:{
		truncate:truncate,
		stripTags:stripTags
	},
	defaultLayout:'main'
}));
app.set('view engine','handlebars');

// Map global promise 
mongoose.promise = global.Promise;

// path variable
app.use(express.static(path.join(__dirname,'public')));

 // bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// requiring user model
require('./models/user');
require('./models/stu');
require('./models/tutor');
require('./models/post');
require('./models/question');
// requiring passport model
require('./config/passport')(passport);

// setting up session
app.use(session({
	secret:'secret',
	resave:true,
	saveUninitialized: true
}));

// flash
app.use(flash());


// passport middle
app.use(passport.initialize());
app.use(passport.session());

// set global vars
app.use((req,res,next)=>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user||null;
	next();
});
const questions = require('./routes/question');
const posts = require('./routes/post');
const users = require('./routes/user');
const index = require('./routes/index');

//  Use routes
app.use('/questions',questions);
app.use('/posts',posts);
app.use('/users',users);
app.use('/',index);

const port = 7000;

app.listen(port,()=>{
	console.log(`server started on port ${port}`)
});



