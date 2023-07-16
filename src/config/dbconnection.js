const mongoose = require('mongoose')

const connectDb = async () => {
    try{
        const connect = await mongoose.connect('mongodb+srv://iec2021066:fPQoLJ8B9YHDH0DI@mycluster.5vyhkoy.mongodb.net/paste-backend?retryWrites=true&w=majority')
        console.log("Database Connected: ", connect.connection.host, connect.connection.name)
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;
