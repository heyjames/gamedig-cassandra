module.exports = {
  serversToQuery: [0, 1, 2, 3, 4], // [0, 1, 2, 3]
  debugMode: false, // Outputs data to console after Gamedig query
  shortenCassandraTitle: true,
  useSampleData: false, // Only applies to root route
  updateThreshold: 60, // Timeout in seconds until API gets new data
  censorNames: false,

  // Map serversToQuery to serverMap keys
  serverMap: {
    0: "149.28.238.85:27131", // Cassandra 0
    1: "108.61.95.81:27131", // Cassandra 1
    2: "45.76.7.250:27131", // Cassandra 2
    3: "149.28.46.15:27131", // Cassandra 3
    4: "144.202.3.182:27131", // Cassandra M
    // 0: "107.182.230.233:21516", // Killerhillbilly
  },

  // Cross-site Origin Policy
  cors: [
    "http://cassandra.confluvium.info",
    "http://cassandra0.confluvium.info",
    "http://cassandra1.confluvium.info",
    "http://cassandra2.confluvium.info",
    "http://cassandra3.confluvium.info",
  ],

  // Use release map names
  maps: {
    Canyon: "Crossing",
    Town: "Hideout",
    Sinjar: "Hillside",
    Compound: "Outskirts",
    Oilfield: "Refinery",
    Mountain: "Summit",
    "Power Plant": "PowerPlant",
    Buhriz: "Tideway",
  },
};
