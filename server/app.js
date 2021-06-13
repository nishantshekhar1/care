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

    const sevenDayBackTimeStamp = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

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

            if(currData["vaccinated1"] && currData["vaccinated2"]){
                currData["vaccinated1"] = currData["vaccinated1"] === undefined ? 0 : currData["vaccinated1"];
                currData["vaccinated2"] = currData["vaccinated2"] === undefined ? 0 : currData["vaccinated2"];
                currData["vaccinated"] = currData["vaccinated1"] + currData["vaccinated2"];
                delete currData["vaccinated1"];
                delete currData["vaccinated2"];
            }

            if(currData["other"])
                delete currData["other"];
        
            data[state][date] = currData;

            if (data["overall"][date] === undefined)
                data["overall"][date] = JSON.parse(JSON.stringify(initialValue));

            let overallDate = data["overall"][date];
            overallDate["confirmed"] += currData["confirmed"] === undefined ? 0 : currData["confirmed"];
            overallDate["deceased"] += currData["deceased"] === undefined ? 0 : currData["deceased"];
            overallDate["recovered"] += currData["recovered"] === undefined ? 0 : currData["recovered"];
            overallDate["tested"] += currData["tested"] === undefined ? 0 : currData["tested"];
            overallDate["vaccinated"] += currData["vaccinated"] === undefined ? 0 : currData["vaccinated"];

            let totalData = dateData["total"];
            if (totalData === undefined)
                totalData = JSON.parse(JSON.stringify(initialValue));

            if (totalData["vaccinated1"] && totalData["vaccinated2"]) {
                totalData["vaccinated1"] = totalData["vaccinated1"] === undefined ? 0 : totalData["vaccinated1"];
                totalData["vaccinated2"] = totalData["vaccinated2"] === undefined ? 0 : totalData["vaccinated2"];
                totalData["vaccinated"] = totalData["vaccinated1"] + totalData["vaccinated2"];
                delete totalData["vaccinated1"];
                delete totalData["vaccinated2"];
            }

            if (totalData["other"])
                delete totalData["other"];
            lastData = totalData;
        });

        if (lastData === undefined)
            lastData = JSON.parse(JSON.stringify(initialValue));

        data[state]["total"] = lastData;

        let overallTotal = data["overall"]["total"];
        overallTotal["confirmed"] += lastData["confirmed"] === undefined ? 0 : lastData["confirmed"];
        overallTotal["deceased"] += lastData["deceased"] === undefined ? 0 : lastData["deceased"];
        overallTotal["recovered"] += lastData["recovered"] === undefined ? 0 : lastData["recovered"];
        overallTotal["tested"] += lastData["tested"] === undefined ? 0 : lastData["tested"];
        overallTotal["vaccinated"] += lastData["vaccinated"] === undefined ? 0 : lastData["vaccinated"];

    });

    console.log(data);
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