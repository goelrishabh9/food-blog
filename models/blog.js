var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    description: String,
    creationDate: {
		type: Date,
		default: Date.now
	},
    updateDate: {
        type: Date,
        default: Date.now
    },
    image: 
        {
            type: String
        }
}, {usePushEach: true});
module.exports = mongoose.model('blog', blogSchema);
