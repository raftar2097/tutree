const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
	noofTest:{
		type:String,
		default:0
	},
	score:{
		type:String,
		default:30
	},
	date:{
		type:Date,
		dafault:Date.now
	}
});

mongoose.model('stu',StudentSchema); 