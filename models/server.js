const { secondsToHMS, createRandomString } = require("../utils/utils");
const config = require("../config");

function mapDataToModel(data) {
  try {
    if (Object.keys(data).length === 0) {
      return {
        success: false, // Custom property
      };
    }

    const { name, map, players, raw } = data;
    const { numplayers, rules } = raw;
    const { Day_b, GameMode_s, Mutated_b, Mutators_s, Night_b } = rules;

    return {
      success: true, // Custom property
      name: config.shortenCassandraTitle
        ? name.split("|")[0].trim()
        : name.trim(),
      map: config.maps[map] || map,
      numplayers,
      players: players.map((p) => {
        return {
          name: config.censorNames ? createRandomString(p.name.length) : p.name,
          time: secondsToHMS(p.raw.time),
        };
      }),
      gamemode: GameMode_s,
      day: Day_b === "true",
      night: Night_b === "true",
      mutated: Mutated_b === "true",
      mutators: Mutators_s?.split(",")?.join(", ") || "",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  mapDataToModel,
};
