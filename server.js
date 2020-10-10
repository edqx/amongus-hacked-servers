const express = require("express");
const path = require("path");
const app = express();

const amongUs = require("./lib.js");

const PORT = process.env.PORT || 8080;

app.use("/res", express.static(path.resolve(__dirname, "page/res")));

app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "page/index.html"));
});

app.get("/gameHostOptions", function (req, res) {
    const default_options = {
        maxPlayers: 10,
        language: "English",
        map: "The Skeld",
        playerSpeed: 1,
        crewmateVision: 1,
        imposterVision: 1.5,
        killCooldown: 45,
        commonTasks: 1,
        longTasks: 1,
        shortTasks: 2,
        imposters: 3,
        emergencyMeetings: 1,
        killDistance: "Medium",
        discussionTime: 15,
        votingTime: 120,
        useRecommendedSettings: 0,
        emergencyCooldown: 15,
        confirmEjects: true,
        visualTasks: true,
        ...req.query
    };

    res.end(amongUs.writeSettings(default_options), "binary");
});

app.listen(PORT, function () {
    console.log("Listening on *:" + PORT);
});