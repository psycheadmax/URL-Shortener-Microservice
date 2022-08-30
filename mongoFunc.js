require('dotenv').config()
const mongoose = require('mongoose')
const dbConnectString = process.env['MONGO_URI']

mongoose.connect(dbConnectString, { useNewUrlParser: true, useUnifiedTopology: true });

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    num: Number,
})

const Url = mongoose.model('Urls', urlSchema)

const findOrCreate = (url, done) => { //
    Url.findOne({url: url})

        .exec(function(err, data){ //execute
            if (err) return done(err)
            done(null, data)

        })
};

const create = (url, done) => {
    const urlToSave = new Url({url: url, num: 2})
    urlToSave.save(function(err, data) {
        if (err) return done(err)
        done(null, data)
    })
}

exports.UrlModel = Url
exports.findOrCreate = findOrCreate
exports.create = create
