const express = require("express");
const router = express.Router();
const { getDateTime, getIPsFromConfig } = require("../utils/utils");
const { mapDataToModel } = require("../models/server");
const config = require("../config");
const { getMultipleGamedigData } = require("../services/gamedig");
const sampleData = require("../data/sample-data.json");

router.get("/", async (req, res) => {
  try {
    let servers = [];
    const IPs = getIPsFromConfig();
    const dateTime = getDateTime();

    if (config.useSampleData) {
      console.log(`<${dateTime}> <Begin> Fetching sample pretty data...`);
      servers = sampleData;
      console.log(`<${dateTime}> <End> Fetching sample pretty data...`);
    } else {
      // TODO: Use logger package
      console.log(`<${dateTime}> <Begin> Fetching new pretty data...`);
      servers = await getMultipleGamedigData(IPs);
      console.log(`<${dateTime}> <End> Fetching new pretty data...`);
    }

    servers = servers.map((data) => mapDataToModel(data));

    res.render("main", {
      layout: "index",
      servers,
      lastUpdate: dateTime,
      listExists: true,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
