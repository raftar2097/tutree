const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	status:{
		type:Boolean,
		required:true
	},
	firstName:{
		type:String,
		required:true
	},
	lastName:{
		type:String,
		required:true
	},
	organization:{	
		type:String,
		required:true
	},
	city:{
		type:String,
		required:true
	},
	dateOfBirth:{
		type:String,
		required:true
	},
	gender:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		dafault:Date.now()
	},
	user1:{
		type: Schema.Types.ObjectId,
		ref:'tutor'
	},
	user2:{
		type: Schema.Types.ObjectId,
		ref:'stu'
	},
	rating:{
		type:Number,
		default:30
	},
});
// create collection and add schema
mongoose.model('user',UserSchema); 