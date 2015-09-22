var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*pomodoro*/
var pomodoroSchema = new Schema({
	todo: { type: Schema.Types.ObjectId, ref: 'todo' },
	startTime: { type: Date, default: Date.now, required: true },
	endTime: {type: Date, required: true},
	detail: String
});

/*todo*/
var todoSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	date: { type: Date, required: true, default: Date.now },
	content: { type : String, required : true },
	completed: { type: Boolean, required: true, default: false }
});

/*user*/
var userSchema = new Schema({
	email: { type : String, required : true },
	password: { type : String, required : true }
});

/*work*/
var workSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	content: { type : String, required : true },
	deleted: { type: Boolean, required : true, default: false }
});

//스키마 등록하는 순서 중요할까? - 그럴듯..?
mongoose.model('user', userSchema);
mongoose.model('work', workSchema);
mongoose.model('todo', todoSchema);
mongoose.model('pomodoro', pomodoroSchema);

//test user 넣기 전에 work, user document 비우고 test user 넣기
mongoose.model('work').remove(function(err) {
	if(err) console.log(err);
	console.log('work document removed');

	mongoose.model('todo').remove(function (err) {
		if(err) console.log(err);
		console.log('todo document removed');

		mongoose.model('user').remove(function (err) {
			console.log('user document removed');
			//test user 넣기
			mongoose.model('user').create ({
				email: 'test@test.com',
				password: 'test'
			}, function(err, data) {
				console.log(data);
			})	
		})
	})
})
