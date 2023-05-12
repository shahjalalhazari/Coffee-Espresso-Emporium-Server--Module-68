const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Coffee Espresso Emporium Server is Running")
})

app.listen(port, () => {
    console.log(`Our espresso emporium server is running on ${port}`);
})