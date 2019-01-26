const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSchema = new Schema({
	noofTest:{
		type:String,
		default:0
	},
	rating:{
		type:String,
		default:30
	},
	date:{
		type:Date,
		dafault:Date.now
	}
});
// create collection and add schema
mongoose.model('tutor',TutorSchema); 