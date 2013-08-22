var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

var babySchema = new mongoose.Schema({
    babyName: String,
    parents: String,
    expectedDate: { type: Date, default: Date.now }
});

var lottoSchema = new mongoose.Schema({
    _userId: {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    _babyId: {type : mongoose.Schema.Types.ObjectId, ref : 'Baby'},
    date: { type: Date, default: Date.now }
});

mongoose.model('User', userSchema);
mongoose.model('Baby', babySchema);
mongoose.model('Lotto', lottoSchema);

mongoose.connect( 'mongodb://127.8.20.129/babyLotto' );