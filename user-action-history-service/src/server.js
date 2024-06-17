const express = require('express');
const cors = require('cors');
const consumeMessages = require('./message-broker/consumer')
const AppDataSource = require("./data-source");
const app = express();
const port = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));

AppDataSource.initialize().then(async () => {
    app.listen(port, async () => {
        await consumeMessages();
        console.log(`Example app listening at http://localhost:${port}`);
    })

}).catch((err) => {
    console.log("Database connection failed: ----- ", err);
})
