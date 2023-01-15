const fs = require("fs");

/**

@params {string} destination - The shipment destination street name
@params {string} driver - The driver name
@desc - Calculates the base suitability score based on the length of the shipment destination street name, the number of vowels and consonants in the driver name.
@returns {number} The base suitability score
*/

const getBaseScore = (destination, driver) => {
  const vowels = "aeiou";
  const driverName = driver.toLowerCase();
  const destName = destination.toLowerCase();
  const driverVowels = driverName
    .split("")
    .reduce((acc, letter) => acc + (vowels.includes(letter) ? 1 : 0), 0);
  const driverConsonants = driverName.length - driverVowels;
  if (destName.length % 2 === 0) {
    return 1.5 * driverVowels;
  } else {
    return driverConsonants;
  }
};

/**

@params {string} destination - The shipment destination street name
@params {string} driver - The driver name
@desc - Increases the base suitability score if the length of the shipment destination street name shares any common factors with the length of the driver name
@returns {number} The suitability score
*/
const getScore = (destination, driver) => {
  const baseScore = getBaseScore(destination, driver);
  if (destination.length % driver.length === 0) {
    return baseScore * 1.5;
  }
  return baseScore;
};

/**

@params {string[]} destinations - An array of shipment destination street names
@params {string[]} drivers - An array of driver names
@desc - Matches shipment destinations with drivers in a way that maximizes the total suitability score over the set of drivers.
@returns {object} An object containing total suitability score and shipment destination - driver matches
*/
const assignShipments = (destinations, drivers) => {
  let totalScore = 0;
  const matches = {};
  for (const destination of destinations) {
    let bestDriver = null;
    let bestScore = 0;
    for (const driver of drivers) {
      const score = getScore(destination, driver);
      if (score > bestScore) {
        bestDriver = driver;
        bestScore = score;
      }
    }
    totalScore += bestScore;
    matches[destination] = bestDriver;
    // Drive has been assigned, remove driver
    drivers.splice(drivers.indexOf(bestDriver), 1);
  }
  return { totalScore, matches };
};

if (process.argv.length !== 4) {
  console.log(
    "Usage: node shipment_assignment.js [destinations_file] [drivers_file]"
  );
  process.exit(1);
}

// Grab [destinations_file] from CLI args
const destinationsFile = process.argv[2];
// Grab [drivers_file] from CLI args
const driversFile = process.argv[3];

/**

@desc - Runs the program, reads the input files, calls the assignShipments function and prints the output
*/
const run = () => fs.readFile(destinationsFile, "utf-8", (err, destinations) => {
  if (err) throw err;

  fs.readFile(driversFile, "utf-8", (err, drivers) => {
    if (err) throw err;
    destinations = destinations.trim().split("\n");
    drivers = drivers.trim().split("\n");
    const { totalScore, matches } = assignShipments(destinations, drivers);
    console.log(`Total Suitability Score: ${totalScore}`);
    console.log("Shipment Destination - Driver Matches:");
    for (const destination in matches) {
      console.log(`${destination} - ${matches[destination]}`);
    }
  });
});

run()
