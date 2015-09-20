var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
//이 부분 모든 모델마다 적어야 하는 건가? 중복 제거할 방법이 있는가?

var workSchema = new Schema({
	user: { type: Number, ref: 'user' },
	content: { type : String, required : true }
	deleted: { type: Boolean, required : true, default: false }
});

//요 아래 부분도 계속 중복된다. Schema 이름만 바뀌고.. 중복 제거할 방법이 있는가?
workSchema.plugin(autoIncrement.plugin, 'work');
mongoose.model('work', workSchema);