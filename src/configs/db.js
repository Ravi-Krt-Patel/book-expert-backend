const mongoose = require('mongoose');
require("dotenv").config();
// const connect = ()=>{
// 	return mongoose.connect(`mongodb+srv://ravikumar:${process.env.PASSWORD}@cluster0.rlpunox.mongodb.net/?retryWrites=true&w=majority`);
// }

const connect = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb+srv://ravikumar:${process.env.PASSWORD}@cluster0.rlpunox.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // make the process fail
        process.exit(1);
    }
}

module.exports = connect;