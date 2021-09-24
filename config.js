const config = {};

config.serversToQuery = [0, 1, 2, 3]; // [0, 1, 2, 3]
config.debugMode = false; // Outputs data to console after Gamedig query
config.useSampleData = false; // Only applies to root route
config.updateThreshold = 60; // Timeout in seconds until API gets new data

// Map serversToQuery to serverMap keys
config.serverMap = {
  0: "149.28.238.85:27131", // Cassandra 0
  1: "104.207.128.84:27131", // Cassandra 1
  2: "45.76.7.250:27131", // Cassandra 2
  3: "104.207.128.84:27151", // Cassandra 3
};

// Cross-site Origin Policy
config.cors = [
  "http://cassandra.confluvium.info",
  "http://cassandra0.confluvium.info",
  "http://cassandra2.confluvium.info",
];

// Use release map names
config.maps = {
  Canyon: "Crossing",
  Town: "Hideout",
  Sinjar: "Hillside",
  Compound: "Outskirts",
  Oilfield: "Refinery",
  Mountain: "Summit",
  "Power Plant": "PowerPlant",
  Buhriz: "Tideway",
};

module.exports = config;
