const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

dotenv.config();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', require("./Routes/UserAuth"))
app.use('/api', require("./Routes/GetOrCreateElection"))
app.use('/api', require("./Routes/GetOrCreateCandidate"))
app.use('/api', require("./Routes/GetOrCreateVoters"))
app.use('/api', require("./Routes/GetOrCreateVotes"))
app.use('/api', require("./Routes/GetOrCreatePost"))
app.use('/api', require("./Routes/GetOrCreateTasks"))


mongoose.connect(process.env.DATABASE_URI, { useNewurlParser: true })
    .then(
        (result, err) => {
            try {
                console.log("Connected");
                const fetched_user = mongoose.connection.db.collection("AdminData");
                fetched_user.find({}).toArray().then(
                    async (adminData, err) => {
                        try {
                            if (err) {
                                console.log("Error ----", err);
                                return;
                            }
                            global.AdminData = adminData;

                        }
                        catch (err) {
                            console.log(err);
                        }
                    }
                )
            }
            catch (err) {
                console.log(err);
            }


        }
    ).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    })





app.listen(process.env.PORT, console.log("server is started"));

