const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/weather", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=23.02&longitude=72.57&current=temperature_2m"
        );

        const data = await response.json();

        res.json(data);
    }
    catch (error) {
        res.send("Error getting weather");
    }
});

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
