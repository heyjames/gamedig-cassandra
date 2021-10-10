const fs = require("fs").promises;
const express = require("express");
const router = express.Router();
const cors = require("cors");
const config = require("../config");
const { getGamedigData } = require("../services/gamedig");
const { getDateTime, isCachedDataOld } = require("../utils/utils");

const corsOptions = {
  origin: config.cors || "",
  optionsSuccessStatus: 200,
  methods: "GET",
};

router.get("/:serverNumber", cors(corsOptions), async (req, res, next) => {
  const serverNumber = req.params.serverNumber;
  const IPandPort = config.serverMap[serverNumber];
  const dataFilePath = `${process.cwd()}/data/cass${serverNumber}.json`;
  const dateTime = getDateTime();
  let result = {};

  try {
    // Intentional error for debugging
    // const someNumber = 1;
    // someNumber.replace("-", "");

    if (!IPandPort) return res.status(400).send("Invalid server number.");

    if (isCachedDataOld(serverNumber)) {
      console.log(`<${dateTime}> Getting new data for cass${serverNumber}...`);
      result = await getGamedigData(IPandPort);
      result.updated_at = new Date().getTime();

      res.send(result);

      // Write to disk for updated cached result
      await fs.writeFile(dataFilePath, JSON.stringify(result));
    } else {
      console.log(
        `<${dateTime}> Getting cached data for cass${serverNumber}...`
      );

      result = require(dataFilePath);
      res.send(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
