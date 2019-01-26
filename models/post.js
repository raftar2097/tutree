const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title:{
		type:String,
		required:true
	},
	body:{
		type:String,
		required:true
	},
	like:{
		type:Number,
		default:0
	},
	comments:[{
		commentBody:{
			type:String,
			required:true
		},
		commentDate:{
			type:Date,
			dafault:Date.now
		},
		commentUser:{
			type: Schema.Types.ObjectId,
			ref:'user'
		}
	}],
	userlist:[{
		type:String
	}],
	user:{
		type: Schema.Types.ObjectId,
		ref:'user'
	},
	date:{
		type:Date,
		dafault:Date.now
	}
});
// create collection and add schema
mongoose.model('post',postSchema); 