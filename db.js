const db = require('mongoose');

db.connect('mongodb://localhost:27017/Blogs-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
},

    (error, connect) => {

        if (error)
            console.log(error + '  \n \n DB not connected....');
        else
            console.log(' \n mongoose connecton sucsess')
    });

module.exports = db;