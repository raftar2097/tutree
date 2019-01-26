const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	title:{
		type:String,
		required:true
	},
	body:{
		type:String,
		required:true
	},
	answers:[{
		answerBody:{
			type:String,
			required:true
		},
		answerDate:{
			type:Date,
			dafault:Date.now
		},
		answerUser:{
			type: Schema.Types.ObjectId,
			ref:'user'
		}
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
mongoose.model('question',questionSchema); 