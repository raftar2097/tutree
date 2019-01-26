
module.exports = {
	truncate: function(str,len){
		if(str.length>len&&str.length>0){
			var new_str = str+" ";
			new_str = str.substr(0.,len);
			new_str = str.substr(0,new_str.lastIndexOf(" "));
			new_str = (new_str.length>0)?new_str:str.substr(0,len);
			return new_str + "...";
		}
		return str;
	},
	stripTags:(input)=>{
		return input.replace(/<(?:.|\n)*?>/gm,'');
	},
	/*formatDate:(date,format)=>{
		return moment(date).format(format);
	},
	editicon:(storyuser,user,storyid,floating=true)=>{
		if(storyuser==user){
			if(floating){
				return `<a class="btn-floating halfway-fab red" href="/stories/edit/${storyid}"><i class="fa fa-pencil"></i></a>`;
			}else{
				return `<a href="/stories/edit/${storyid}"><i class="fa fa-pencil"></i></a>`;
			}
		}else{
			return '';
		}
	}*/
}