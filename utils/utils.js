const config = require("../config");

// Ref: https://stackoverflow.com/a/37096512
function secondsToHMS(d) {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  let hDisplay = h > 0 ? h + "h" : "";
  let mDisplay = m > 0 ? m + "m" : "";
  let sDisplay = s > 0 ? s + "s" : "";

  sDisplay = hDisplay === "" && mDisplay === "" ? sDisplay : "";

  return hDisplay + mDisplay + sDisplay;
}

// Takes an array of server numbers and converts them to their corresponding
// server IPs.
// Example: [0, 1, 2, 3] => [111.111.111:11111, 222.222.222:22222]
function getIPsFromConfig() {
  try {
    const IPs = [];

    if (config.serversToQuery.length > 0) {
      for (let i = 0; i < config.serversToQuery.length; i++) {
        if (config.serverMap[config.serversToQuery[i]]) {
          IPs.push(config.serverMap[config.serversToQuery[i]]);
        }
      }

      return IPs;
    } else {
      throw new Error("Missing array elements in config.serversToQuery");
    }
  } catch (error) {
    throw error;
  }
}

function getDateTime() {
  const dateNow = new Date();
  const date = dateNow.toISOString().split("T")[0];
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const time = dateNow.toLocaleString("en-US", timeOptions);

  return `${date} ${time}`;
}

function isCachedDataOld(serverNumber) {
  const epochNow = new Date().getTime();
  const epochLastUpdated = parseInt(
    require(`../data/cass${serverNumber}.json`).updated_at
  );
  const updateThreshold = config.updateThreshold * 1000 || 30000;
  const lastUpdatedAgo = epochNow - epochLastUpdated;

  return lastUpdatedAgo > updateThreshold;
}

module.exports = {
  getDateTime,
  secondsToHMS,
  isCachedDataOld,
  getIPsFromConfig,
};
