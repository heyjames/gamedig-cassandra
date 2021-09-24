const Gamedig = require("gamedig");
const config = require("../config");

async function getGamedigData(IPandPort) {
  try {
    const [ip, port] = IPandPort.split(":");

    const data = await Gamedig.query({
      type: "insurgencysandstorm",
      host: ip,
      port: port,
      requestRules: true,
    });

    if (config.debugMode) {
      console.log(JSON.stringify(data));
    }

    return data;
  } catch (error) {
    return {};
  }
}

async function getMultipleGamedigData(arrArg) {
  try {
    const result = [];

    arrArg.forEach(async (IPandPort) => result.push(getGamedigData(IPandPort)));

    const result2 = await Promise.all(result);

    return result2;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getGamedigData,
  getMultipleGamedigData,
};
