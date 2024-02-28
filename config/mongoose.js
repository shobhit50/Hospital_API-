if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const mongoose = require('mongoose');


const dbpass = process.env.DB_PASS || "";



//connect to DB
async function main() {
    const uri = "mongodb+srv://shobhit:" + dbpass + "@cluster0.snn3wbn.mongodb.net/airBnb?retryWrites=true&w=majority";
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas');
}

main().catch((err) => console.log(err));