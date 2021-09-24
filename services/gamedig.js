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

async function getMultipleGamedigData(IPandPorts) {
  try {
    const data = [];
    IPandPorts.forEach((IPandPort) => data.push(getGamedigData(IPandPort)));
    const result = await Promise.all(data);

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getGamedigData,
  getMultipleGamedigData,
};
