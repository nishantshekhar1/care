const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const logger = require("./services/logger.js");
// const dataHelper = require("./services/data.js");
const app = express();
const envVariables = dotenv.config();
logger.info(`ENV_VARIABLES = ${JSON.stringify(envVariables)}`);
let firstFetch = false;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const axios = require("axios");

const initialValue = {
    confirmed: 0,
    deceased: 0,
    recovered: 0,
    tested: 0,
    vaccinated: 0,
};

let data = {
    overall: {
        total: JSON.parse(JSON.stringify(initialValue))
    }
};

const updateData = async () => {

    data = JSON.parse(JSON.stringify(data)); // re-initialize

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDayBackTimeStamp = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));

    const res = await axios.get(process.env.DATA_URL);

    Object.entries(res.data).forEach(([state, value]) => {

        data[state] = {};
        let lastData = undefined;

        Object.entries(value.dates).forEach(([date, dateData]) => {
            const dateTimeStamp = new Date(date).getTime();
            if (dateTimeStamp < sevenDayBackTimeStamp.getTime())
                return;

            let currData = dateData["delta"];
            if (currData === undefined)
                currData = JSON.parse(JSON.stringify(initialValue));

            data[state][date] = currData;

            if (data["overall"][date] === undefined)
                data["overall"][date] = JSON.parse(JSON.stringify(initialValue));

            let overallDate = data["overall"][date];
            overallDate["confirmed"] += currData["confirmed"] === undefined ? 0 : currData["confirmed"];
            overallDate["deceased"] += currData["deceased"] === undefined ? 0 : currData["deceased"];
            overallDate["recovered"] += currData["recovered"] === undefined ? 0 : currData["recovered"];
            overallDate["tested"] += currData["tested"] === undefined ? 0 : currData["tested"];
            overallDate["vaccinated"] += currData["vaccinated"] === undefined ? 0 : currData["vaccinated"];

            lastData = dateData["total"];
        });

        if (lastData === undefined)
            lastData = JSON.parse(JSON.stringify(initialValue));

        data[state]["total"] = lastData;

        let overallTotal = data["overall"]["total"];
        overallTotal["confirmed"] += lastData["confirmed"];
        overallTotal["deceased"] += lastData["deceased"];
        overallTotal["recovered"] += lastData["recovered"];
        overallTotal["tested"] += lastData["tested"];
        overallTotal["vaccinated"] += lastData["vaccinated"];

    });

    console.log(data["overall"]);
}

app.get("/getData", (req, res) => {
    console.log("getData Called");
    res.send(data);
});

if (firstFetch)
    setInterval(updateData, 5 * 60 * 1000);
else {
    firstFetch = true;
    updateData();
}

app.listen(process.env.PORT, (err) => console.log(`Server started at ${process.env.PORT}`));